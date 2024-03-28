export const useFormData = (payload: ClientRequest): FormData => {
  const formData: any = new FormData();
  Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
  return formData;
};
