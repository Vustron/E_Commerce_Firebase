"use client";

import { SizeFormSchema } from "@/components/forms/CreateSizeForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { z } from "zod";

export const useCreateOrder = (storeId?: string) => {
  // init query client
  const queryClient = useQueryClient();
  // init router
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof SizeFormSchema>) => {
      const { data } = await axios.post(
        `/api/stores/${storeId}/orders`,
        values,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", storeId],
      });

      router.replace(`/${storeId}/orders`);
    },
  });

  return mutation;
};
