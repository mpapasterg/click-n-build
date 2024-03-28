export const useAuthStore = defineStore(
  "auth",
  () => {
    // State
    const auth = ref<Auth | null>(null);

    // Getters
    const isAuthenticated = computed<boolean>(() => auth.value !== null);

    // Actions
    const signIn = async (payload: SignInPostRequest) => {
      const response = await useTypedFetch(
        SignInPostResponseSchema,
        "/api/auth/signin",
        {
          method: "POST",
          body: new URLSearchParams(useFormData(payload) as any).toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          server: false,
        }
      );

      if (response.data.value) {
        auth.value = { ...response.data.value };
      }

      return response;
    };

    const signUp = async (payload: SignUpPostRequest) => {
      const response = await useTypedFetch(
        SignUpPostResponseSchema,
        "/api/auth/signup",
        {
          method: "POST",
          body: new URLSearchParams(useFormData(payload) as any).toString(),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          server: false,
        }
      );

      return response;
    };

    const signOut = async () => {
      const response = await useTypedFetch(
        SignOutPostResponseSchema,
        "/api/auth/signout",
        {
          method: "POST",
          body: {},
          headers: {
            "Content-Type": "application/json",
          },
          server: false,
        }
      );

      if (response.data.value) {
        auth.value = null;
      }

      return response;
    };

    const clear = () => {
      auth.value = null;
    };

    return {
      auth,
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      clear,
    };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: "strict",
        secure: true,
      }),
    },
  }
);
