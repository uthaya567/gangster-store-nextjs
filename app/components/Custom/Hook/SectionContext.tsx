"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Section = "MEN" | "WOMEN" | "" | null;

type SectionContextType = {
  section: Section;
  setSection: (value: Section) => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<Section>(null);

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export const useSection = () => {
  const ctx = useContext(SectionContext);
  if (!ctx) {
    throw new Error("useSection must be used inside SectionProvider");
  }
  return ctx;
};
