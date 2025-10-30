import { useQueriesInstitutes } from "@/actions/queries/user-queries";
import { InstitutionItem, InstitutionResponse } from "@/types/pgType";
import React from "react";

type Props = {
  children: React.ReactNode;
};

type OccupationsFormsContextType = {
  instituteId: number | null;
  setInstituteId: React.Dispatch<React.SetStateAction<number | null>>;
  isLoading: boolean;
  institutes: InstitutionItem[];
  refetch?: () => void
  isRefetching?: boolean
};

const initialValues: OccupationsFormsContextType = {
  instituteId: null,
  institutes: [],
  isLoading: false,
  isRefetching: false,
  refetch: undefined,
  setInstituteId: (() => undefined) as unknown as React.Dispatch<
    React.SetStateAction<number | null>
  >,
};

const OccupationsFormsContext =
  React.createContext<OccupationsFormsContextType>(initialValues);
const { Provider } = OccupationsFormsContext;

export const OccupationsFormsProvider = ({ children }: Props) => {
  const [instituteId, setInstituteId] = React.useState<number | null>(
    initialValues.instituteId
  );
  const { data, isLoading , refetch , isRefetching } = useQueriesInstitutes<InstitutionResponse>();
  const institutes: InstitutionItem[] = ((data as any)?.res ??
    []) as InstitutionItem[];
  const values: OccupationsFormsContextType = {
    instituteId,
    setInstituteId,
    isLoading,
    isRefetching,
    refetch,
    institutes,
  };
  return <Provider value={values}>{children}</Provider>;
};

export const useOccupationsFormsHooks = () => {
  const state = React.useContext(OccupationsFormsContext);
  return state;
};

// export default AuthContextProvider
