"use client";

import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function valueClass(v: number) {
  if (v <= 10) return "text-zinc-200 bg-zinc-200/10 border-zinc-200/20";
  if (v <= 15) return "text-yellow-200 bg-yellow-200/10 border-yellow-200/20";
  return "text-emerald-200 bg-emerald-200/10 border-emerald-200/20";
}

function slugId(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

export function AttributeRow({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description?: string;
}) {
  const v = Math.round(value * 10) / 10;
  const tipId = `tip-${slugId(label)}`;

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <div className="text-sm text-zinc-200 truncate">{label}</div>

        {description && (
          <>
            <button
              type="button"
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[11px] font-semibold text-white/70 hover:text-white hover:bg-white/15"
              data-tooltip-id={tipId}
              data-tooltip-content={description}
              aria-label={`Descrição de ${label}`}
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

      <div
        className={[
          "min-w-[56px] shrink-0 text-center text-sm font-semibold rounded-lg border px-2 py-1",
          valueClass(Math.round(value)),
        ].join(" ")}
        title={`Valor: ${Math.round(value)}`}
      >
        {Math.round(value)}
      </div>
    </div>
  );
}
