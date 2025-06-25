"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Ship, Clock, Star, Anchor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import ConsultaOptions from "@/components/consulta-options"
import { getCruceroById } from "@/lib/data"

interface CruceroPageProps {
  params: {
    id: string
  }
}

export default function CruceroPage({ params }: CruceroPageProps) {
  const [showConsulta, setShowConsulta] = useState(false)
  const crucero = getCruceroById(Number.parseInt(params.id))

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!crucero) {
    notFound()
  }

  if (showConsulta) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header showBackButton />
        <div className="pt-24 pb-16 container mx-auto px-4">
          <ConsultaOptions item={crucero} tipo="crucero" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header showBackButton />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header del crucero */}
            <div className="relative mb-8">
              <img
                src={crucero.imagen || "/placeholder.svg"}
                alt={crucero.titulo}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-teal-500 text-white mb-2 flex items-center space-x-1 w-fit">
                  <Anchor className="h-3 w-3" />
                  <span className="text-xs">CRUCERO</span>
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{crucero.titulo}</h1>
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <Ship className="h-4 w-4" />
                    <span>{crucero.barco}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{crucero.duracion}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenido principal */}
              <div className="lg:col-span-2 space-y-8">
                {/* Puertos */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Puertos de Escala</h2>
                  <div className="flex flex-wrap gap-2">
                    {crucero.puertos.map((puerto, index) => (
                      <Badge key={index} variant="outline" className="border-teal-500 text-teal-500">
                        {puerto}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Itinerario */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Itinerario</h2>
                  <div className="space-y-3">
                    {crucero.detalles.itinerario.map((dia, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-300">{dia}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Incluye / No incluye */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">✅ Incluye</h3>
                    <ul className="space-y-2">
                      {crucero.detalles.incluye.map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">❌ No incluye</h3>
                    <ul className="space-y-2">
                      {crucero.detalles.noIncluye.map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Camarotes */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">🛏️ Tipos de Camarote</h3>
                  <div className="flex flex-wrap gap-2">
                    {crucero.detalles.camarotes.map((camarote, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {camarote}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenidades */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">🎯 Amenidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {crucero.amenidades.map((amenidad, index) => (
                      <Badge key={index} variant="outline" className="border-teal-500 text-teal-500">
                        {amenidad}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar con precio y reserva */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800 border-gray-700 sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <span className="text-gray-400 line-through text-lg">USD ${crucero.precioOriginal}</span>
                      <div className="text-3xl font-bold text-teal-500">USD ${crucero.precioActual}</div>
                      <p className="text-gray-400 text-sm mt-1">Por persona</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Barco:</span>
                        <span className="text-white">{crucero.barco}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Duración:</span>
                        <span className="text-white">{crucero.duracion}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white">{crucero.rating}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowConsulta(true)}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      Consultar Reserva
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
