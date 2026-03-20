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

export interface RouteResult {
  id: string;
  duration: string;
  departureTime: string;
  arrivalTime: string;
  steps: RouteStep[];
  transfers: number;
  fare: string;
}

export interface RouteStep {
  type: TransportType;
  line: string;
  lineColor: string;
  from: string;
  to: string;
  duration: string;
  stations: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "alert" | "info" | "promo";
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface TicketCard {
  id: string;
  type: "bilhete_unico" | "bom" | "top";
  name: string;
  number: string;
  balance: number;
  lastUsed: string;
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
  {
    id: "6",
    type: "metro",
    line: "Linha 15 - Prata",
    title: "Monotrilho com intervalo ampliado",
    description: "Operando com intervalo de 10 minutos entre composições.",
    severity: "warning",
    reportedBy: "Juliana P.",
    timeAgo: "15 min",
    confirmations: 12,
  },
  {
    id: "7",
    type: "bus",
    line: "Linha 5010",
    title: "Ônibus lotados na Marginal Pinheiros",
    description: "Horário de pico com ônibus sem espaço. Considere alternativas.",
    severity: "warning",
    reportedBy: "Eduardo T.",
    timeAgo: "6 min",
    confirmations: 33,
  },
  {
    id: "8",
    type: "train",
    line: "Linha 8 - Diamante",
    title: "Operação normal",
    description: "Trens circulando com intervalo regular de 6 minutos.",
    severity: "ok",
    reportedBy: "Sistema",
    timeAgo: "30 min",
    confirmations: 5,
  },
];

export const mockLines: Line[] = [
  {
    id: "l1",
    name: "Linha 1 - Azul",
    type: "metro",
    color: "#0455a1",
    stations: [
      { name: "Jabaquara" },
      { name: "Conceição" },
      { name: "São Judas" },
      { name: "Saúde" },
      { name: "Praça da Árvore" },
      { name: "Santa Cruz" },
      { name: "Vila Mariana" },
      { name: "Ana Rosa", isTransfer: true, transferLines: ["Linha 2"] },
      { name: "Paraíso", isTransfer: true, transferLines: ["Linha 2"] },
      { name: "Vergueiro" },
      { name: "São Joaquim" },
      { name: "Liberdade" },
      { name: "Sé", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "São Bento" },
      { name: "Luz", isTransfer: true, transferLines: ["Linha 4", "Linha 7", "Linha 11"] },
      { name: "Tiradentes" },
      { name: "Armênia" },
      { name: "Portuguesa-Tietê" },
      { name: "Carandiru" },
      { name: "Santana" },
      { name: "Jardim São Paulo" },
      { name: "Parada Inglesa" },
      { name: "Tucuruvi" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l2",
    name: "Linha 2 - Verde",
    type: "metro",
    color: "#007e5e",
    stations: [
      { name: "Vila Prudente", isTransfer: true, transferLines: ["Linha 15"] },
      { name: "Tamanduateí", isTransfer: true, transferLines: ["Linha 10"] },
      { name: "Sacomã" },
      { name: "Alto do Ipiranga" },
      { name: "Santos-Imigrantes" },
      { name: "Chácara Klabin" },
      { name: "Ana Rosa", isTransfer: true, transferLines: ["Linha 1"] },
      { name: "Paraíso", isTransfer: true, transferLines: ["Linha 1"] },
      { name: "Brigadeiro" },
      { name: "Trianon-Masp" },
      { name: "Consolação", isTransfer: true, transferLines: ["Linha 4"] },
      { name: "Clínicas" },
      { name: "Sumaré" },
      { name: "Vila Madalena" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
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
      { name: "Paulista", isTransfer: true, transferLines: ["Linha 2"] },
      { name: "Higienópolis-Mackenzie" },
      { name: "República", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Luz", isTransfer: true, transferLines: ["Linha 1", "Linha 7", "Linha 11"] },
    ],
    status: "warning",
    statusMessage: "Plataformas com aglomeração",
  },
  {
    id: "l5",
    name: "Linha 5 - Lilás",
    type: "metro",
    color: "#9b5ba5",
    stations: [
      { name: "Capão Redondo" },
      { name: "Campo Limpo" },
      { name: "Vila das Belezas" },
      { name: "Giovanni Gronchi" },
      { name: "Santo Amaro", isTransfer: true, transferLines: ["Linha 9"] },
      { name: "Largo Treze" },
      { name: "Adolfo Pinheiro" },
      { name: "Alto da Boa Vista" },
      { name: "Borba Gato" },
      { name: "Brooklin" },
      { name: "Campo Belo" },
      { name: "Eucaliptos" },
      { name: "Moema" },
      { name: "AACD-Servidor" },
      { name: "Hospital São Paulo" },
      { name: "Santa Cruz", isTransfer: true, transferLines: ["Linha 1"] },
      { name: "Chácara Klabin", isTransfer: true, transferLines: ["Linha 2"] },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l7",
    name: "Linha 7 - Rubi",
    type: "train",
    color: "#9e1766",
    stations: [
      { name: "Luz", isTransfer: true, transferLines: ["Linha 1", "Linha 4", "Linha 11"] },
      { name: "Palmeiras-Barra Funda", isTransfer: true, transferLines: ["Linha 3", "Linha 8"] },
      { name: "Água Branca" },
      { name: "Lapa" },
      { name: "Piqueri" },
      { name: "Pirituba" },
      { name: "Vila Clarice" },
      { name: "Jaraguá" },
      { name: "Vila Aurora" },
      { name: "Perus" },
      { name: "Caieiras" },
      { name: "Franco da Rocha" },
      { name: "Baltazar Fidélis" },
      { name: "Francisco Morato" },
      { name: "Botujuru" },
      { name: "Campo Limpo Paulista" },
      { name: "Várzea Paulista" },
      { name: "Jundiaí" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l8",
    name: "Linha 8 - Diamante",
    type: "train",
    color: "#97a098",
    stations: [
      { name: "Júlio Prestes" },
      { name: "Palmeiras-Barra Funda", isTransfer: true, transferLines: ["Linha 3", "Linha 7"] },
      { name: "Lapa" },
      { name: "Domingos de Moraes" },
      { name: "Imperatriz Leopoldina" },
      { name: "Presidente Altino" },
      { name: "Osasco" },
      { name: "Comandante Sampaio" },
      { name: "Quitaúna" },
      { name: "General Miguel Costa" },
      { name: "Carapicuíba" },
      { name: "Santa Terezinha" },
      { name: "Antônio João" },
      { name: "Barueri" },
      { name: "Jardim Belval" },
      { name: "Jardim Silveira" },
      { name: "Jandira" },
      { name: "Sagrado Coração" },
      { name: "Engenheiro Cardoso" },
      { name: "Itapevi" },
      { name: "Amador Bueno" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
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
      { name: "Santo Amaro", isTransfer: true, transferLines: ["Linha 5"] },
      { name: "Socorro" },
      { name: "Jurubatuba" },
      { name: "Autódromo" },
      { name: "Primavera-Interlagos" },
      { name: "Grajaú" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l10",
    name: "Linha 10 - Turquesa",
    type: "train",
    color: "#007c8f",
    stations: [
      { name: "Brás", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Juventus-Mooca" },
      { name: "Ipiranga" },
      { name: "Tamanduateí", isTransfer: true, transferLines: ["Linha 2"] },
      { name: "São Caetano do Sul" },
      { name: "Santo André" },
      { name: "Prefeito Saladino" },
      { name: "Prefeito Celso Daniel" },
      { name: "Capuava" },
      { name: "Mauá" },
      { name: "Guapituba" },
      { name: "Ribeirão Pires" },
      { name: "Rio Grande da Serra" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l11",
    name: "Linha 11 - Coral",
    type: "train",
    color: "#f68368",
    stations: [
      { name: "Luz", isTransfer: true, transferLines: ["Linha 1", "Linha 4"] },
      { name: "Brás", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Tatuapé", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Corinthians-Itaquera", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Dom Bosco" },
      { name: "José Bonifácio" },
      { name: "Guaianases" },
      { name: "Antônio Gianetti Neto" },
      { name: "Ferraz de Vasconcelos" },
      { name: "Poá" },
      { name: "Calmon Viana" },
      { name: "Suzano" },
      { name: "Jundiapeba" },
      { name: "Brás Cubas" },
      { name: "Mogi das Cruzes" },
      { name: "Estudantes" },
    ],
    status: "critical",
    statusMessage: "Trem parado em Guaianases",
  },
  {
    id: "l12",
    name: "Linha 12 - Safira",
    type: "train",
    color: "#083f8d",
    stations: [
      { name: "Brás", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Tatuapé", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Engenheiro Goulart" },
      { name: "USP Leste" },
      { name: "Comendador Ermelino" },
      { name: "São Miguel Paulista" },
      { name: "Jardim Helena-Vila Mara" },
      { name: "Itaim Paulista" },
      { name: "Jardim Romano" },
      { name: "Engenheiro Manoel Feio" },
      { name: "Itaquaquecetuba" },
      { name: "Aracaré" },
      { name: "Calmon Viana" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
  {
    id: "l13",
    name: "Linha 13 - Jade",
    type: "train",
    color: "#00b052",
    stations: [
      { name: "Engenheiro Goulart", isTransfer: true, transferLines: ["Linha 12"] },
      { name: "Guarulhos-CECAP" },
      { name: "Aeroporto-Guarulhos" },
    ],
    status: "ok",
    statusMessage: "Operação normal - Expresso Aeroporto",
  },
  {
    id: "l15",
    name: "Linha 15 - Prata",
    type: "metro",
    color: "#9e9e9e",
    stations: [
      { name: "Vila Prudente", isTransfer: true, transferLines: ["Linha 2"] },
      { name: "Oratório" },
      { name: "São Lucas" },
      { name: "Camilo Haddad" },
      { name: "Vila Tolstói" },
      { name: "Vila União" },
      { name: "Jardim Planalto" },
      { name: "Sapopemba" },
      { name: "Fazenda da Juta" },
      { name: "São Mateus" },
    ],
    status: "warning",
    statusMessage: "Monotrilho com intervalo ampliado",
  },
  {
    id: "lexp",
    name: "Expresso Aeroporto",
    type: "train",
    color: "#00b052",
    stations: [
      { name: "Luz", isTransfer: true, transferLines: ["Linha 1", "Linha 4"] },
      { name: "Brás", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Tatuapé", isTransfer: true, transferLines: ["Linha 3"] },
      { name: "Engenheiro Goulart", isTransfer: true, transferLines: ["Linha 12"] },
      { name: "Guarulhos-CECAP" },
      { name: "Aeroporto-Guarulhos" },
    ],
    status: "ok",
    statusMessage: "Operação normal",
  },
];

// All unique station names for autocomplete
export const allStations: string[] = Array.from(
  new Set(mockLines.flatMap((l) => l.stations.map((s) => s.name)))
).sort();

export const mockRouteResults: RouteResult[] = [
  {
    id: "r1",
    duration: "42 min",
    departureTime: "08:15",
    arrivalTime: "08:57",
    steps: [
      { type: "metro", line: "Linha 4", lineColor: "#ffd500", from: "Pinheiros", to: "República", duration: "18 min", stations: 6 },
      { type: "metro", line: "Linha 3", lineColor: "#ee3a43", from: "República", to: "Sé", duration: "4 min", stations: 2 },
      { type: "metro", line: "Linha 1", lineColor: "#0455a1", from: "Sé", to: "Paraíso", duration: "8 min", stations: 4 },
    ],
    transfers: 2,
    fare: "R$ 4,40",
  },
  {
    id: "r2",
    duration: "55 min",
    departureTime: "08:15",
    arrivalTime: "09:10",
    steps: [
      { type: "train", line: "Linha 9", lineColor: "#00a78e", from: "Pinheiros", to: "Santo Amaro", duration: "22 min", stations: 8 },
      { type: "metro", line: "Linha 5", lineColor: "#9b5ba5", from: "Santo Amaro", to: "Santa Cruz", duration: "20 min", stations: 11 },
      { type: "metro", line: "Linha 1", lineColor: "#0455a1", from: "Santa Cruz", to: "Paraíso", duration: "6 min", stations: 3 },
    ],
    transfers: 2,
    fare: "R$ 4,40",
  },
  {
    id: "r3",
    duration: "38 min",
    departureTime: "08:20",
    arrivalTime: "08:58",
    steps: [
      { type: "metro", line: "Linha 4", lineColor: "#ffd500", from: "Pinheiros", to: "Paulista", duration: "12 min", stations: 4 },
      { type: "metro", line: "Linha 2", lineColor: "#007e5e", from: "Consolação", to: "Paraíso", duration: "8 min", stations: 3 },
    ],
    transfers: 1,
    fare: "R$ 4,40",
  },
];

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Alerta na Linha 11", message: "Trem parado em Guaianases. Composição com problemas técnicos.", time: "2 min", read: false, type: "alert" },
  { id: "n2", title: "Linha 3 normalizada", message: "A operação da Linha 3 - Vermelha foi normalizada após velocidade reduzida.", time: "1h", read: false, type: "alert" },
  { id: "n3", title: "Nova funcionalidade", message: "Agora você pode compartilhar alertas com seus amigos!", time: "3h", read: true, type: "info" },
  { id: "n4", title: "Recarga com desconto", message: "Recarregue seu Bilhete Único pelo app e ganhe 5% de desconto.", time: "1 dia", read: true, type: "promo" },
  { id: "n5", title: "Manutenção programada", message: "Linha 9 terá manutenção no domingo, das 4h às 6h.", time: "2 dias", read: true, type: "info" },
];

export const mockNews: NewsItem[] = [
  { id: "nw1", title: "Nova estação da Linha 2 será inaugurada em 2027", summary: "A estação Vila Formosa vai conectar o bairro à rede de metrô, beneficiando milhares de passageiros.", date: "20 Mar 2026", category: "Expansão" },
  { id: "nw2", title: "Bilhete Único terá integração com app de pagamento", summary: "Parceria permite recarregar o cartão diretamente pelo celular sem ir às estações.", date: "18 Mar 2026", category: "Tecnologia" },
  { id: "nw3", title: "Linha 15 recebe novas composições", summary: "Monotrilho ganha 4 novos trens para reduzir intervalo entre viagens no horário de pico.", date: "15 Mar 2026", category: "Frota" },
  { id: "nw4", title: "Tarifa de ônibus pode ter reajuste em abril", summary: "Prefeitura estuda aumento de R$ 0,20 na tarifa para cobrir custos operacionais.", date: "12 Mar 2026", category: "Tarifas" },
  { id: "nw5", title: "Obras na estação Pinheiros são concluídas", summary: "Reformas de acessibilidade incluem novos elevadores e piso tátil ampliado.", date: "10 Mar 2026", category: "Infraestrutura" },
];

export const mockTickets: TicketCard[] = [
  { id: "t1", type: "bilhete_unico", name: "Bilhete Único", number: "**** **** **** 4523", balance: 47.80, lastUsed: "Hoje, 07:32" },
  { id: "t2", type: "bom", name: "Cartão BOM", number: "**** **** **** 8891", balance: 22.50, lastUsed: "Ontem, 18:15" },
];

export const ticketHistory = [
  { id: "th1", date: "20 Mar", description: "Metrô - Linha 4 Pinheiros", value: -4.40 },
  { id: "th2", date: "20 Mar", description: "Ônibus - 8700 Term. Pinheiros", value: -4.40 },
  { id: "th3", date: "19 Mar", description: "Recarga - PIX", value: 50.00 },
  { id: "th4", date: "19 Mar", description: "Metrô - Linha 1 Paraíso", value: -4.40 },
  { id: "th5", date: "19 Mar", description: "Trem - Linha 9 Vila Olímpia", value: -4.40 },
  { id: "th6", date: "18 Mar", description: "Metrô - Linha 3 Sé", value: -4.40 },
  { id: "th7", date: "18 Mar", description: "Ônibus - 5010 Av. Paulista", value: -4.40 },
  { id: "th8", date: "17 Mar", description: "Recarga - Cartão de crédito", value: 100.00 },
];
