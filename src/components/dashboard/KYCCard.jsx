import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function KYCCard() {
  const kycLevel = 2;
  const maxLevel = 3;
  const progress = (kycLevel / maxLevel) * 100;

  const steps = [
    { label: "Dados Pessoais", done: true },
    { label: "Documento", done: true },
    { label: "Comprovante", done: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl bg-white border border-slate-200/80 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Verificação KYC
          </h3>
          <p className="text-xs text-slate-500">
            Nível {kycLevel} de {maxLevel}
          </p>
        </div>
      </div>

      <Progress value={progress} className="h-1.5 mb-4" />

      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step.done
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step.done ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm ${step.done ? "text-slate-700" : "text-slate-400"}`}
              >
                {step.label}
              </span>
            </div>
            {!step.done && (
              <button className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 hover:underline">
                Completar <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
