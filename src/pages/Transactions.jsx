import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionItem from "../components/transactions/TransactionItem";
import TransactionDetail from "../components/transactions/TransactionDetail";
import { mockTransactions } from "../components/mockData";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selected, setSelected] = useState(null);

  const transactions = mockTransactions;

  const filtered = useMemo(() => {
    let result = [...transactions];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description?.toLowerCase().includes(q) ||
          t.recipient?.toLowerCase().includes(q),
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      result = result.filter((t) => t.type === typeFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortOrder) {
        case "oldest":
          return new Date(a.created_date) - new Date(b.created_date);
        case "highest":
          return Math.abs(b.amount) - Math.abs(a.amount);
        case "lowest":
          return Math.abs(a.amount) - Math.abs(b.amount);
        default:
          return new Date(b.created_date) - new Date(a.created_date);
      }
    });

    return result;
  }, [transactions, search, typeFilter, sortOrder]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Transações
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Histórico completo de movimentações
        </p>
      </div>

      <TransactionFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Inbox className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">Nenhuma transação encontrada</p>
            <p className="text-xs mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 p-2">
            {filtered.map((t) => (
              <TransactionItem
                key={t.id}
                transaction={t}
                onClick={setSelected}
              />
            ))}
          </div>
        )}
      </motion.div>

      <TransactionDetail
        transaction={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
