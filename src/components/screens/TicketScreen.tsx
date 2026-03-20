import { useState } from "react";
import { CreditCard, Plus, ArrowDown, ArrowUp, ChevronRight, QrCode } from "lucide-react";
import { mockTickets, ticketHistory, TicketCard } from "@/data/transit";

const TicketScreen = () => {
  const [selectedCard, setSelectedCard] = useState<TicketCard>(mockTickets[0]);
  const [showRecharge, setShowRecharge] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");

  const quickAmounts = [10, 20, 50, 100];

  return (
    <div className="px-5">
      <div className="pt-14 pb-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Bilhete</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie seus cartões de transporte</p>
      </div>

      {/* Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {mockTickets.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => setSelectedCard(ticket)}
            className={`shrink-0 w-64 p-4 rounded-2xl transition-all active:scale-[0.98] ${
              selectedCard.id === ticket.id
                ? "bg-primary text-primary-foreground transit-shadow-lg"
                : "bg-card text-foreground border-2 border-border transit-shadow"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <CreditCard size={24} />
              <QrCode size={20} className="opacity-60" />
            </div>
            <p className="text-xs opacity-70 mb-1">{ticket.name}</p>
            <p className="text-sm font-mono tracking-wider mb-4">{ticket.number}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs opacity-60">Saldo</p>
                <p className="text-xl font-display font-bold">
                  R$ {ticket.balance.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <p className="text-[10px] opacity-50">Último uso: {ticket.lastUsed}</p>
            </div>
          </button>
        ))}
        <button className="shrink-0 w-20 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/30 transition-colors active:scale-95">
          <Plus size={20} />
          <span className="text-[10px] font-medium">Novo</span>
        </button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowRecharge(!showRecharge)}
          className="flex-1 py-3.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm transit-shadow active:scale-[0.98] transition-transform"
        >
          Recarregar
        </button>
        <button className="flex-1 py-3.5 rounded-xl bg-card border-2 border-border text-foreground font-semibold text-sm active:scale-[0.98] transition-transform">
          QR Code
        </button>
      </div>

      {/* Recharge panel */}
      {showRecharge && (
        <div className="mb-6 p-4 bg-card rounded-xl transit-shadow border border-border opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <h3 className="font-semibold text-sm text-foreground mb-3">Valor da recarga</h3>
          <div className="flex gap-2 mb-3">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setRechargeAmount(String(amount))}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                  rechargeAmount === String(amount)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                R${amount}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-secondary rounded-lg px-4 py-3 mb-3">
            <span className="text-sm text-muted-foreground">R$</span>
            <input
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              placeholder="Outro valor"
              className="flex-1 bg-transparent text-sm text-foreground outline-none"
            />
          </div>
          <button
            disabled={!rechargeAmount}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-40 active:scale-[0.98] transition-all"
          >
            Pagar com PIX
          </button>
        </div>
      )}

      {/* Transaction history */}
      <div>
        <h2 className="font-display font-semibold text-base text-foreground mb-3">Histórico</h2>
        <div className="space-y-1">
          {ticketHistory.map((tx, i) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 py-3 border-b border-border/60 last:border-0 opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.value > 0 ? "bg-status-ok/10" : "bg-secondary"}`}>
                {tx.value > 0 ? (
                  <ArrowDown size={14} className="text-status-ok" />
                ) : (
                  <ArrowUp size={14} className="text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <span className={`text-sm font-semibold tabular-nums ${tx.value > 0 ? "text-status-ok" : "text-foreground"}`}>
                {tx.value > 0 ? "+" : ""}R$ {Math.abs(tx.value).toFixed(2).replace(".", ",")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketScreen;
