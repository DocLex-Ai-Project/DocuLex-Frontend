import type { ReactNode } from "react";
import { TestContext } from "./TestContext";
// import { AuthProvider } from "../context/AuthContext";


interface AppProvidersProp {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProp> = ({ children }) => {
  return (
    <TestContext>
     
 {children}
 </TestContext>
  );
};
