import { DELETE } from "@/constants/apiMethods";
import { axiosInstance } from "@/lib/axiosInstance";
import { readCookie } from "@/lib/readCookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const apiCall = async ({ url, method, data, config = {} }, retryCount = 0) => {
  const maxRetries = 3;

  try {
    const axiosConfig =
      method === DELETE
        ? { params: data, ...config }
        : { data: data || {}, ...config };

    const response = await axiosInstance({ url, method, ...axiosConfig });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message;

    const customError = new Error(message);
    customError.status = status;

    throw customError;
  }
};

export function useApiMutation({
  url,
  method,
  invalidateKey = null,
  config = {},
  isToast = true,
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => apiCall({ url, method, data, config }),
    onSuccess: (data) => {
      if (isToast) {
        toast.success(data?.message || "Action successful!");
      }

      if (invalidateKey) {
        queryClient.invalidateQueries(invalidateKey);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log("error", error.status);

      if (error.status === 401) {
        router.push("/");
      }
    },
    onSettled: () => {
      const isAuthenticated = readCookie("isAuthenticated");
      queryClient.setQueryData(["isLoggedIn"], isAuthenticated);
    },
  });
}
