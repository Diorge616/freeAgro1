import React from "react";
import BalanceCard from "../components/dashboard/BalanceCard";
import PortfolioCard from "../components/dashboard/PortfolioCard";
import KYCCard from "../components/dashboard/KYCCard";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h2>
        <p className="text-sm text-slate-500 mt-1">Visão geral da sua conta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5">
        <BalanceCard />
        <PortfolioCard />
        <KYCCard />
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
