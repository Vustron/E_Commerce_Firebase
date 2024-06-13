"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

export const useDeleteBillboard = (storeId?: string, billboardId?: string) => {
  // init query client
  const queryClient = useQueryClient();
  // init router
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(
        `/api/stores/${storeId}billboards/${billboardId}`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stores", { storeId }, "billboards", { billboardId }],
      });
      queryClient.invalidateQueries({ queryKey: ["stores", "billboards"] });
      router.replace(`/${storeId}/billboards`);
    },
  });

  return mutation;
};
