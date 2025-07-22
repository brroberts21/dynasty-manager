import React from "react";

interface Props {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onTabChange }: Props) => {
  return (
    <>
      <div role="tablist" className="tabs tabs-border border-gray-200">
        {tabs.map((tab) => (
          <a
            role="tab"
            className={`tab !border-gray-200 ${
              activeTab === tab
                ? "!border-primary !text-primary font-semibold"
                : "text-gray-600 hover:text-primary"
            }`}
            key={tab}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </a>
        ))}
      </div>
    </>
  );
};

export default Tabs;
