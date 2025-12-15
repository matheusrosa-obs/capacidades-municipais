export type AxisKey =
  | "Economia"
  | "Inovacao"
  | "Infraestrutura"
  | "CapitalHumano"
  | "Governanca"
  | "MeioAmbiente"
  | "Saude"
  | "QualidadeVida"
  | "Seguranca";

export type Indicator = {
  key: string;
  label: string;
  value_0_20: number;
};

export type MunicipalityRecord = {
  id: string;
  name: string;
  uf: string;
  region?: string;
  highlights?: string[];
  axes: Record<AxisKey, Indicator[]>;
};
