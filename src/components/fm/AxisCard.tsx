"use client";

import React from "react";
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
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
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
