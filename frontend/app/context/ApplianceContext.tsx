import { createContext, useContext, ReactNode, useState } from "react";

interface ResultsType {
  //   message: string;
  message: any;
}

interface ApplianceContextType {
  formData: any;
  submitForm: (data: any) => void;
  results: any;
}

const ApplianceContext = createContext<ApplianceContextType | undefined>(
  undefined
);

export function useApplianceContext() {
  const context = useContext(ApplianceContext);
  if (context === undefined) {
    throw new Error(
      "useApplianceContext must be used within an ApplianceProvider"
    );
  }
  return context;
}

interface ApplianceProviderProps {
  children: ReactNode;
}

export const ApplianceProvider: React.FC<any> = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [results, setResults] = useState<any>(null);

  const submitForm = (data: any) => {
    setFormData(data);
    const apiResults = { message: "Form submitted successfully!" };
    setResults(apiResults);
  };

  return (
    <ApplianceContext.Provider value={{ formData, submitForm, results }}>
      {children}
    </ApplianceContext.Provider>
  );
};

// submitForm, results
