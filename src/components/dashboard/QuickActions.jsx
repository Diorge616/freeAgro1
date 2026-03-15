import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SendHorizontal,
  QrCode,
  ArrowDownToLine,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    label: "Pix",
    icon: SendHorizontal,
    path: "/NewOperation",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "QR Code",
    icon: QrCode,
    path: "/NewOperation",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Depositar",
    icon: ArrowDownToLine,
    path: "/NewOperation",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Investir",
    icon: BarChart3,
    path: "/NewOperation",
    color: "bg-amber-50 text-amber-600",
  },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl bg-white border border-slate-200/80 p-6"
    >
      <h3 className="text-sm font-semibold text-slate-900 mb-4">
        Ações Rápidas
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-700">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
