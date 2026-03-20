import { useState } from "react";
import BottomNav, { Tab } from "@/components/BottomNav";
import HomeScreen from "@/components/screens/HomeScreen";
import SearchScreen from "@/components/screens/SearchScreen";
import AlertsScreen from "@/components/screens/AlertsScreen";
import LinesScreen from "@/components/screens/LinesScreen";
import LineDetail from "@/components/LineDetail";
import { Line } from "@/data/transit";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);

  if (selectedLine) {
    return <LineDetail line={selectedLine} onBack={() => setSelectedLine(null)} />;
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className="pb-24">
        {activeTab === "home" && <HomeScreen onViewAlerts={() => setActiveTab("alerts")} onSelectLine={setSelectedLine} />}
        {activeTab === "search" && <SearchScreen onSelectLine={setSelectedLine} />}
        {activeTab === "alerts" && <AlertsScreen />}
        {activeTab === "lines" && <LinesScreen onSelectLine={setSelectedLine} />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
