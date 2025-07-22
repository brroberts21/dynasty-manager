import { useCallback, useEffect, useState, useMemo } from "react";

export function useTabs<T extends Record<string, any>>(
  items: T[],
  filterKey: keyof T,
  allLabel: string = "All"
) {
  const [activeTab, setActiveTab] = useState<string>(allLabel);
  const [filteredItems, setFilteredItems] = useState<T[]>([]);

  // Get unique values for tabs from the items
  const tabs = useMemo(() => {
    const uniqueValues = new Set<string>();
    items.forEach((item) => {
      const value = item[filterKey];
      if (value && typeof value === "string") {
        uniqueValues.add(value);
      }
    });
    return [allLabel, ...Array.from(uniqueValues).sort()];
  }, [items, filterKey, allLabel]);

  // Filter items based on active tab
  const filterItems = useCallback(() => {
    if (activeTab === allLabel) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        const value = item[filterKey];
        return value === activeTab;
      });
      setFilteredItems(filtered);
    }
  }, [items, activeTab, filterKey, allLabel]);

  useEffect(() => {
    filterItems();
  }, [filterItems]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return {
    tabs,
    activeTab,
    filteredItems,
    handleTabChange,
  };
}
