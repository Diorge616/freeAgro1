import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, SendHorizontal, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const keyTypeLabels = {
  cpf: "CPF",
  email: "E-mail",
  phone: "Telefone",
  random: "Chave Aleatória",
};

function SummaryRow({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={`text-sm ${bold ? "font-bold text-slate-900 text-base" : "font-medium text-slate-800"}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function ConfirmationStep({
  data,
  onConfirm,
  onBack,
  isLoading,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Security badge */}
      <div className="flex items-center gap-2 px-4 py-3 mb-6 rounded-xl bg-emerald-50 border border-emerald-100">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">
          Transferência protegida • Ambiente seguro
        </span>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">
          Resumo da Transferência
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Confira os dados antes de confirmar
        </p>

        <div className="divide-y divide-slate-100">
          <SummaryRow label="Destinatário" value={data.recipient_name} />
          <SummaryRow label="Chave PIX" value={data.pix_key} />
          <SummaryRow
            label="Tipo de Chave"
            value={keyTypeLabels[data.key_type]}
          />
          {data.description && (
            <SummaryRow label="Descrição" value={data.description} />
          )}
          <SummaryRow
            label="Valor"
            value={`R$ ${data.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
            bold
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 h-12 rounded-xl border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <SendHorizontal className="w-4 h-4 mr-2" />
          )}
          {isLoading ? "Processando..." : "Confirmar PIX"}
        </Button>
      </div>
    </motion.div>
  );
}
