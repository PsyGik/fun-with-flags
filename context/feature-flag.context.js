import { createContext, useContext, useEffect, useState } from "react";

const defaultState = [];
const FeatureFlagContext = createContext(defaultState);

export const FeatureFlagProvider = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState(defaultState);

  useEffect((effect) => {
    const fetchFeatureFlags = async () => {
      const response = await fetch("/api/feature-flags");
      const json = await response.json();
      setFeatureFlags(json);
    };
    fetchFeatureFlags();
  }, []);

  const values = {
    activeFlags: featureFlags,
  };
  return (
    <FeatureFlagContext.Provider value={values}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (context === undefined || context === null) {
    throw new Error(`useFeatureFlag must be called within FeatureFlagProvider`);
  }
  return context;
};
