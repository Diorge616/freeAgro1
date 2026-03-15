import React from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const portfolioData = [
  {
    name: "Soja",
    value: 125000,
    variation: 3.2,
    color: "#10b981",
    data: [
      { v: 40 },
      { v: 42 },
      { v: 38 },
      { v: 45 },
      { v: 43 },
      { v: 48 },
      { v: 52 },
      { v: 50 },
      { v: 55 },
      { v: 58 },
    ],
  },
  {
    name: "Milho",
    value: 87500,
    variation: -1.8,
    color: "#f59e0b",
    data: [
      { v: 35 },
      { v: 38 },
      { v: 36 },
      { v: 33 },
      { v: 37 },
      { v: 34 },
      { v: 32 },
      { v: 35 },
      { v: 33 },
      { v: 31 },
    ],
  },
];

const totalRWA = portfolioData.reduce((sum, item) => sum + item.value, 0);

export default function PortfolioCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl bg-white border border-slate-200/80 p-6 col-span-full lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Portfólio RWA Agro
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Ativos tokenizados</p>
        </div>
        <span className="text-xl font-bold text-slate-900">
          R$ {totalRWA.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
      </div>

      <div className="space-y-4">
        {portfolioData.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    R$ {item.value.toLocaleString("pt-BR")}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${item.variation >= 0 ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {item.variation >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {item.variation >= 0 ? "+" : ""}
                    {item.variation}%
                  </span>
                </div>
              </div>
              <div className="h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={item.data}>
                    <defs>
                      <linearGradient
                        id={`grad-${item.name}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={item.color}
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="100%"
                          stopColor={item.color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={item.color}
                      strokeWidth={1.5}
                      fill={`url(#grad-${item.name})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
