import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessStep({ data, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
      </motion.div>

      <h3 className="text-xl font-bold text-slate-900 mb-1">PIX Enviado!</h3>
      <p className="text-sm text-slate-500 mb-6">
        Transferência de{" "}
        <span className="font-semibold text-slate-800">
          R$ {data.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>{" "}
        para{" "}
        <span className="font-semibold text-slate-800">
          {data.recipient_name}
        </span>{" "}
        realizada com sucesso.
      </p>

      <div className="bg-slate-50 rounded-xl p-4 mb-8 mx-auto max-w-sm">
        <p className="text-xs text-slate-500 mb-1">Comprovante</p>
        <p className="text-xs font-mono text-slate-600">
          ID: {Math.random().toString(36).slice(2, 14).toUpperCase()}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          {new Date().toLocaleString("pt-BR")}
        </p>
      </div>

      <div className="flex gap-3 max-w-sm mx-auto">
        <Button
          variant="outline"
          onClick={onReset}
          className="flex-1 h-11 rounded-xl border-slate-200"
        >
          Nova Transferência
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Link to="/Dashboard" className="flex-1">
          <Button className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
