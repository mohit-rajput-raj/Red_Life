"use client";

import { UserValuesProvider } from "@/context/user-values-updations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) =>{
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserValuesProvider>{children}</UserValuesProvider>
    </QueryClientProvider>
  );
}
