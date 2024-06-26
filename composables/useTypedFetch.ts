import type { AsyncData } from "nuxt/app";

export const useTypedFetch = async <T>(
  successSchema: Zod.ZodType<T>,
  request: Parameters<typeof useFetch>[0],
  opts?: Parameters<typeof useFetch>[1]
): Promise<AsyncData<T, any>> => {
  return (await useFetch(request, {
    ...opts,
    transform(data: any): T {
      const result = successSchema.safeParse(data);
      if (result.success) {
        return result.data;
      } else {
        console.log(result.error);
        throw createError({
          statusCode: 404,
          statusMessage: "Not Found",
          data: {
            data: {
              message: `Fetch from '${request.toString()}' did not return a valid response.`,
            },
          },
        });
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        useAuthStore().clear();
      }
    },
  })) as AsyncData<T, any>;
};
