"use client";

import React, { useMemo, useState } from "react";
import type { AxisKey } from "@/lib/types";
import { AXIS_LABEL } from "@/lib/labels";
import { MunicipalityHeader } from "@/components/fm/MunicipalityHeader";
import { AxisCard } from "@/components/fm/AxisCard";
import { RadarAxisAverages } from "@/features/radar/RadarPanel";
import { StrengthWeaknessPanel } from "@/components/fm/StrengthWeaknessPanel";

import Image from "next/image";
import { Link } from "next-view-transitions";

const AXES: AxisKey[] = [
  "Economia",
  "CapitalHumano",
  "QualidadeVida",
  "Seguranca",
  "MeioAmbiente",
  "Saude",
  "Inovacao",
  "Governanca",
  "Infraestrutura",
];

import { MUNICIPALITIES_MOCK } from "@/lib/data";

export default function Page() {
  const [selectedAId, setSelectedAId] = useState(MUNICIPALITIES_MOCK[0].id);
  const [selectedBId, setSelectedBId] = useState("");

  const selectedA = useMemo(
    () => MUNICIPALITIES_MOCK.find((m) => m.id === selectedAId) ?? MUNICIPALITIES_MOCK[0],
    [selectedAId]
  );
  const selectedB = useMemo(
    () => MUNICIPALITIES_MOCK.find((m) => m.id === selectedBId),
    [selectedBId]
  );

  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-5">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white/90 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5"
          >
            ← Voltar
          </Link>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Capacidades municipais</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="text-sm">
              <span className="block text-zinc-400 mb-2">Selecione o município:</span>
              <select
                value={selectedAId}
                onChange={(e) => {
                  const newA = e.target.value;
                  setSelectedAId(newA);
                  if (selectedBId === newA) setSelectedBId("");
                }}
                className="w-[240px] rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none"
              >
                {MUNICIPALITIES_MOCK.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="block text-zinc-400 mb-2">Para comparar, selecione:</span>
              <select
                value={selectedBId}
                onChange={(e) => {
                  const next = e.target.value;
                  if (next === "" || next !== selectedAId) setSelectedBId(next);
                }}
                className="w-[220px] rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none"
              >
                <option value="">-</option>
                {MUNICIPALITIES_MOCK.filter((m) => m.id !== selectedAId).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <MunicipalityHeader data={selectedA} secondary={selectedB ?? undefined} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {AXES.map((axis) => (
            <AxisCard
              key={axis}
              title={AXIS_LABEL[axis]}
              indicators={selectedA.axes[axis]}
              secondaryIndicators={selectedB?.axes[axis]}
            />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
          <div className="lg:col-span-2">
            <RadarAxisAverages data={selectedA} axes={AXES} secondary={selectedB ?? undefined} />
          </div>

          <div className="lg:col-span-2">
            <StrengthWeaknessPanel data={selectedA} axes={AXES} topN={5} />
          </div>
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
