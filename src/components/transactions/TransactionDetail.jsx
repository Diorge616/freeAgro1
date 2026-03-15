import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  ArrowDownLeft,
  BarChart3,
  ArrowDownToLine,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const typeConfig = {
  pix_sent: {
    icon: ArrowUpRight,
    label: "PIX Enviado",
    bg: "bg-red-50",
    color: "text-red-500",
  },
  pix_received: {
    icon: ArrowDownLeft,
    label: "PIX Recebido",
    bg: "bg-emerald-50",
    color: "text-emerald-500",
  },
  investment: {
    icon: BarChart3,
    label: "Investimento",
    bg: "bg-violet-50",
    color: "text-violet-500",
  },
  deposit: {
    icon: ArrowDownToLine,
    label: "Depósito",
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  withdrawal: {
    icon: ArrowUpRight,
    label: "Saque",
    bg: "bg-orange-50",
    color: "text-orange-500",
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

function DetailRow({ label, value, copyable }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copiado!");
  };

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-800">{value}</span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-slate-100 text-slate-400"
          >
            <Copy className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function TransactionDetail({ transaction, open, onClose }) {
  if (!transaction) return null;

  const config = typeConfig[transaction.type] || typeConfig.pix_sent;
  const status = statusConfig[transaction.status] || statusConfig.completed;
  const Icon = config.icon;
  const isPositive =
    transaction.type === "pix_received" || transaction.type === "deposit";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="text-lg">Detalhes da Transação</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${config.bg}`}
            >
              <Icon className={`w-6 h-6 ${config.color}`} />
            </div>
            <p className="text-sm text-slate-500 mb-1">{config.label}</p>
            <p
              className={`text-3xl font-bold ${isPositive ? "text-emerald-600" : "text-slate-900"}`}
            >
              {isPositive ? "+" : "-"} R${" "}
              {Math.abs(transaction.amount).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
            <Badge variant="outline" className={`mt-2 border ${status.style}`}>
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
          </div>

          <Separator />

          {/* Details */}
          <div className="divide-y divide-slate-100">
            <DetailRow label="Descrição" value={transaction.description} />
            {transaction.recipient && (
              <DetailRow label="Destinatário" value={transaction.recipient} />
            )}
            {transaction.recipient_key && (
              <DetailRow
                label="Chave PIX"
                value={transaction.recipient_key}
                copyable
              />
            )}
            <DetailRow
              label="Categoria"
              value={transaction.category || "Outros"}
            />
            <DetailRow
              label="Data"
              value={format(
                new Date(transaction.created_date),
                "dd 'de' MMMM 'de' yyyy, HH:mm",
                { locale: ptBR },
              )}
            />
            <DetailRow label="ID" value={transaction.id} copyable />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
