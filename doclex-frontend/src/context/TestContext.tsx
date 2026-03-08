	
import React, { createContext,  useState, type ReactNode } from "react";
// import axiosInstance from "../lib/axios/axiosInstance";
// import type { TaxSlab } from "../types/TaxSlab";

interface TaxSlabContextType {
//   taxSlabs: TaxSlab[];
  loading: boolean;
  error: string | null;
taxslab: () => Promise<void>;
}
//
// eslint-disable-next-line react-refresh/only-export-components
export const TaxSlabContext = createContext<TaxSlabContextType>({
//   taxSlabs: [],
  loading: false,
  error: null,
  taxslab: async () => {},

});

export const TestContext: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [taxSlabs, setTaxSlabs] = useState<TaxSlab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaxSlabs = async () => {
    setLoading(true);
    setError(null);

    try {
      const id = parseInt(localStorage.getItem("id") || "0", 10);
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No access token found — skipping tax slab fetch.");
        setLoading(false);
        setError("Access denied: no token found");
        return;
      }

      if (!id || id === 0) {
        console.warn("Employee ID not found. Please refresh or log in again.");
        setLoading(false);
        setError("Employee ID not found");
        return;
      }

      const response = await axiosInstance.get(`/tax-slab`);
      console.log(" TaxSlabContext → fetched tax slabs:", response.data.data);

      setTaxSlabs(response.data.data || []);
    } catch (err) {
      console.error("❌ Error fetching tax slabs:", err);
      setError("Failed to fetch tax slabs");
    } finally {
      setLoading(false);
    }
  };


//   useEffect(() => {
//     fetchTaxSlabs();
//   }, []);

  
//   useEffect(() => {
//     const handleTaxAdded = () => {
//       console.log("🔁 Refreshing tax slabs after new addition...");
//       fetchTaxSlabs();
//     };

//     window.addEventListener("taxSlabAdded", handleTaxAdded);
//     return () => window.removeEventListener("taxSlabAdded", handleTaxAdded);
//   }, []);

  return (
    <TestContext.Provider value={{ loading, error, taxslab: fetchTaxSlabs }}>
      {children}
    </TestContext.Provider>
  );
};
