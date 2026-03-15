import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TransactionFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar transação..."
          className="pl-10 bg-white border-slate-200 h-10 rounded-xl"
        />
      </div>
      <div className="flex gap-3">
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-40 bg-white border-slate-200 h-10 rounded-xl">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-2 text-slate-400" />
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pix_sent">PIX Enviado</SelectItem>
            <SelectItem value="pix_received">PIX Recebido</SelectItem>
            <SelectItem value="investment">Investimento</SelectItem>
            <SelectItem value="deposit">Depósito</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={onSortChange}>
          <SelectTrigger className="w-36 bg-white border-slate-200 h-10 rounded-xl">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mais recentes</SelectItem>
            <SelectItem value="oldest">Mais antigos</SelectItem>
            <SelectItem value="highest">Maior valor</SelectItem>
            <SelectItem value="lowest">Menor valor</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
