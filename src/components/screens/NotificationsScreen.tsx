import { mockNotifications, Notification } from "@/data/transit";
import { Bell, Info, Tag, Check } from "lucide-react";
import { useState } from "react";

const iconMap = {
  alert: Bell,
  info: Info,
  promo: Tag,
};

const colorMap = {
  alert: "bg-destructive/10 text-destructive",
  info: "bg-primary/10 text-primary",
  promo: "bg-accent/10 text-accent-foreground",
};

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Notificações</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">{unreadCount} não lida(s)</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs font-medium text-primary active:scale-95 transition-transform">
              <Check size={14} /> Marcar todas
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => {
          const Icon = iconMap[notif.type];
          return (
            <div
              key={notif.id}
              className={`flex items-start gap-3 p-4 rounded-xl transition-all opacity-0 animate-fade-up ${
                notif.read ? "bg-card" : "bg-card transit-shadow border-l-4 border-l-primary"
              }`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorMap[notif.type]}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className={`text-sm leading-snug ${notif.read ? "text-foreground" : "font-semibold text-foreground"}`}>
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{notif.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsScreen;
