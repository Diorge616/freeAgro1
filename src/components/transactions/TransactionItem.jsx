import React from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ArrowDownToLine,
  Receipt,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const typeConfig = {
  pix_sent: {
    icon: ArrowUpRight,
    label: "PIX Enviado",
    bg: "bg-red-50",
    color: "text-red-500",
    badge: "bg-red-50 text-red-600 border-red-100",
  },
  pix_received: {
    icon: ArrowDownLeft,
    label: "PIX Recebido",
    bg: "bg-emerald-50",
    color: "text-emerald-500",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  investment: {
    icon: BarChart3,
    label: "Investimento",
    bg: "bg-violet-50",
    color: "text-violet-500",
    badge: "bg-violet-50 text-violet-600 border-violet-100",
  },
  deposit: {
    icon: ArrowDownToLine,
    label: "Depósito",
    bg: "bg-blue-50",
    color: "text-blue-500",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
  },
  withdrawal: {
    icon: ArrowUpRight,
    label: "Saque",
    bg: "bg-orange-50",
    color: "text-orange-500",
    badge: "bg-orange-50 text-orange-600 border-orange-100",
  },
};

const statusConfig = {
  completed: {
    label: "Concluído",
    style: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  pending: {
    label: "Pendente",
    style: "bg-amber-50 text-amber-700 border-amber-100",
  },
  failed: { label: "Falhou", style: "bg-red-50 text-red-700 border-red-100" },
};

export default function TransactionItem({ transaction, onClick }) {
  const config = typeConfig[transaction.type] || typeConfig.pix_sent;
  const status = statusConfig[transaction.status] || statusConfig.completed;
  const Icon = config.icon;
  const isPositive =
    transaction.type === "pix_received" || transaction.type === "deposit";

  return (
    <button
      onClick={() => onClick(transaction)}
      className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-100"
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}
      >
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">
          {transaction.description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-400">
            {format(new Date(transaction.created_date), "dd MMM yyyy, HH:mm", {
              locale: ptBR,
            })}
          </span>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 h-4 border ${status.style}`}
          >
            {status.label}
          </Badge>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span
          className={`text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-slate-900"}`}
        >
          {isPositive ? "+" : "-"} R${" "}
          {Math.abs(transaction.amount).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
        <Badge
          variant="outline"
          className={`block mt-1 text-[10px] px-1.5 py-0 h-4 border ${config.badge}`}
        >
          {config.label}
        </Badge>
      </div>
    </button>
  );
}
