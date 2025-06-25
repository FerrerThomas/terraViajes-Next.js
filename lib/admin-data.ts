"use client"

import type { Paquete, Crucero } from "./data"

// Función para obtener datos del localStorage o usar datos por defecto
export function getStoredPaquetes(): Paquete[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("terra-viajes-paquetes")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

export function getStoredCruceros(): Crucero[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("terra-viajes-cruceros")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
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

// Hook para verificar si hay datos personalizados
export function hasCustomData(): boolean {
  if (typeof window === "undefined") return false

  return !!(localStorage.getItem("terra-viajes-paquetes") || localStorage.getItem("terra-viajes-cruceros"))
}
