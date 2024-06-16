"use client";

import { UpdateSizeFormSchema } from "@/components/forms/UpdateSizeForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

export const useUpdateProduct = (storeId?: string, productId?: string) => {
  // init query client
  const queryClient = useQueryClient();
  // init router
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof UpdateSizeFormSchema>) => {
      const { data } = await axios.patch(
        `/api/stores/${storeId}/products/${productId}`,
        values,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", storeId, productId],
      });

      router.replace(`/${storeId}/products`);
    },
  });

  return mutation;
};