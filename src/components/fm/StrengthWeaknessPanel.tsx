"use client";

import React, { useMemo } from "react";
import type { MunicipalityRecord, AxisKey, Indicator } from "@/lib/types";
import { AXIS_LABEL } from "@/lib/labels";

type RankedItem = Indicator & { axis: AxisKey };

function valueClass(v: number) {
  if (v <= 10) return "text-zinc-200 bg-zinc-200/10 border-zinc-200/20";
  if (v <= 15) return "text-yellow-200 bg-yellow-200/10 border-yellow-200/20";
  return "text-emerald-200 bg-emerald-200/10 border-emerald-200/20";
}

export function StrengthWeaknessPanel({
  data,
  axes,
  topN = 5,
  disabled,
}: {
  data: MunicipalityRecord;
  axes: AxisKey[];
  topN?: number;
  disabled?: boolean;
}) {
  const { top, bottom } = useMemo(() => {
    if (disabled) return { top: [] as RankedItem[], bottom: [] as RankedItem[] };

    const all: RankedItem[] = axes.flatMap((axis) =>
      (data.axes[axis] ?? []).map((ind) => ({ ...ind, axis }))
    );

    const desc = [...all].sort(
      (a, b) => b.value_0_20 - a.value_0_20 || a.label.localeCompare(b.label, "pt-BR")
    );
    const asc = [...all].sort(
      (a, b) => a.value_0_20 - b.value_0_20 || a.label.localeCompare(b.label, "pt-BR")
    );

    const top = desc.slice(0, topN);
    const topKeys = new Set(top.map((x) => `${x.axis}::${x.key}`));
    const bottom = asc.filter((x) => !topKeys.has(`${x.axis}::${x.key}`)).slice(0, topN);

    return { top, bottom };
  }, [data, axes, topN, disabled]);

  if (disabled) return null;

  const Item = ({ it }: { it: RankedItem }) => (
    <li className="flex items-start py-1">
      <div className="text-sm text-zinc-100 truncate">{it.label}</div>
    </li>
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">

      <div className="mt-3 grid grid-cols-2 gap-3">
        {/* Pontos fortes */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-3">
          <div className="text-sm font-semibold text-emerald-200">Pontos fortes</div>
          <ul className="mt-2">
            {top.map((it) => (
              <Item key={`${it.axis}::${it.key}`} it={it} />
            ))}
          </ul>
        </div>

        {/* Pontos fracos */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-3">
          <div className="text-sm font-semibold text-yellow-200">Pontos fracos</div>
          <ul className="mt-2">
            {bottom.map((it) => (
              <Item key={`${it.axis}::${it.key}`} it={it} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
