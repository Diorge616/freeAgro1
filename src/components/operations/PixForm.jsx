import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export default function PixForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      key_type: "cpf",
      pix_key: "",
      recipient_name: "",
      amount: "",
      description: "",
    },
  });

  const keyType = watch("key_type");

  const onFormSubmit = (data) => {
    const amount = parseFloat(data.amount.replace(/\./g, "").replace(",", "."));
    if (isNaN(amount) || amount <= 0) return;
    onSubmit({ ...data, amount });
  };

  const keyPlaceholders = {
    cpf: "000.000.000-00",
    email: "email@exemplo.com",
    phone: "(00) 90000-0000",
    random: "Chave aleatória",
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {/* Key type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Tipo de Chave
        </Label>
        <Select value={keyType} onValueChange={(v) => setValue("key_type", v)}>
          <SelectTrigger className="h-11 rounded-xl bg-white border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cpf">CPF</SelectItem>
            <SelectItem value="email">E-mail</SelectItem>
            <SelectItem value="phone">Telefone</SelectItem>
            <SelectItem value="random">Chave Aleatória</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* PIX key */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">Chave PIX</Label>
        <Input
          {...register("pix_key", { required: "Informe a chave PIX" })}
          placeholder={keyPlaceholders[keyType]}
          className="h-11 rounded-xl bg-white border-slate-200"
        />
        {errors.pix_key && (
          <p className="text-xs text-red-500">{errors.pix_key.message}</p>
        )}
      </div>

      {/* Recipient */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Nome do Destinatário
        </Label>
        <Input
          {...register("recipient_name", {
            required: "Informe o destinatário",
          })}
          placeholder="Nome completo"
          className="h-11 rounded-xl bg-white border-slate-200"
        />
        {errors.recipient_name && (
          <p className="text-xs text-red-500">
            {errors.recipient_name.message}
          </p>
        )}
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">Valor (R$)</Label>
        <Input
          {...register("amount", {
            required: "Informe o valor",
            validate: (v) => {
              const num = parseFloat(v.replace(/\./g, "").replace(",", "."));
              if (isNaN(num) || num <= 0)
                return "Valor deve ser maior que zero";
              if (num > 47852.34) return "Saldo insuficiente";
              return true;
            },
          })}
          placeholder="0,00"
          className="h-11 rounded-xl bg-white border-slate-200 text-lg font-semibold"
        />
        {errors.amount && (
          <p className="text-xs text-red-500">{errors.amount.message}</p>
        )}
        <p className="text-xs text-slate-400">Saldo disponível: R$ 47.852,34</p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-700">
          Descrição (opcional)
        </Label>
        <Textarea
          {...register("description")}
          placeholder="Ex: Pagamento aluguel"
          className="rounded-xl bg-white border-slate-200 resize-none h-20"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm"
      >
        Revisar Transferência
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
