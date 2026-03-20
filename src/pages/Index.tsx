import { useState, useEffect } from "react";
import BottomNav, { Tab } from "@/components/BottomNav";
import HomeScreen from "@/components/screens/HomeScreen";
import SearchScreen from "@/components/screens/SearchScreen";
import AlertsScreen from "@/components/screens/AlertsScreen";
import LinesScreen from "@/components/screens/LinesScreen";
import TicketScreen from "@/components/screens/TicketScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import NotificationsScreen from "@/components/screens/NotificationsScreen";
import NewsScreen from "@/components/screens/NewsScreen";
import LineDetail from "@/components/LineDetail";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import AuthScreen from "@/components/screens/AuthScreen";
import RoutePlanner from "@/components/screens/RoutePlanner";
import ReportAlertForm from "@/components/screens/ReportAlertForm";
import { Line } from "@/data/transit";

type AppScreen = "onboarding" | "auth" | "main" | "line-detail" | "route-planner" | "report-alert" | "notifications" | "news";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>(() => {
    return localStorage.getItem("lc-onboarded") ? "main" : "onboarding";
  });
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);

  const completeOnboarding = () => {
    localStorage.setItem("lc-onboarded", "true");
    setScreen("auth");
  };

  const login = () => {
    localStorage.setItem("lc-logged-in", "true");
    setScreen("main");
  };

  const logout = () => {
    localStorage.removeItem("lc-logged-in");
    setScreen("auth");
  };

  const handleSelectLine = (line: Line) => {
    setSelectedLine(line);
    setScreen("line-detail");
  };

  const handleProfileNavigate = (id: string) => {
    if (id === "news") setScreen("news");
    if (id === "notifications-settings") setScreen("notifications");
  };

  // Onboarding
  if (screen === "onboarding") {
    return <OnboardingScreen onComplete={completeOnboarding} onLogin={() => setScreen("auth")} />;
  }

  // Auth
  if (screen === "auth") {
    return <AuthScreen onBack={() => setScreen("onboarding")} onLogin={login} />;
  }

  // Line detail
  if (screen === "line-detail" && selectedLine) {
    return <LineDetail line={selectedLine} onBack={() => { setSelectedLine(null); setScreen("main"); }} />;
  }

  // Route planner
  if (screen === "route-planner") {
    return <RoutePlanner onBack={() => setScreen("main")} />;
  }

  // Report alert
  if (screen === "report-alert") {
    return <ReportAlertForm onBack={() => setScreen("main")} onSubmit={() => { setScreen("main"); setActiveTab("alerts"); }} />;
  }

  // Notifications
  if (screen === "notifications") {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto pb-24">
        <NotificationsScreen />
        <div className="fixed top-14 left-5">
          <button onClick={() => setScreen("main")} className="text-sm text-primary font-medium active:scale-95">← Voltar</button>
        </div>
      </div>
    );
  }

  // News
  if (screen === "news") {
    return (
      <div className="min-h-screen bg-background max-w-md mx-auto pb-24">
        <NewsScreen />
        <div className="fixed top-14 left-5 z-50">
          <button onClick={() => setScreen("main")} className="text-sm text-primary font-medium active:scale-95">← Voltar</button>
        </div>
      </div>
    );
  }

  // Main app
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <div className="pb-24">
        {activeTab === "home" && (
          <HomeScreen
            onViewAlerts={() => setActiveTab("alerts")}
            onSelectLine={handleSelectLine}
            onOpenRoutePlanner={() => setScreen("route-planner")}
            onOpenNotifications={() => setScreen("notifications")}
            onOpenNews={() => setScreen("news")}
          />
        )}
        {activeTab === "search" && <SearchScreen onSelectLine={handleSelectLine} />}
        {activeTab === "ticket" && <TicketScreen />}
        {activeTab === "alerts" && <AlertsScreen onReportAlert={() => setScreen("report-alert")} />}
        {activeTab === "lines" && <LinesScreen onSelectLine={handleSelectLine} />}
        {activeTab === "profile" && <ProfileScreen onNavigate={handleProfileNavigate} onLogout={logout} />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
