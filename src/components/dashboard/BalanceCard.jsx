import React, { useState } from "react";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function BalanceCard() {
  const [visible, setVisible] = useState(true);
  const balance = 47852.34;
  const variation = 2.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white col-span-full lg:col-span-2"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full translate-y-24 -translate-x-24 blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-slate-400 font-medium">Saldo Disponível</p>
          <button
            onClick={() => setVisible(!visible)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {visible ? (
              <Eye className="w-4 h-4 text-slate-400" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        <div className="mb-4">
          <span className="text-3xl lg:text-4xl font-bold tracking-tight">
            {visible
              ? `R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
              : "R$ •••••••"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-medium">
            <TrendingUp className="w-3 h-3" />+{variation}% este mês
          </div>
          <span className="text-xs text-slate-500">Atualizado agora</span>
        </div>
      </div>
    </motion.div>
  );
}
