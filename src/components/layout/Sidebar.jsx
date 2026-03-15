import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  SendHorizontal,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/Transactions", label: "Transações", icon: ArrowLeftRight },
  { path: "/NewOperation", label: "Nova Operação", icon: SendHorizontal },
];

export default function Sidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-7">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-md">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b5786ddd61187e60b2449b/7b0be3e4c_logoagro.png"
              alt="FeeAgro"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              FeeAgro
            </h1>
            <p className="text-[11px] text-emerald-400/80 -mt-0.5 font-medium">
              RWA Banking
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Menu
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5",
              )}
            >
              <item.icon
                className={cn(
                  "w-[18px] h-[18px]",
                  isActive && "text-emerald-400",
                )}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 mx-3 mb-4 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Usuário</p>
            <p className="text-[11px] text-slate-500">Conta Ativa</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-slate-900 border border-slate-800 text-white shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-slate-950 border-r border-slate-800/50 z-50 transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <NavContent />
      </aside>
    </>
  );
}
