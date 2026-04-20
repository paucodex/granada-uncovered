import type { EventItem } from "@/components/EventCard";

export const thisWeekEvents: EventItem[] = [
  {
    id: "1",
    title: "Jam session en El Realejo",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    category: "Música",
    location: "El Realejo",
    time: "Vie · 22:00",
    going: 24,
    accent: "yellow",
    tag: "secreto",
  },
  {
    id: "2",
    title: "Mercadillo vintage en San Jerónimo",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    category: "Mercadillos",
    location: "Plaza San Jerónimo",
    time: "Sáb · 11:00",
    going: 89,
  },
  {
    id: "3",
    title: "Cine al aire libre en el Albaicín",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    category: "Cultura",
    location: "Mirador San Nicolás",
    time: "Dom · 21:30",
    going: 142,
    tag: "gratis",
  },
];

export const discoveryEvents: EventItem[] = [
  {
    id: "4",
    title: "Cata de vinos del Albaicín",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    category: "Cultura",
    location: "Casa secreta",
    time: "Jue · 20:00",
    going: 12,
    tag: "íntimo",
  },
  {
    id: "5",
    title: "Ruta de tapas escondidas",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    category: "Gratis",
    location: "Centro",
    time: "Mié · 21:00",
    going: 38,
  },
  {
    id: "6",
    title: "Concierto sorpresa en cueva",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80",
    category: "Música",
    location: "Sacromonte",
    time: "Sáb · 23:00",
    going: 56,
    accent: "yellow",
    tag: "solo hoy",
  },
];
