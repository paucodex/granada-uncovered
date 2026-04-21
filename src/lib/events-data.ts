// Modelo de datos de eventos (mock para Fase 1).
// En Fase 2 se moverá a tabla `events` en Lovable Cloud.

export type Vibe =
  | "Cultura"
  | "Mercadillos"
  | "Música"
  | "Gratis"
  | "Deporte"
  | "Comida"
  | "Friki"
  | "Artesanía"
  | "Humor"
  | "Otros";

export type SourceType = "Instagram" | "TikTok" | "Cartel" | "Boca a boca" | "Web";
export type PriceType = "Gratis" | "De pago" | "Donativo";

export interface AppEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string; // ISO o legible
  time: string;
  location: string;
  district: string;
  mainCategory: Vibe;
  tags: Vibe[];
  priceType: PriceType;
  price?: string;
  sourceType: SourceType;
  sourceUrl?: string;
  attendeesCount: number;
  featured?: boolean;
  createdBy?: string;
  status?: "pending" | "approved";
}

// Slug helpers para vibes
export const VIBES: { name: Vibe | "Todos"; emoji: string; color: string; slug: string }[] = [
  { name: "Todos", emoji: "✺", color: "var(--brand-blue)", slug: "todos" },
  { name: "Cultura", emoji: "🎭", color: "var(--brand-purple)", slug: "cultura" },
  { name: "Mercadillos", emoji: "🛍️", color: "var(--brand-yellow)", slug: "mercadillos" },
  { name: "Música", emoji: "🎵", color: "var(--brand-coral)", slug: "musica" },
  { name: "Gratis", emoji: "✨", color: "var(--brand-neon)", slug: "gratis" },
  { name: "Deporte", emoji: "🏃", color: "var(--brand-blue)", slug: "deporte" },
  { name: "Comida", emoji: "🍷", color: "var(--brand-coral)", slug: "comida" },
  { name: "Friki", emoji: "🎮", color: "var(--brand-purple)", slug: "friki" },
  { name: "Artesanía", emoji: "🧶", color: "var(--brand-yellow)", slug: "artesania" },
  { name: "Humor", emoji: "🎤", color: "var(--brand-neon)", slug: "humor" },
  { name: "Otros", emoji: "✦", color: "var(--brand-blue)", slug: "otros" },
];

export function vibeBySlug(slug: string) {
  return VIBES.find((v) => v.slug === slug);
}
export function vibeMeta(name: Vibe | "Todos") {
  return VIBES.find((v) => v.name === name)!;
}

export const events: AppEvent[] = [
  {
    id: "1",
    slug: "paseo-parque-federico-garcia-lorca",
    title: "Paseo por el Parque Federico García Lorca",
    description:
      "Un paseo tranquilo por uno de los parques más bonitos de Granada. Quedamos a la entrada y caminamos sin prisa, comentando lo que vemos.",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1200&q=80",
    date: "Sáb 26 abr",
    time: "10:30",
    location: "Parque Federico García Lorca",
    district: "Centro",
    mainCategory: "Gratis",
    tags: ["Gratis", "Cultura"],
    priceType: "Gratis",
    sourceType: "Boca a boca",
    attendeesCount: 14,
  },
  {
    id: "2",
    slug: "senderismo-los-cahorros",
    title: "Senderismo en Los Cahorros",
    description:
      "Ruta clásica por Los Cahorros de Monachil. Puentes colgantes, río y desayuno en grupo al volver.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
    date: "Dom 27 abr",
    time: "09:00",
    location: "Monachil",
    district: "Sierra",
    mainCategory: "Deporte",
    tags: ["Deporte", "Gratis"],
    priceType: "Gratis",
    sourceType: "Instagram",
    attendeesCount: 38,
    featured: true,
  },
  {
    id: "3",
    slug: "yoga-parque-tico-medina",
    title: "Yoga en Parque Tico Medina",
    description:
      "Clase de yoga al aire libre, todos los niveles. Trae tu esterilla y agua.",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80",
    date: "Mar 22 abr",
    time: "19:00",
    location: "Parque Tico Medina",
    district: "Zaidín",
    mainCategory: "Deporte",
    tags: ["Deporte", "Gratis"],
    priceType: "Donativo",
    price: "Donativo",
    sourceType: "Cartel",
    attendeesCount: 21,
  },
  {
    id: "4",
    slug: "ruta-tapas-escondidas",
    title: "Ruta de tapas escondidas",
    description:
      "Cuatro bares que casi nadie conoce, con la mejor relación tapa/precio del centro. Plazas limitadas.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    date: "Mié 23 abr",
    time: "21:00",
    location: "Centro",
    district: "Centro",
    mainCategory: "Comida",
    tags: ["Comida", "Cultura"],
    priceType: "De pago",
    price: "15 € (incluye 4 tapas)",
    sourceType: "Boca a boca",
    attendeesCount: 26,
  },
  {
    id: "5",
    slug: "cata-quesos-carrera-virgen",
    title: "Cata de quesos en Carrera de la Virgen",
    description:
      "Cata guiada de 6 quesos andaluces con maridaje de vinos de la Alpujarra.",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1200&q=80",
    date: "Jue 24 abr",
    time: "20:00",
    location: "Carrera de la Virgen",
    district: "Centro",
    mainCategory: "Comida",
    tags: ["Comida", "Cultura"],
    priceType: "De pago",
    price: "22 €",
    sourceType: "Instagram",
    attendeesCount: 18,
  },
  {
    id: "6",
    slug: "feria-del-vino",
    title: "Feria del vino",
    description:
      "Más de 30 bodegas pequeñas de Granada y alrededores. Copa incluida con la entrada.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80",
    date: "Sáb 26 abr",
    time: "12:00",
    location: "Palacio de Congresos",
    district: "Centro",
    mainCategory: "Comida",
    tags: ["Comida", "Cultura"],
    priceType: "De pago",
    price: "10 €",
    sourceType: "Web",
    sourceUrl: "https://example.com",
    attendeesCount: 142,
  },
  {
    id: "7",
    slug: "maraton-warhammer-alcazaba-juegos",
    title: "Maratón de Warhammer en Alcazaba Juegos",
    description:
      "Torneo abierto de Warhammer 40k. Apúntate solo o en pareja, hay premios para los tres primeros.",
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1200&q=80",
    date: "Sáb 26 abr",
    time: "10:00",
    location: "Alcazaba Juegos",
    district: "Centro",
    mainCategory: "Friki",
    tags: ["Friki"],
    priceType: "De pago",
    price: "8 €",
    sourceType: "Instagram",
    attendeesCount: 32,
  },
  {
    id: "8",
    slug: "ficzone-armilla",
    title: "FicZone en Armilla",
    description:
      "El gran salón del cómic, manga, videojuegos y cultura pop de Granada. Invitados, concursos cosplay y mucho más.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80",
    date: "Sáb 3 may",
    time: "10:00",
    location: "Palacio de Ferias",
    district: "Armilla",
    mainCategory: "Friki",
    tags: ["Friki", "Cultura"],
    priceType: "De pago",
    price: "12 €",
    sourceType: "Web",
    sourceUrl: "https://example.com",
    attendeesCount: 480,
    featured: true,
  },
  {
    id: "9",
    slug: "taller-ceramica-brunch",
    title: "Taller de cerámica + brunch",
    description:
      "Aprende a tornear tu primera pieza mientras desayunas tortitas. Plazas muy limitadas.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80",
    date: "Dom 27 abr",
    time: "11:00",
    location: "Estudio Barro",
    district: "Realejo",
    mainCategory: "Artesanía",
    tags: ["Artesanía", "Comida", "Cultura"],
    priceType: "De pago",
    price: "28 €",
    sourceType: "Instagram",
    attendeesCount: 9,
  },
  {
    id: "10",
    slug: "taller-anillos-minimalistas-marimorena",
    title: "Taller de anillos minimalistas en La Marimorena",
    description:
      "Diseña y forja tu propio anillo de plata. Te llevas la pieza puesta a casa.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80",
    date: "Vie 25 abr",
    time: "18:30",
    location: "La Marimorena",
    district: "Realejo",
    mainCategory: "Artesanía",
    tags: ["Artesanía", "Cultura"],
    priceType: "De pago",
    price: "45 €",
    sourceType: "TikTok",
    attendeesCount: 7,
  },
  {
    id: "11",
    slug: "mercado-artesania-san-nicolas",
    title: "Mercado de artesanía en San Nicolás",
    description:
      "Más de 20 puestos de artesanía local con vistas a la Alhambra. Música en directo al atardecer.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&q=80",
    date: "Sáb 26 abr",
    time: "11:00",
    location: "Mirador San Nicolás",
    district: "Albaicín",
    mainCategory: "Mercadillos",
    tags: ["Mercadillos", "Artesanía", "Gratis"],
    priceType: "Gratis",
    sourceType: "Cartel",
    attendeesCount: 89,
    featured: true,
  },
  {
    id: "12",
    slug: "monologo-bar-centro",
    title: "Monólogo en bar del centro",
    description:
      "Noche de monólogos con cómicos locales. Consumición mínima.",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1200&q=80",
    date: "Jue 24 abr",
    time: "22:00",
    location: "Bar La Tertulia",
    district: "Centro",
    mainCategory: "Humor",
    tags: ["Humor", "Cultura"],
    priceType: "De pago",
    price: "5 € + consumición",
    sourceType: "Instagram",
    attendeesCount: 41,
  },
  {
    id: "13",
    slug: "micro-abierto-realejo",
    title: "Micro abierto en Realejo",
    description:
      "Si tienes algo que contar, cantar o recitar, este es tu sitio. Apúntate al llegar.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    date: "Mié 23 abr",
    time: "21:30",
    location: "Café Sociedad",
    district: "Realejo",
    mainCategory: "Música",
    tags: ["Música", "Humor", "Gratis"],
    priceType: "Gratis",
    sourceType: "Boca a boca",
    attendeesCount: 33,
  },
  {
    id: "14",
    slug: "exposicion-centro-cultural",
    title: "Exposición en centro cultural",
    description:
      "Muestra colectiva de fotografía documental sobre los barrios de Granada. Entrada libre.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80",
    date: "Hasta 15 may",
    time: "10:00 – 20:00",
    location: "Centro Cultural Gran Capitán",
    district: "Centro",
    mainCategory: "Cultura",
    tags: ["Cultura", "Gratis"],
    priceType: "Gratis",
    sourceType: "Cartel",
    attendeesCount: 64,
  },
  {
    id: "15",
    slug: "inauguracion-tienda-vintage",
    title: "Inauguración de tienda vintage con regalo a los primeros 50",
    description:
      "Apertura de nueva tienda vintage en el Realejo. Los primeros 50 se llevan una camiseta gratis.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80",
    date: "Vie 25 abr",
    time: "19:00",
    location: "Calle Molinos",
    district: "Realejo",
    mainCategory: "Mercadillos",
    tags: ["Mercadillos", "Gratis", "Cultura"],
    priceType: "Gratis",
    sourceType: "Instagram",
    attendeesCount: 112,
  },
];

export function eventsByVibe(vibe: Vibe | "Todos"): AppEvent[] {
  if (vibe === "Todos") return events;
  return events.filter((e) => e.tags.includes(vibe) || e.mainCategory === vibe);
}

export function searchEvents(q: string): AppEvent[] {
  const t = q.trim().toLowerCase();
  if (!t) return events;
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(t) ||
      e.description.toLowerCase().includes(t) ||
      e.location.toLowerCase().includes(t) ||
      e.district.toLowerCase().includes(t) ||
      e.tags.some((tag) => tag.toLowerCase().includes(t)),
  );
}

export function getEvent(id: string): AppEvent | undefined {
  const fromMock = events.find((e) => e.id === id || e.slug === id);
  if (fromMock) return fromMock;
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem("enterate.user_events.v1");
      if (raw) {
        const list = JSON.parse(raw) as AppEvent[];
        return list.find((e) => e.id === id || e.slug === id);
      }
    } catch {
      /* ignore */
    }
  }
  return undefined;
}

// Subconjuntos para la home (preservar la estructura visual actual)
export const thisWeekEvents = events.slice(0, 6);
export const discoveryEvents = events.slice(6, 12);
