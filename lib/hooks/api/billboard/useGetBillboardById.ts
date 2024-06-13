import { Billboards } from "@/lib/helpers/types";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/services/firebase";

const fetchBillboard = async (storeId: string, billboardId: string) => {
  const docRef = doc(db, "stores", storeId, "billboards", billboardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Billboards;
  } else {
    throw new Error("Billboard not found");
  }
};

export const useGetBillboardById = (storeId: string, billboardId: string) => {
  return useQuery({
    queryKey: ["stores", storeId, "billboards", billboardId],
    queryFn: async () => fetchBillboard(storeId, billboardId),
  });
};
