"use client";

import React, { useMemo } from "react";
import type { AxisKey, Indicator, MunicipalityRecord } from "@/lib/types";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function valueClass(v: number) {
  if (v <= 10) return "text-zinc-200 bg-zinc-200/10 border-zinc-200/20";
  if (v <= 15) return "text-yellow-200 bg-yellow-200/10 border-yellow-200/20";
  return "text-emerald-200 bg-emerald-200/10 border-emerald-200/10";
}

function slugId(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

function fmt(v: number | undefined) {
  if (v === undefined || Number.isNaN(v)) return "—";
  const r = Math.round(v * 10) / 10;
  return r.toFixed(1);
}

export function AxisCompareCard({
  title,
  axis,
  a,
  b,
  aLabel,
  bLabel,
  description,
}: {
  title: string;
  axis: AxisKey;
  a: MunicipalityRecord;
  b: MunicipalityRecord;
  aLabel: string;
  bLabel: string;
  description?: string;
}) {
  const rows = useMemo(() => {
    const aList = a.axes[axis] ?? [];
    const bList = b.axes[axis] ?? [];

    const aMap = new Map<string, Indicator>();
    const bMap = new Map<string, Indicator>();

    for (const it of aList) aMap.set(it.key, it);
    for (const it of bList) bMap.set(it.key, it);

    const keys = Array.from(new Set([...aMap.keys(), ...bMap.keys()]));

    const merged = keys.map((key) => {
      const ia = aMap.get(key);
      const ib = bMap.get(key);
      const label = ia?.label ?? ib?.label ?? key;
      const description = ia?.description ?? ib?.description;
      return {
        key,
        label,
        description: typeof description === "string" ? description : undefined,
        aVal: ia?.value_0_20,
        bVal: ib?.value_0_20,
      };
    });

    // Ordena por média (desc) pra ficar agradável
    merged.sort((x, y) => {
      const mx = ((x.aVal ?? 0) + (x.bVal ?? 0)) / (Number(x.aVal !== undefined) + Number(x.bVal !== undefined) || 1);
      const my = ((y.aVal ?? 0) + (y.bVal ?? 0)) / (Number(y.aVal !== undefined) + Number(y.bVal !== undefined) || 1);
      return my - mx || x.label.localeCompare(y.label, "pt-BR");
    });

    return merged;
  }, [a, b, axis]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
        <div className="flex items-center gap-2 text-[12px] text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <span/> {aLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <span/> {bLabel}
          </span>
        </div>
      </div>

      <div className="mt-2 divide-y divide-zinc-800/80">
        {rows.map((r) => {
          const tipId = `tip-${axis}-${slugId(r.key)}`;

          return (
            <div key={r.key} className="flex items-center justify-between gap- py-0.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-[13px] text-zinc-200 truncate">{r.label}</div>

                {r.description && (
                  <>
                    <button
                      type="button"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[11px] font-semibold text-white/70 hover:text-white hover:bg-white/15"
                      data-tooltip-id={tipId}
                      data-tooltip-content={r.description}
                      aria-label={`Descrição de ${r.label}`}
                    >
                      ?
                    </button>
                    <Tooltip
                      id={tipId}
                      place="top"
                      className="!bg-zinc-800 !text-zinc-100 !text-xs !px-3 !py-2 !rounded-lg !max-w-[320px] !shadow-lg"
                    />
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={[
                    "min-w-[52px] text-center text-xs font-semibold rounded-lg border px-2 py-0",
                    r.aVal === undefined ? "text-zinc-400 bg-zinc-800/20 border-zinc-700/30" : valueClass(r.aVal),
                  ].join(" ")}
                  title={aLabel}
                >
                  {r.aVal === undefined || Number.isNaN(r.aVal) ? "—" : Math.round(r.aVal)}
                </div>

                <div
                  className={[
                    "min-w-[52px] text-center text-xs font-semibold rounded-lg border px-2 py-0",
                    r.bVal === undefined ? "text-zinc-400 bg-zinc-800/20 border-zinc-700/30" : valueClass(r.bVal),
                  ].join(" ")}
                  title={bLabel}
                >
                  {r.bVal === undefined || Number.isNaN(r.bVal) ? "—" : Math.round(r.bVal)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
