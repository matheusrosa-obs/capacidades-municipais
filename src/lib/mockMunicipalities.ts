import type { MunicipalityRecord } from "@/lib/types";

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