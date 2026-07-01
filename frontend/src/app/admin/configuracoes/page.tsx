"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useContent, useSaveContent } from "@/hooks/use-admin";
import { Save, Settings, ShieldAlert, Truck, MapPin } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const { data: content } = useContent("settings");
  const { mutateAsync: saveContent } = useSaveContent("settings");

  // General Settings
  const [storeName, setStoreName] = useState("Mais que Mimo");
  const [email, setEmail] = useState("contato@maisquemimo.com.br");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [cnpj, setCnpj] = useState("12.345.678/0001-99");

  // Shipping settings
  const [freeShippingLimit, setFreeShippingLimit] = useState(199.9);
  const [minShippingFee, setMinShippingFee] = useState(15.0);

  // Address Settings
  const [street, setStreet] = useState("Rua das Flores, 123");
  const [city, setCity] = useState("São Paulo");
  const [state, setState] = useState("SP");
  const [zipCode, setZipCode] = useState("01234-567");

  useEffect(() => {
    if (!content) {
      return;
    }

    try {
      const payload = JSON.parse(content.payload);
      setStoreName(payload.storeName ?? "");
      setEmail(payload.email ?? "");
      setPhone(payload.phone ?? "");
      setCnpj(payload.cnpj ?? "");
      setFreeShippingLimit(payload.freeShippingLimit ?? 0);
      setMinShippingFee(payload.minShippingFee ?? 0);
      setStreet(payload.street ?? "");
      setCity(payload.city ?? "");
      setState(payload.state ?? "");
      setZipCode(payload.zipCode ?? "");
    } catch {
      // keep defaults
    }
  }, [content]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await saveContent(JSON.stringify({
      storeName,
      email,
      phone,
      cnpj,
      freeShippingLimit,
      minShippingFee,
      street,
      city,
      state,
      zipCode,
    }));

    toast({
      title: "Configurações Salvas",
      description: "As preferências da loja foram atualizadas com sucesso.",
    });
  }

  return (
    <div className="space-y-6 select-none font-sans pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium text-foreground">Configurações</h1>
          <p className="text-muted-foreground text-sm">Gerencie os dados gerais e regras do seu e-commerce</p>
        </div>
        <Button onClick={handleSave} className="cursor-pointer">
          <Save className="size-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 md:grid-cols-2">
        {/* General Store Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--mqm-olive-100)] text-[var(--mqm-olive-700)]">
              <Settings className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">Dados Gerais</CardTitle>
              <CardDescription className="text-xs">Informações de contato e faturamento</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="sName" className="text-xs">Nome da Loja</Label>
              <Input id="sName" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sEmail" className="text-xs">E-mail de Suporte</Label>
              <Input id="sEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sPhone" className="text-xs">WhatsApp / Telefone</Label>
              <Input id="sPhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sCnpj" className="text-xs">CNPJ</Label>
              <Input id="sCnpj" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Configurations Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--mqm-blush-100)] text-[var(--mqm-blush-700)]">
              <Truck className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">Envio & Frete</CardTitle>
              <CardDescription className="text-xs">Regras de frete grátis e tarifas básicas</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <div className="space-y-1.5">
              <Label htmlFor="sFreeShip" className="text-xs">Frete Grátis a partir de (R$)</Label>
              <Input
                id="sFreeShip"
                type="number"
                step="0.01"
                value={freeShippingLimit}
                onChange={(e) => setFreeShippingLimit(Number(e.target.value))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sMinShip" className="text-xs">Taxa Mínima de Envio (R$)</Label>
              <Input
                id="sMinShip"
                type="number"
                step="0.01"
                value={minShippingFee}
                onChange={(e) => setMinShippingFee(Number(e.target.value))}
              />
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 flex items-start gap-2.5">
              <ShieldAlert className="size-4.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed font-semibold">
                Certifique-se de que os limites estão alinhados com suas transportadoras cadastradas para evitar perdas em campanhas ativas.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Address Config Card */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <MapPin className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold uppercase tracking-wider text-[var(--mqm-olive-800)]">Endereço de Origem</CardTitle>
              <CardDescription className="text-xs">Utilizado para o cálculo de frete e devoluções</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="sStreet" className="text-xs">Logradouro e Número</Label>
                <Input id="sStreet" value={street} onChange={(e) => setStreet(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sCity" className="text-xs">Cidade</Label>
                <Input id="sCity" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sState" className="text-xs">Estado</Label>
                <Input id="sState" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sZip" className="text-xs">CEP</Label>
                <Input id="sZip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
