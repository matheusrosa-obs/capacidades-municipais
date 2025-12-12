"use client";

import React, { useMemo, useState } from "react";
import type { MunicipalityRecord, AxisKey } from "@/lib/types";
import { AXIS_LABEL } from "@/lib/labels";

import { MunicipalityHeader } from "@/components/fm/MunicipalityHeader";
import { AxisCard } from "@/components/fm/AxisCard";

import Image from "next/image";

const AXES: AxisKey[] = ["Economia", "Inovacao", "Infraestrutura",
                         "CapitalHumano", "Governanca", "Fiscal", "MeioAmbiente",
                         "Demografia", "Saude"];

const MOCK: MunicipalityRecord[] = [
  {
    id: "4205407",
    name: "Florianópolis",
    uf: "SC",
    region: "Sudeste",
    highlights: ["Tecnologias de informação e comunicação", "Inovação", "Capital humano"],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 17.8 },
        { key: "cresc_pib", label: "Crescimento do PIB", value_0_20: 14.7 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 10 },
        { key: "dens_emp", label: "Volume de emprego", value_0_20: 16.1 },
      ],
      Inovacao: [
        { key: "patentes", label: "Patentes", value_0_20: 15 },
        { key: "startups", label: "Startups", value_0_20: 17 },
      ],
      Infraestrutura: [
        { key: "log", label: "Logística", value_0_20: 12.3 },
        { key: "digital", label: "Infra digital", value_0_20: 20 },
      ],
      CapitalHumano: [
        { key: "esc", label: "Escolaridade", value_0_20: 15.6 },
        { key: "tec", label: "Mão de obra técnica", value_0_20: 13.2 },
      ],
      Governanca: [
        { key: "gest", label: "Gestão fiscal", value_0_20: 11.9 },
        { key: "amb", label: "Ambiente de negócios", value_0_20: 20 },
      ],
      Fiscal: [
        { key : "rec", label: "Receita per capita", value_0_20: 20 },
        { key : "desp", label: "Despesa per capita", value_0_20: 13.5 },
      ],
      MeioAmbiente: [
        { key: "verde", label: "Áreas verdes", value_0_20: 14.5 },
        { key: "agua", label: "Saneamento básico", value_0_20: 18.0 },
      ],
      Demografia: [
        { key: "pop", label: "Crescimento populacional", value_0_20: 12.0 },
        { key: "dens", label: "Densidade demográfica", value_0_20: 14.3 },
      ],
      Saude: [
        { key: "hosp", label: "Leitos hospitalares", value_0_20: 17.5 },
        { key: "med", label: "Médicos per capita", value_0_20: 19.0 },
      ],
    },
  },
  {
    id: "4209102",
    name: "Joinville",
    uf: "SC",
    region: "Norte",
    highlights: ["Economia", "Infraestrutura"],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 16.5 },
        { key: "cresc_pib", label: "Crescimento do PIB", value_0_20: 13.2 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 14 },
        { key: "dens_emp", label: "Volume de emprego", value_0_20: 15.0 },
      ],
      Inovacao: [
        { key: "patentes", label: "Patentes", value_0_20: 6 },
        { key: "startups", label: "Startups", value_0_20: 8 },
      ],
      Infraestrutura: [
        { key: "log", label: "Logística", value_0_20: 14.0 },
        { key: "digital", label: "Infra digital", value_0_20: 15.0 },
      ],
      CapitalHumano: [
        { key: "esc", label: "Escolaridade", value_0_20: 14.0 },
        { key: "tec", label: "Mão de obra técnica", value_0_20: 12.5 },
      ],
      Governanca: [
        { key: "gest", label: "Gestão fiscal", value_0_20: 12.5 },
        { key: "amb", label: "Ambiente de negócios", value_0_20: 18 },
      ],
      Fiscal: [
        { key : "rec", label: "Receita per capita", value_0_20: 18 },
        { key : "desp", label: "Despesa per capita", value_0_20: 14.0 },
      ],
      MeioAmbiente: [
        { key: "verde", label: "Áreas verdes", value_0_20: 13.0 },
        { key: "agua", label: "Saneamento básico", value_0_20: 17.0 },
      ],
      Demografia: [
        { key: "pop", label: "Crescimento populacional", value_0_20: 11.0 },
        { key: "dens", label: "Densidade demográfica", value_0_20: 13.5 },
      ],
      Saude: [
        { key: "hosp", label: "Leitos hospitalares", value_0_20: 16.0 },
        { key: "med", label: "Médicos per capita", value_0_20: 18.0 },
      ],
    },
  }
];

export default function Page() {
  const [selectedId, setSelectedId] = useState(MOCK[0].id);

  const selected = useMemo(
    () => MOCK.find((m) => m.id === selectedId) ?? MOCK[0],
    [selectedId]
  );

  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Capacidades municipais</h1>
          </div>

          <label className="text-sm">
            <span className="block text-zinc-400 mb-2">Selecionar o município:</span>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-[320px] rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none"
            >
              {MOCK.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.uf})
                </option>
              ))}
            </select>
          </label>
        </div>

        <MunicipalityHeader data={selected} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {AXES.map((axis) => (
            <AxisCard
              key={axis}
              title={AXIS_LABEL[axis]}
              indicators={selected.axes[axis]}
            />
          ))}
        </div>
      </div>
    <div className="flex justify-center py-2">
    <Image
      src="/logo_dark.png"
      alt="Imagem de rodapé"
      width={350}
      height={200}
      className="max-w-full h-auto rounded-xl opacity-90"
      priority={false}
    />
    </div>
   
    </main>
  );
}
