export type Paquete = {
  id: number
  imagen: string
  descuento: string
  rating: number
  titulo: string
  ubicacion: string
  duracion: string
  descripcion: string
  reviews: number
  precioOriginal: number
  precioActual: number
  detalles: {
    incluye: string[]
    noIncluye: string[]
    itinerario: string[]
    hoteles: string[]
  }
}

export type Crucero = {
  id: number
  imagen: string
  barco: string
  titulo: string
  puertos: string[]
  duracion: string
  amenidades: string[]
  precioOriginal: number
  precioActual: number
  rating: number
  detalles: {
    incluye: string[]
    noIncluye: string[]
    itinerario: string[]
    camarotes: string[]
  }
}

export const defaultPaquetes: Paquete[] = [
  {
    id: 1,
    imagen: "/placeholder.svg?height=192&width=400",
    descuento: "25% OFF",
    rating: 4.8,
    titulo: "Buenos Aires + Mendoza",
    ubicacion: "Argentina",
    duracion: "7 días / 6 noches",
    descripcion: "Descubre la capital argentina y la región vitivinícola más importante del país.",
    reviews: 124,
    precioOriginal: 89000,
    precioActual: 66750,
    detalles: {
      incluye: [
        "Vuelos ida y vuelta",
        "Alojamiento en hoteles 4 estrellas",
        "Desayuno incluido",
        "Traslados aeropuerto-hotel",
        "Tour por Buenos Aires",
        "Excursión a bodegas en Mendoza",
        "Guía turístico",
      ],
      noIncluye: [
        "Comidas no especificadas",
        "Bebidas alcohólicas",
        "Propinas",
        "Gastos personales",
        "Seguro de viaje",
      ],
      itinerario: [
        "Día 1: Llegada a Buenos Aires - City tour",
        "Día 2: Buenos Aires - Barrio de San Telmo y La Boca",
        "Día 3: Vuelo a Mendoza - Tour por bodegas",
        "Día 4: Mendoza - Excursión a la montaña",
        "Día 5: Mendoza - Día libre",
        "Día 6: Vuelo a Buenos Aires",
        "Día 7: Regreso",
      ],
      hoteles: ["Hotel Boutique Buenos Aires", "Hotel Mendoza Plaza"],
    },
  },
  {
    id: 2,
    imagen: "/placeholder.svg?height=192&width=400",
    descuento: "30% OFF",
    rating: 4.9,
    titulo: "Bariloche Completo",
    ubicacion: "Argentina",
    duracion: "5 días / 4 noches",
    descripcion: "Vive la magia de la Patagonia argentina con lagos, montañas y chocolate.",
    reviews: 89,
    precioOriginal: 75000,
    precioActual: 52500,
    detalles: {
      incluye: [
        "Vuelos ida y vuelta",
        "Alojamiento en hotel 4 estrellas",
        "Media pensión",
        "Traslados",
        "Excursión Circuito Chico",
        "Tour del chocolate",
        "Cerro Catedral",
      ],
      noIncluye: ["Cenas", "Actividades opcionales", "Propinas", "Seguro de viaje"],
      itinerario: [
        "Día 1: Llegada a Bariloche",
        "Día 2: Circuito Chico",
        "Día 3: Cerro Catedral",
        "Día 4: Tour del chocolate",
        "Día 5: Regreso",
      ],
      hoteles: ["Hotel Bariloche Center"],
    },
  },
  {
    id: 3,
    imagen: "/placeholder.svg?height=192&width=400",
    descuento: "20% OFF",
    rating: 4.7,
    titulo: "Salta + Jujuy",
    ubicacion: "Argentina",
    duracion: "6 días / 5 noches",
    descripcion: "Explora el norte argentino con sus paisajes únicos y cultura ancestral.",
    reviews: 156,
    precioOriginal: 68000,
    precioActual: 54400,
    detalles: {
      incluye: [
        "Vuelos ida y vuelta",
        "Alojamiento en hoteles boutique",
        "Desayuno incluido",
        "Excursión a Purmamarca",
        "Tour Quebrada de Humahuaca",
        "Visita a Tilcara",
        "Guía especializado",
      ],
      noIncluye: ["Almuerzo y cenas", "Bebidas", "Propinas", "Gastos personales"],
      itinerario: [
        "Día 1: Llegada a Salta",
        "Día 2: City tour Salta",
        "Día 3: Excursión a Purmamarca",
        "Día 4: Quebrada de Humahuaca",
        "Día 5: Tilcara y regreso a Salta",
        "Día 6: Regreso",
      ],
      hoteles: ["Hotel Salta Colonial", "Posada Purmamarca"],
    },
  },
]

export const defaultCruceros: Crucero[] = [
  {
    id: 1,
    imagen: "/placeholder.svg?height=192&width=400",
    barco: "Costa Fascinosa",
    titulo: "Mediterráneo Occidental",
    puertos: ["Barcelona", "Marsella", "Roma", "Nápoles", "+3 más"],
    duracion: "7 noches",
    amenidades: ["Todo incluido", "Spa", "Casino", "Shows"],
    precioOriginal: 1200,
    precioActual: 899,
    rating: 4.6,
    detalles: {
      incluye: [
        "Camarote interior",
        "Pensión completa",
        "Entretenimiento a bordo",
        "Acceso a piscinas",
        "Gimnasio",
        "Shows nocturnos",
      ],
      noIncluye: ["Bebidas alcohólicas", "Excursiones en puertos", "Spa y tratamientos", "Propinas", "Wifi premium"],
      itinerario: [
        "Día 1: Embarque en Barcelona",
        "Día 2: Marsella, Francia",
        "Día 3: Roma (Civitavecchia), Italia",
        "Día 4: Nápoles, Italia",
        "Día 5: Palma de Mallorca, España",
        "Día 6: Valencia, España",
        "Día 7: Navegación",
        "Día 8: Desembarque en Barcelona",
      ],
      camarotes: ["Interior", "Exterior", "Balcón", "Suite"],
    },
  },
  {
    id: 2,
    imagen: "/placeholder.svg?height=192&width=400",
    barco: "Costa Diadema",
    titulo: "Fiordos Noruegos",
    puertos: ["Copenhague", "Bergen", "Geiranger", "Stavanger"],
    duracion: "8 noches",
    amenidades: ["Balcón incluido", "Excursiones", "Wifi", "Gimnasio"],
    precioOriginal: 1800,
    precioActual: 1350,
    rating: 4.8,
    detalles: {
      incluye: [
        "Camarote con balcón",
        "Pensión completa",
        "Excursiones incluidas",
        "Wifi básico",
        "Entretenimiento",
        "Acceso a todas las instalaciones",
      ],
      noIncluye: ["Bebidas premium", "Excursiones opcionales", "Spa", "Propinas"],
      itinerario: [
        "Día 1: Embarque en Copenhague",
        "Día 2: Navegación",
        "Día 3: Bergen, Noruega",
        "Día 4: Geiranger, Noruega",
        "Día 5: Stavanger, Noruega",
        "Día 6: Oslo, Noruega",
        "Día 7: Navegación",
        "Día 8: Copenhague",
        "Día 9: Desembarque",
      ],
      camarotes: ["Balcón estándar", "Balcón premium", "Suite"],
    },
  },
  {
    id: 3,
    imagen: "/placeholder.svg?height=192&width=400",
    barco: "Costa Luminosa",
    titulo: "Caribe Oriental",
    puertos: ["Miami", "Cozumel", "Jamaica", "Gran Caimán"],
    duracion: "7 noches",
    amenidades: ["Bebidas incluidas", "Piscinas", "Entretenimiento", "Kids Club"],
    precioOriginal: 1100,
    precioActual: 825,
    rating: 4.7,
    detalles: {
      incluye: [
        "Camarote interior",
        "Pensión completa",
        "Bebidas sin alcohol",
        "Kids Club",
        "Entretenimiento familiar",
        "Piscinas y toboganes",
      ],
      noIncluye: ["Bebidas alcohólicas premium", "Excursiones", "Spa", "Wifi", "Propinas"],
      itinerario: [
        "Día 1: Embarque en Miami",
        "Día 2: Navegación",
        "Día 3: Cozumel, México",
        "Día 4: Jamaica",
        "Día 5: Gran Caimán",
        "Día 6: Navegación",
        "Día 7: Navegación",
        "Día 8: Desembarque en Miami",
      ],
      camarotes: ["Interior", "Exterior", "Balcón"],
    },
  },
  {
    id: 4,
    imagen: "/placeholder.svg?height=192&width=400",
    barco: "Costa Pacifica",
    titulo: "Mediterráneo Oriental",
    puertos: ["Venecia", "Dubrovnik", "Santorini", "Mykonos"],
    duracion: "8 noches",
    amenidades: ["Suite upgrade", "Cenas especiales", "Spa premium", "Excursiones VIP"],
    precioOriginal: 2200,
    precioActual: 1650,
    rating: 4.9,
    detalles: {
      incluye: [
        "Suite con balcón",
        "Pensión completa premium",
        "Bebidas incluidas",
        "Excursiones VIP",
        "Spa premium",
        "Cenas especiales",
      ],
      noIncluye: ["Propinas", "Gastos personales", "Excursiones opcionales"],
      itinerario: [
        "Día 1: Embarque en Venecia",
        "Día 2: Navegación",
        "Día 3: Dubrovnik, Croacia",
        "Día 4: Navegación",
        "Día 5: Santorini, Grecia",
        "Día 6: Mykonos, Grecia",
        "Día 7: Navegación",
        "Día 8: Venecia",
        "Día 9: Desembarque",
      ],
      camarotes: ["Suite junior", "Suite premium", "Suite presidencial"],
    },
  },
]

// Función para obtener datos (primero intenta localStorage, luego defaults)
export function getPaquetes(): Paquete[] {
  if (typeof window === "undefined") return defaultPaquetes

  const stored = localStorage.getItem("terra-viajes-paquetes")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultPaquetes
    }
  }
  return defaultPaquetes
}

export function getCruceros(): Crucero[] {
  if (typeof window === "undefined") return defaultCruceros

  const stored = localStorage.getItem("terra-viajes-cruceros")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultCruceros
    }
  }
  return defaultCruceros
}

// Mantener las funciones originales pero usando los nuevos datos
export const paquetes = defaultPaquetes
export const cruceros = defaultCruceros

export function getPaqueteById(id: number): Paquete | undefined {
  const allPaquetes = getPaquetes()
  return allPaquetes.find((paquete) => paquete.id === id)
}

export function getCruceroById(id: number): Crucero | undefined {
  const allCruceros = getCruceros()
  return allCruceros.find((crucero) => crucero.id === id)
}

// Función para guardar paquetes
export function savePaquetes(paquetes: Paquete[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("terra-viajes-paquetes", JSON.stringify(paquetes))
  }
}

// Función para guardar cruceros
export function saveCruceros(cruceros: Crucero[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("terra-viajes-cruceros", JSON.stringify(cruceros))
  }
}

// Función para resetear a datos por defecto
export function resetToDefaults() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("terra-viajes-paquetes")
    localStorage.removeItem("terra-viajes-cruceros")
  }
}
