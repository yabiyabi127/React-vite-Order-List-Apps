import React, { ReactNode } from "react";
import { FilterState } from "../types";
import { IconType } from "react-icons";
import { cn } from "../utils/cn";

export interface TabItem {
  label: string;
  icon: IconType;
  value: number;
  count: number;
}

interface TabsProps {
  tabs: TabItem[];
  currentFilter: FilterState;
  setFilter: (filter: FilterState) => void;
}

export function Tabs({ tabs, currentFilter, setFilter }: TabsProps) {
  const activeStatus = currentFilter.order_status[0];

  const handleTabClick = (status: number) => {
    setFilter({ ...currentFilter, order_status: [status] });
  };

  return (
    <div className="flex space-x-4 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.value === activeStatus;
        return (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-xl border",
              isActive ? "bg-gray-400 text-white-700 border-gray-500" : "bg-gray-600 text-white border-gray-600"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            <span className="bg-gray-500 rounded-full px-2 text-xs">{tab.count}</span>
          </button>
        );
      })}
    </div>
  );
}
