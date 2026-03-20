import { Train, Waypoints, Bus } from "lucide-react";

export type TransportType = "train" | "metro" | "bus";

export interface TransportOption {
  type: TransportType;
  label: string;
  icon: typeof Train;
  colorClass: string;
  bgClass: string;
}

export const transportOptions: TransportOption[] = [
  { type: "train", label: "Trem", icon: Train, colorClass: "text-transit-train", bgClass: "bg-transit-train" },
  { type: "metro", label: "Metrô", icon: Waypoints, colorClass: "text-transit-metro", bgClass: "bg-transit-metro" },
  { type: "bus", label: "Ônibus", icon: Bus, colorClass: "text-transit-bus", bgClass: "bg-transit-bus" },
];

export interface Alert {
  id: string;
  type: TransportType;
  line: string;
  title: string;
  description: string;
  severity: "ok" | "warning" | "critical";
  reportedBy: string;
  timeAgo: string;
  confirmations: number;
}

export interface Station {
  name: string;
  isTransfer?: boolean;
  transferLines?: string[];
}

export interface Line {
  id: string;
  name: string;
  type: TransportType;
  color: string;
  stations: Station[];
  status: "ok" | "warning" | "critical";
  statusMessage: string;
}

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "metro",
    line: "Linha 3 - Vermelha",
    title: "Lentidão entre Sé e Brás",
    description: "Trens operando com velocidade reduzida. Intervalo de ~8 min.",
    severity: "warning",
    reportedBy: "Marcos L.",
    timeAgo: "3 min",
    confirmations: 24,
  },
  {
    id: "2",
    type: "train",
    line: "Linha 9 - Esmeralda",
    title: "Operação normal restabelecida",
    description: "Trens voltaram ao intervalo regular após manutenção.",
    severity: "ok",
    reportedBy: "Ana C.",
    timeAgo: "12 min",
    confirmations: 8,
  },
  {
    id: "3",
    type: "bus",
    line: "Linha 8700",
    title: "Desvio na Av. Paulista",
    description: "Ônibus fazendo desvio pela Rua Augusta devido a manifestação.",
    severity: "critical",
    reportedBy: "Felipe R.",
    timeAgo: "5 min",
    confirmations: 41,
  },
  {
    id: "4",
    type: "metro",
    line: "Linha 4 - Amarela",
    title: "Plataforma lotada na Faria Lima",
    description: "Muita aglomeração na plataforma sentido Luz.",
    severity: "warning",
    reportedBy: "Carla M.",
    timeAgo: "8 min",
    confirmations: 15,
  },
  {
    id: "5",
    type: "train",
    line: "Linha 11 - Coral",
    title: "Trem parado em Guaianases",
    description: "Composição parada por problemas técnicos. Previsão de 20 min para normalização.",
    severity: "critical",
    reportedBy: "Roberto S.",
    timeAgo: "2 min",
    confirmations: 67,
  },
];

export const mockLines: Line[] = [
  {
    id: "l3",
    name: "Linha 3 - Vermelha",
    type: "metro",
    color: "#ee3a43",
    stations: [
      { name: "Palmeiras-Barra Funda", isTransfer: true, transferLines: ["Linha 7", "Linha 8"] },
      { name: "Marechal Deodoro" },
      { name: "Santa Cecília" },
      { name: "República", isTransfer: true, transferLines: ["Linha 4"] },
      { name: "Anhangabaú" },
      { name: "Sé", isTransfer: true, transferLines: ["Linha 1"] },
      { name: "Pedro II" },
      { name: "Brás", isTransfer: true, transferLines: ["Linha 11", "Linha 12"] },
      { name: "Bresser-Mooca" },
      { name: "Belém" },
      { name: "Tatuapé", isTransfer: true, transferLines: ["Linha 11", "Linha 12"] },
      { name: "Carrão" },
      { name: "Penha" },
      { name: "Vila Matilde" },
      { name: "Guilhermina-Esperança" },
      { name: "Patriarca" },
      { name: "Artur Alvim" },
      { name: "Corinthians-Itaquera" },
    ],
    status: "warning",
    statusMessage: "Velocidade reduzida entre Sé e Brás",
  },
  {
    id: "l9",
    name: "Linha 9 - Esmeralda",
    type: "train",
    color: "#00a78e",
    stations: [
      { name: "Osasco" },
      { name: "Presidente Altino" },
      { name: "Ceasa" },
      { name: "Villa-Lobos Jaguaré" },
      { name: "Cidade Universitária" },
      { name: "Pinheiros", isTransfer: true, transferLines: ["Linha 4"] },
      { name: "Hebraica-Rebouças" },
      { name: "Cidade Jardim" },
      { name: "Vila Olímpia" },
      { name: "Berrini" },
      { name: "Morumbi" },
      { name: "Granja Julieta" },
      { name: "Santo Amaro" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l4",
    name: "Linha 4 - Amarela",
    type: "metro",
    color: "#ffd500",
    stations: [
      { name: "Vila Sônia" },
      { name: "São Paulo-Morumbi" },
      { name: "Butantã" },
      { name: "Pinheiros", isTransfer: true, transferLines: ["Linha 9"] },
      { name: "Faria Lima" },
      { name: "Fradique Coutinho" },
      { name: "Oscar Freire" },
      { name: "Paulista", isTransfer: true, transferLines: ["Linha 1"] },
      { name: "Higienópolis-Mackenzie" },
      { name: "República", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Luz", isTransfer: true, transferLines: ["Linha 1", "Linha 7", "Linha 11"] },
    ],
    status: "warning",
    statusMessage: "Plataformas com aglomeração",
  },
];
