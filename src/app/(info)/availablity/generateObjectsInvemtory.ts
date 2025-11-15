import { useQueryAllInventory } from "@/actions/queries/user-queries";

export const useInventoryValues = () => {
  const { data: list, refetch, isRefetching, isLoading } = useQueryAllInventory();

  const items =
    (Array.isArray(list)
      ? list
      : Array.isArray(list?.res)
      ? list.res
      : Array.isArray(list?.data)
      ? list.data
      : []) || [];

  const inventoryObj = Array.isArray(items)
    ? items.reduce(
        (acc: Record<number, { institute_id: number; blood: Record<string, number> }>, item: any) => {
          const institute_id = item?.institution_id;
          const blood_type = item?.blood_type;
          const units_available = item?.units_available ?? 0;

          if (!institute_id || !blood_type) return acc;

          if (!acc[institute_id]) {
            acc[institute_id] = {
              institute_id,
              blood: {},
            };
          }

          acc[institute_id].blood[blood_type] = units_available;

          return acc;
        },
        {}
      )
    : {};

  return { inventoryObj, refetch, isRefetching, isLoading };
};
