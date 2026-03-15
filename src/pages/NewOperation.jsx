import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import PixForm from "../components/operations/PixForm";
import ConfirmationStep from "../components/operations/ConfirmationStep";
import SuccessStep from "../components/operations/SuccessStep";

export default function NewOperation() {
  const [step, setStep] = useState("form"); // form | confirm | success
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1200);
  };

  const handleReset = () => {
    setFormData(null);
    setStep("form");
    setIsLoading(false);
  };

  // Stepper dots
  const steps = ["form", "confirm", "success"];
  const currentIndex = steps.indexOf(step);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Nova Operação
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Envie um PIX de forma rápida e segura
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-8 max-w-lg">
        {["Dados", "Confirmação", "Concluído"].map((label, i) => (
          <React.Fragment key={label}>
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i <= currentIndex
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  i <= currentIndex ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`flex-1 h-0.5 rounded ${i < currentIndex ? "bg-emerald-600" : "bg-slate-100"}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-lg">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-slate-200/80 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <SendHorizontal className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Transferência PIX
                  </h3>
                  <p className="text-xs text-slate-500">
                    Preencha os dados do destinatário
                  </p>
                </div>
              </div>
              <PixForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {step === "confirm" && formData && (
            <ConfirmationStep
              key="confirm"
              data={formData}
              onConfirm={handleConfirm}
              onBack={() => setStep("form")}
              isLoading={isLoading}
            />
          )}

          {step === "success" && formData && (
            <SuccessStep key="success" data={formData} onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
