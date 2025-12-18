"use client";

import React, { useMemo, useState } from "react";
import type { MunicipalityRecord, AxisKey } from "@/lib/types";
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

const MOCK: MunicipalityRecord[] = [
  {
    id: "4205407",
    name: "Florianópolis",
    uf: "SC",
    region: "Sudeste",
    highlights: [
      "Tecnologias de informação e comunicação",
      "Inovação",
      "Capital humano",
    ],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 17.8 },
        { key: "proj_pib", label: "Projeção do PIB", value_0_20: 14.7 },
        { key: "estab_econ", label: "Estabilidade econômica", value_0_20: 18.5 },
        { key: "vab_ind_pc", label: "VAB industrial per capita", value_0_20: 18.0 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 10 },
        { key: "emp_form", label: "Emprego formal", value_0_20: 16.1 },
        { key: "cresc_emp", label: "Crescimento do emprego", value_0_20: 12.4 },
        { key: "complex", label: "Complexidade econômica", value_0_20: 19.2 },
      ],
      CapitalHumano: [
        { key: "pop", label: "População", value_0_20: 15.6 },
        { key: "cresc_pop", label: "Crescimento populacional", value_0_20: 17 },
        { key: "perf_eta", label: "Perfil etário", value_0_20: 12 },
        { key: "unis", label: "Universidades", value_0_20: 19.1 },
        { key: "niv_educ", label: "Nível educacional", value_0_20: 16.5 },
        { key: "infra_esc", label: "Infraestrutura nas escolas", value_0_20: 16.7 },
        { key: "pop_ext", label: "População nascida no exterior", value_0_20: 14.3 },
      ],
      QualidadeVida: [
        { key: "igu_renda", label: "Igualdade de renda", value_0_20: 8 },
        { key: "renda_pc", label: "Renda per capita", value_0_20: 13 },
        { key: "gasto_habit", label: "Gasto com habitação", value_0_20: 6 },
        { key: "expec_vida", label: "Expectativa de vida", value_0_20: 18 },
        { key: "bolsa_fam", label: "Famílias no Bolsa Família", value_0_20: 8.5 },
        { key: "bolsa_val", label: "Valor médio Bolsa Família", value_0_20: 9.0 },
      ],
      Seguranca: [
        { key: "tax_crim", label: "Taxa de criminalidade", value_0_20: 14 },
        { key: "homicidios", label: "Homicídios", value_0_20: 16 },
        { key: "acid_rodov", label: "Acidentes rodoviários", value_0_20: 15 },
        { key: "obit_transp", label: "Óbitos no transporte", value_0_20: 17 },
      ],
      MeioAmbiente: [
        { key: "inten_emi", label: "Intensidade de emissões", value_0_20: 14 },
        { key: "emi_pc", label: "Emissões de CO2 per capita", value_0_20: 18 },
        { key: "dest_nat", label: "Desastres naturais", value_0_20: 14 },
        { key: "ag_pot", label: "Acesso à água potável", value_0_20: 17.5 },
        { key: "esg_san", label: "Esgotamento sanitário", value_0_20: 19.0 },
        { key: "col_lixo", label: "Coleta de lixo", value_0_20: 18.0 },
      ],
      Saude: [
        { key: "estab_saude", label: "Estabelecimentos de saúde", value_0_20: 14 },
        { key: "leitos", label: "Leitos hospitalares", value_0_20: 12.0 },
        { key: "leitos_uti", label: "Leitos de UTI", value_0_20: 15.0 },
        { key: "leitos_uti_sus", label: "Leitos de UTI no SUS", value_0_20: 13.0 },
        { key: "quant_med", label: "Quantidade de médicos", value_0_20: 14.0 },
        { key: "prof_saude", label: "Profissionais de saúde", value_0_20: 15.0 },
        { key: "equips_saude", label: "Equipamentos de saúde", value_0_20: 16.0 },
      ],
      Inovacao: [
        { key: "quant_empr", label: "Quantidade de empresas", value_0_20: 15 },
        { key: "fac_empr", label: "Facilidade de abertura de empresas", value_0_20: 17 },
        { key: "rend_trabalho", label: "Rendimento médio do trabalho", value_0_20: 14.5 },
        { key: "bolsas_pesq", label: "Bolsas de pesquisa", value_0_20: 18.2 },
      ],
      Governanca: [
        { key: "alert_lrf", label: "Alerta LRF", value_0_20: 11.9 },
        { key: "receit_trib", label: "Receita tributária efetiva", value_0_20: 20 },
        { key: "end_liquido", label: "Endividamento líquido", value_0_20: 16.5 },
        { key: "gasto_gov", label: "Gasto do governo", value_0_20: 14.3 },
        { key: "transp_munic", label: "Transparência dos municípios", value_0_20: 19.0 },
      ],
      Infraestrutura: [
        { key: "qual_estrad", label: "Qualidade das estradas", value_0_20: 12.3 },
        { key: "banda_fixa", label: "Acesso à banda larga fixa", value_0_20: 20 },
        { key: "banda_movel", label: "Acesso à banda larga móvel", value_0_20: 18.5 },
      ],
    },
  },
  {
    id: "4209102",
    name: "Joinville",
    uf: "SC",
    region: "Norte",
    highlights: ["Indústria", "Infraestrutura", "Capital humano"],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 19.2 },
        { key: "proj_pib", label: "Projeção do PIB", value_0_20: 16.5 },
        { key: "estab_econ", label: "Estabilidade econômica", value_0_20: 17.8 },
        { key: "vab_ind_pc", label: "VAB industrial per capita", value_0_20: 19.0 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 12.5 },
        { key: "emp_form", label: "Emprego formal", value_0_20: 17.2 },
        { key: "cresc_emp", label: "Crescimento do emprego", value_0_20: 13.7 },
        { key: "complex", label: "Complexidade econômica", value_0_20: 18.7 },
      ],
      CapitalHumano: [
        { key: "pop", label: "População", value_0_20: 18.0 },
        { key: "cresc_pop", label: "Crescimento populacional", value_0_20: 16.2 },
        { key: "perf_eta", label: "Perfil etário", value_0_20: 13.5 },
        { key: "unis", label: "Universidades", value_0_20: 17.8 },
        { key: "niv_educ", label: "Nível educacional", value_0_20: 15.9 },
        { key: "infra_esc", label: "Infraestrutura nas escolas", value_0_20: 15.5 },
        { key: "pop_ext", label: "População nascida no exterior", value_0_20: 13.1 },
      ],
      QualidadeVida: [
        { key: "igu_renda", label: "Igualdade de renda", value_0_20: 9.2 },
        { key: "renda_pc", label: "Renda per capita", value_0_20: 14.5 },
        { key: "gasto_habit", label: "Gasto com habitação", value_0_20: 7.5 },
        { key: "expec_vida", label: "Expectativa de vida", value_0_20: 17.2 },
        { key: "bolsa_fam", label: "Famílias no Bolsa Família", value_0_20: 7.9 },
        { key: "bolsa_val", label: "Valor médio Bolsa Família", value_0_20: 8.7 },
      ],
      Seguranca: [
        { key: "tax_crim", label: "Taxa de criminalidade", value_0_20: 13.5 },
        { key: "homicidios", label: "Homicídios", value_0_20: 15.2 },
        { key: "acid_rodov", label: "Acidentes rodoviários", value_0_20: 14.3 },
        { key: "obit_transp", label: "Óbitos no transporte", value_0_20: 16.1 },
      ],
      MeioAmbiente: [
        { key: "inten_emi", label: "Intensidade de emissões", value_0_20: 13.2 },
        { key: "emi_pc", label: "Emissões de CO2 per capita", value_0_20: 17.1 },
        { key: "dest_nat", label: "Desastres naturais", value_0_20: 13.8 },
        { key: "ag_pot", label: "Acesso à água potável", value_0_20: 18.1 },
        { key: "esg_san", label: "Esgotamento sanitário", value_0_20: 18.7 },
        { key: "col_lixo", label: "Coleta de lixo", value_0_20: 17.6 },
      ],
      Saude: [
        { key: "estab_saude", label: "Estabelecimentos de saúde", value_0_20: 13.8 },
        { key: "leitos", label: "Leitos hospitalares", value_0_20: 13.2 },
        { key: "leitos_uti", label: "Leitos de UTI", value_0_20: 14.7 },
        { key: "leitos_uti_sus", label: "Leitos de UTI no SUS", value_0_20: 12.8 },
        { key: "quant_med", label: "Quantidade de médicos", value_0_20: 13.9 },
        { key: "prof_saude", label: "Profissionais de saúde", value_0_20: 14.5 },
        { key: "equips_saude", label: "Equipamentos de saúde", value_0_20: 15.2 },
      ],
      Inovacao: [
        { key: "quant_empr", label: "Quantidade de empresas", value_0_20: 16.2 },
        { key: "fac_empr", label: "Facilidade de abertura de empresas", value_0_20: 16.8 },
        { key: "rend_trabalho", label: "Rendimento médio do trabalho", value_0_20: 13.9 },
        { key: "bolsas_pesq", label: "Bolsas de pesquisa", value_0_20: 14 },
      ],
      Governanca: [
        { key: "alert_lrf", label: "Alerta LRF", value_0_20: 12.5 },
        { key: "receit_trib", label: "Receita tributária efetiva", value_0_20: 19.2 },
        { key: "end_liquido", label: "Endividamento líquido", value_0_20: 15.7 },
        { key: "gasto_gov", label: "Gasto do governo", value_0_20: 13.9 },
        { key: "transp_munic", label: "Transparência dos municípios", value_0_20: 18.3 },
      ],
      Infraestrutura: [
        { key: "qual_estrad", label: "Qualidade das estradas", value_0_20: 13.1 },
        { key: "banda_fixa", label: "Acesso à banda larga fixa", value_0_20: 14 },
        { key: "banda_movel", label: "Acesso à banda larga móvel", value_0_20: 17.8 },
      ],
    },
  },
  {
    id: "4202008",
    name: "Blumenau",
    uf: "SC",
    region: "Norte",
    highlights: ["Indústria têxtil", "Educação", "Saúde"],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 16.7 },
        { key: "proj_pib", label: "Projeção do PIB", value_0_20: 13.9 },
        { key: "estab_econ", label: "Estabilidade econômica", value_0_20: 16.2 },
        { key: "vab_ind_pc", label: "VAB industrial per capita", value_0_20: 18.3 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 11.8 },
        { key: "emp_form", label: "Emprego formal", value_0_20: 15.4 },
        { key: "cresc_emp", label: "Crescimento do emprego", value_0_20: 11.9 },
        { key: "complex", label: "Complexidade econômica", value_0_20: 17.1 },
      ],
      CapitalHumano: [
        { key: "pop", label: "População", value_0_20: 14.9 },
        { key: "cresc_pop", label: "Crescimento populacional", value_0_20: 15.1 },
        { key: "perf_eta", label: "Perfil etário", value_0_20: 11.7 },
        { key: "unis", label: "Universidades", value_0_20: 18.3 },
        { key: "niv_educ", label: "Nível educacional", value_0_20: 15.2 },
        { key: "infra_esc", label: "Infraestrutura nas escolas", value_0_20: 15.9 },
        { key: "pop_ext", label: "População nascida no exterior", value_0_20: 12.7 },
      ],
      QualidadeVida: [
        { key: "igu_renda", label: "Igualdade de renda", value_0_20: 8.7 },
        { key: "renda_pc", label: "Renda per capita", value_0_20: 13.8 },
        { key: "gasto_habit", label: "Gasto com habitação", value_0_20: 6.8 },
        { key: "expec_vida", label: "Expectativa de vida", value_0_20: 16.5 },
        { key: "bolsa_fam", label: "Famílias no Bolsa Família", value_0_20: 7.2 },
        { key: "bolsa_val", label: "Valor médio Bolsa Família", value_0_20: 8.1 },
      ],
      Seguranca: [
        { key: "tax_crim", label: "Taxa de criminalidade", value_0_20: 13.1 },
        { key: "homicidios", label: "Homicídios", value_0_20: 14.7 },
        { key: "acid_rodov", label: "Acidentes rodoviários", value_0_20: 13.9 },
        { key: "obit_transp", label: "Óbitos no transporte", value_0_20: 15.3 },
      ],
      MeioAmbiente: [
        { key: "inten_emi", label: "Intensidade de emissões", value_0_20: 12.7 },
        { key: "emi_pc", label: "Emissões de CO2 per capita", value_0_20: 16.3 },
        { key: "dest_nat", label: "Desastres naturais", value_0_20: 13.2 },
        { key: "ag_pot", label: "Acesso à água potável", value_0_20: 17.2 },
        { key: "esg_san", label: "Esgotamento sanitário", value_0_20: 18.1 },
        { key: "col_lixo", label: "Coleta de lixo", value_0_20: 16.8 },
      ],
      Saude: [
        { key: "estab_saude", label: "Estabelecimentos de saúde", value_0_20: 13.2 },
        { key: "leitos", label: "Leitos hospitalares", value_0_20: 12.7 },
        { key: "leitos_uti", label: "Leitos de UTI", value_0_20: 14.1 },
        { key: "leitos_uti_sus", label: "Leitos de UTI no SUS", value_0_20: 12.2 },
        { key: "quant_med", label: "Quantidade de médicos", value_0_20: 13.3 },
        { key: "prof_saude", label: "Profissionais de saúde", value_0_20: 14.1 },
        { key: "equips_saude", label: "Equipamentos de saúde", value_0_20: 14.8 },
      ],
      Inovacao: [
        { key: "quant_empr", label: "Quantidade de empresas", value_0_20: 15.1 },
        { key: "fac_empr", label: "Facilidade de abertura de empresas", value_0_20: 15.9 },
        { key: "rend_trabalho", label: "Rendimento médio do trabalho", value_0_20: 13.1 },
        { key: "bolsas_pesq", label: "Bolsas de pesquisa", value_0_20: 16.2 },
      ],
      Governanca: [
        { key: "alert_lrf", label: "Alerta LRF", value_0_20: 11.7 },
        { key: "receit_trib", label: "Receita tributária efetiva", value_0_20: 18.1 },
        { key: "end_liquido", label: "Endividamento líquido", value_0_20: 14.9 },
        { key: "gasto_gov", label: "Gasto do governo", value_0_20: 13.1 },
        { key: "transp_munic", label: "Transparência dos municípios", value_0_20: 17.2 },
      ],
      Infraestrutura: [
        { key: "qual_estrad", label: "Qualidade das estradas", value_0_20: 12.2 },
        { key: "banda_fixa", label: "Acesso à banda larga fixa", value_0_20: 18.2 },
        { key: "banda_movel", label: "Acesso à banda larga móvel", value_0_20: 16.7 },
      ],
    },
  },
  {
    id: "4216602",
    name: "São José",
    uf: "SC",
    region: "Sudeste",
    highlights: ["Serviços", "Educação", "Inovação"],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 15.9 },
        { key: "proj_pib", label: "Projeção do PIB", value_0_20: 13.2 },
        { key: "estab_econ", label: "Estabilidade econômica", value_0_20: 15.7 },
        { key: "vab_ind_pc", label: "VAB industrial per capita", value_0_20: 10 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 11.2 },
        { key: "emp_form", label: "Emprego formal", value_0_20: 12 },
        { key: "cresc_emp", label: "Crescimento do emprego", value_0_20: 16 },
        { key: "complex", label: "Complexidade econômica", value_0_20: 12 },
      ],
      CapitalHumano: [
        { key: "pop", label: "População", value_0_20: 13.7 },
        { key: "cresc_pop", label: "Crescimento populacional", value_0_20: 14.2 },
        { key: "perf_eta", label: "Perfil etário", value_0_20: 15 },
        { key: "unis", label: "Universidades", value_0_20: 14 },
        { key: "niv_educ", label: "Nível educacional", value_0_20: 12 },
        { key: "infra_esc", label: "Infraestrutura nas escolas", value_0_20: 15.1 },
        { key: "pop_ext", label: "População nascida no exterior", value_0_20: 11.9 },
      ],
      QualidadeVida: [
        { key: "igu_renda", label: "Igualdade de renda", value_0_20: 8.1 },
        { key: "renda_pc", label: "Renda per capita", value_0_20: 13.1 },
        { key: "gasto_habit", label: "Gasto com habitação", value_0_20: 6.2 },
        { key: "expec_vida", label: "Expectativa de vida", value_0_20: 15.8 },
        { key: "bolsa_fam", label: "Famílias no Bolsa Família", value_0_20: 6.9 },
        { key: "bolsa_val", label: "Valor médio Bolsa Família", value_0_20: 7.8 },
      ],
      Seguranca: [
        { key: "tax_crim", label: "Taxa de criminalidade", value_0_20: 10 },
        { key: "homicidios", label: "Homicídios", value_0_20: 14.1 },
        { key: "acid_rodov", label: "Acidentes rodoviários", value_0_20: 13.2 },
        { key: "obit_transp", label: "Óbitos no transporte", value_0_20: 14.7 },
      ],
      MeioAmbiente: [
        { key: "inten_emi", label: "Intensidade de emissões", value_0_20: 12.1 },
        { key: "emi_pc", label: "Emissões de CO2 per capita", value_0_20: 15.7 },
        { key: "dest_nat", label: "Desastres naturais", value_0_20: 12.6 },
        { key: "ag_pot", label: "Acesso à água potável", value_0_20: 16.5 },
        { key: "esg_san", label: "Esgotamento sanitário", value_0_20: 17.3 },
        { key: "col_lixo", label: "Coleta de lixo", value_0_20: 16.1 },
      ],
      Saude: [
        { key: "estab_saude", label: "Estabelecimentos de saúde", value_0_20: 12.7 },
        { key: "leitos", label: "Leitos hospitalares", value_0_20: 12.1 },
        { key: "leitos_uti", label: "Leitos de UTI", value_0_20: 13.5 },
        { key: "leitos_uti_sus", label: "Leitos de UTI no SUS", value_0_20: 11.8 },
        { key: "quant_med", label: "Quantidade de médicos", value_0_20: 12.7 },
        { key: "prof_saude", label: "Profissionais de saúde", value_0_20: 13.5 },
        { key: "equips_saude", label: "Equipamentos de saúde", value_0_20: 14.1 },
      ],
      Inovacao: [
        { key: "quant_empr", label: "Quantidade de empresas", value_0_20: 14.2 },
        { key: "fac_empr", label: "Facilidade de abertura de empresas", value_0_20: 15.1 },
        { key: "rend_trabalho", label: "Rendimento médio do trabalho", value_0_20: 12.7 },
        { key: "bolsas_pesq", label: "Bolsas de pesquisa", value_0_20: 15.3 },
      ],
      Governanca: [
        { key: "alert_lrf", label: "Alerta LRF", value_0_20: 11.1 },
        { key: "receit_trib", label: "Receita tributária efetiva", value_0_20: 17.3 },
        { key: "end_liquido", label: "Endividamento líquido", value_0_20: 14.1 },
        { key: "gasto_gov", label: "Gasto do governo", value_0_20: 12.7 },
        { key: "transp_munic", label: "Transparência dos municípios", value_0_20: 16.5 },
      ],
      Infraestrutura: [
        { key: "qual_estrad", label: "Qualidade das estradas", value_0_20: 11.7 },
        { key: "banda_fixa", label: "Acesso à banda larga fixa", value_0_20: 17.2 },
        { key: "banda_movel", label: "Acesso à banda larga móvel", value_0_20: 15.9 },
      ],
    },
  },
  {
    id: "4207305",
    name: "Imbituba",
    uf: "SC",
    region: "Sul",
    highlights: ["Turismo", "Comércio", "Logística"],
    axes: {
      Economia: [
        { key: "pib", label: "PIB total", value_0_20: 11 },
        { key: "proj_pib", label: "Projeção do PIB", value_0_20: 13 },
        { key: "estab_econ", label: "Estabilidade econômica", value_0_20: 16 },
        { key: "vab_ind_pc", label: "VAB industrial per capita", value_0_20: 10 },
        { key: "pib_pc", label: "PIB per capita", value_0_20: 11 },
        { key: "emp_form", label: "Emprego formal", value_0_20: 12 },
        { key: "cresc_emp", label: "Crescimento do emprego", value_0_20: 16 },
        { key: "complex", label: "Complexidade econômica", value_0_20: 12 },
      ],
      CapitalHumano: [
        { key: "pop", label: "População", value_0_20: 12 },
        { key: "cresc_pop", label: "Crescimento populacional", value_0_20: 16 },
        { key: "perf_eta", label: "Perfil etário", value_0_20: 10 },
        { key: "unis", label: "Universidades", value_0_20: 8 },
        { key: "niv_educ", label: "Nível educacional", value_0_20: 9 },
        { key: "infra_esc", label: "Infraestrutura nas escolas", value_0_20: 12 },
        { key: "pop_ext", label: "População nascida no exterior", value_0_20: 6 },
      ],
      QualidadeVida: [
        { key: "igu_renda", label: "Igualdade de renda", value_0_20: 12 },
        { key: "renda_pc", label: "Renda per capita", value_0_20: 11 },
        { key: "gasto_habit", label: "Gasto com habitação", value_0_20: 17 },
        { key: "expec_vida", label: "Expectativa de vida", value_0_20: 14 },
        { key: "bolsa_fam", label: "Famílias no Bolsa Família", value_0_20: 10 },
        { key: "bolsa_val", label: "Valor médio Bolsa Família", value_0_20: 8 },
      ],
      Seguranca: [
        { key: "tax_crim", label: "Taxa de criminalidade", value_0_20: 17 },
        { key: "homicidios", label: "Homicídios", value_0_20: 19 },
        { key: "acid_rodov", label: "Acidentes rodoviários", value_0_20: 14 },
        { key: "obit_transp", label: "Óbitos no transporte", value_0_20: 14 },
      ],
      MeioAmbiente: [
        { key: "inten_emi", label: "Intensidade de emissões", value_0_20: 16 },
        { key: "emi_pc", label: "Emissões de CO2 per capita", value_0_20: 13 },
        { key: "dest_nat", label: "Desastres naturais", value_0_20: 13 },
        { key: "ag_pot", label: "Acesso à água potável", value_0_20: 19 },
        { key: "esg_san", label: "Esgotamento sanitário", value_0_20: 14 },
        { key: "col_lixo", label: "Coleta de lixo", value_0_20: 17 },
      ],
      Saude: [
        { key: "estab_saude", label: "Estabelecimentos de saúde", value_0_20: 13 },
        { key: "leitos", label: "Leitos hospitalares", value_0_20: 14 },
        { key: "leitos_uti", label: "Leitos de UTI", value_0_20: 11 },
        { key: "leitos_uti_sus", label: "Leitos de UTI no SUS", value_0_20: 11 },
        { key: "quant_med", label: "Quantidade de médicos", value_0_20: 12 },
        { key: "prof_saude", label: "Profissionais de saúde", value_0_20: 13 },
        { key: "equips_saude", label: "Equipamentos de saúde", value_0_20: 11 },
      ],
      Inovacao: [
        { key: "quant_empr", label: "Quantidade de empresas", value_0_20: 15 },
        { key: "fac_empr", label: "Facilidade de abertura de empresas", value_0_20: 14 },
        { key: "rend_trabalho", label: "Rendimento médio do trabalho", value_0_20: 12 },
        { key: "bolsas_pesq", label: "Bolsas de pesquisa", value_0_20: 7 },
      ],
      Governanca: [
        { key: "alert_lrf", label: "Alerta LRF", value_0_20: 17 },
        { key: "receit_trib", label: "Receita tributária efetiva", value_0_20: 14 },
        { key: "end_liquido", label: "Endividamento líquido", value_0_20: 12 },
        { key: "gasto_gov", label: "Gasto do governo", value_0_20: 14 },
        { key: "transp_munic", label: "Transparência dos municípios", value_0_20: 11 },
      ],
      Infraestrutura: [
        { key: "qual_estrad", label: "Qualidade das estradas", value_0_20: 11 },
        { key: "banda_fixa", label: "Acesso à banda larga fixa", value_0_20: 18 },
        { key: "banda_movel", label: "Acesso à banda larga móvel", value_0_20: 16 },
      ],
    },
  },
];

export default function Page() {
  const [selectedAId, setSelectedAId] = useState(MOCK[0].id);
  const [selectedBId, setSelectedBId] = useState(MOCK[1]?.id ?? MOCK[0].id);

  const selectedA = useMemo(
    () => MOCK.find((m) => m.id === selectedAId) ?? MOCK[0],
    [selectedAId]
  );
  const selectedB = useMemo(
    () => MOCK.find((m) => m.id === selectedBId),
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
              <span className="block text-zinc-400 mb-2">Município A</span>
              <select
                value={selectedAId}
                onChange={(e) => setSelectedAId(e.target.value)}
                className="w-[240px] rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none"
              >
                {MOCK.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="block text-zinc-400 mb-2">Município B (comparar)</span>
              <select
                value={selectedBId}
                onChange={(e) => setSelectedBId(e.target.value)}
                className="w-[220px] rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 outline-none"
              >
                {MOCK.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <MunicipalityHeader data={selectedA} />

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
