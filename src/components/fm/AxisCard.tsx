"use client";

import React, { useMemo } from "react";
import type { Indicator } from "@/lib/types";
import { AttributeRow } from "@/components/fm/AttributeRow";

export function AxisCard({
  title,
  indicators,
  secondaryIndicators,
}: {
  title: string;
  indicators: Indicator[];
  secondaryIndicators?: Indicator[];
}) {
  const avg = (arr: Indicator[] | undefined) => {
    const values = (arr ?? []).map((i) => i.value_0_20).filter((v) => typeof v === "number");
    if (!values.length) return null;
    const m = values.reduce((a, b) => a + b, 0) / values.length;
    return Math.round(m * 10) / 10;
  };

  const primaryAvg = useMemo(() => avg(indicators), [indicators]);
  const secondaryAvg = useMemo(() => avg(secondaryIndicators), [secondaryIndicators]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          {primaryAvg !== null && (
            <span className="min-w-[56px] text-center text-sm font-semibold text-white leading-none">
              {primaryAvg.toFixed(1)}
            </span>
          )}
          {secondaryAvg !== null && (
            <span className="min-w-[44px] text-center text-xs font-semibold text-white leading-none opacity-90">
              {secondaryAvg.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 divide-y divide-zinc-800/80">
        {indicators.map((it) => {
          const secondary = secondaryIndicators?.find((s) => s.key === it.key);
          return (
            <AttributeRow
              key={it.key}
              label={it.label}
              value={it.value_0_20}
              secondaryValue={secondary?.value_0_20}
              description={`Detalhamento de ${it.label}: A variável ${it.label} representa...`}
            />
          );
        })}
      </div>
    </div>
  );
}
