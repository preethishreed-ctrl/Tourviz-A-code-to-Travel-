import React, { createContext, useContext, useState, useCallback } from "react";

export interface ExplorerItem {
  id: string;
  name: string;
  type: "destination" | "country";
  image?: string;
  rating?: number;
  visitors?: string;
  revenue?: string;
  note?: string;
}

interface ExplorerContextType {
  items: ExplorerItem[];
  addItem: (item: ExplorerItem) => void;
  removeItem: (id: string) => void;
  isInList: (id: string) => boolean;
  clearAll: () => void;
  count: number;
}

const ExplorerContext = createContext<ExplorerContextType | null>(null);

export const useExplorer = () => {
  const ctx = useContext(ExplorerContext);
  if (!ctx) throw new Error("useExplorer must be used within ExplorerProvider");
  return ctx;
};

export const ExplorerProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<ExplorerItem[]>([]);

  const addItem = useCallback((item: ExplorerItem) => {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInList = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const clearAll = useCallback(() => setItems([]), []);

  return (
    <ExplorerContext.Provider value={{ items, addItem, removeItem, isInList, clearAll, count: items.length }}>
      {children}
    </ExplorerContext.Provider>
  );
};
