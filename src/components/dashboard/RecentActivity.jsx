import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const mockRecent = [
  {
    id: 1,
    type: "pix_sent",
    description: "PIX para João Silva",
    amount: -1250.0,
    date: new Date(2026, 2, 14, 10, 30),
  },
  {
    id: 2,
    type: "pix_received",
    description: "PIX recebido de Maria",
    amount: 3500.0,
    date: new Date(2026, 2, 13, 15, 45),
  },
  {
    id: 3,
    type: "investment",
    description: "Investimento Soja RWA",
    amount: -5000.0,
    date: new Date(2026, 2, 13, 9, 0),
  },
  {
    id: 4,
    type: "pix_received",
    description: "PIX recebido de Empresa X",
    amount: 8200.0,
    date: new Date(2026, 2, 12, 14, 20),
  },
];

const typeIcons = {
  pix_sent: { icon: ArrowUpRight, bg: "bg-red-50", color: "text-red-500" },
  pix_received: {
    icon: ArrowDownLeft,
    bg: "bg-emerald-50",
    color: "text-emerald-500",
  },
  investment: { icon: BarChart3, bg: "bg-violet-50", color: "text-violet-500" },
};

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl bg-white border border-slate-200/80 p-6 col-span-full"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Atividade Recente
        </h3>
        <Link
          to="/Transactions"
          className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 hover:underline"
        >
          Ver tudo <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-1">
        {mockRecent.map((item) => {
          const config = typeIcons[item.type] || typeIcons.pix_sent;
          const Icon = config.icon;
          const isPositive = item.amount > 0;

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors -mx-1"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg}`}
              >
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {item.description}
                </p>
                <p className="text-xs text-slate-400">
                  {format(item.date, "dd MMM, HH:mm", { locale: ptBR })}
                </p>
              </div>
              <span
                className={`text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-slate-900"}`}
              >
                {isPositive ? "+" : ""} R${" "}
                {Math.abs(item.amount).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
