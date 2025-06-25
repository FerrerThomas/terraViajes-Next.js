"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { MapPin, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import ConsultaOptions from "@/components/consulta-options"
import { getPaqueteById } from "@/lib/data"

interface PaquetePageProps {
  params: {
    id: string
  }
}

export default function PaquetePage({ params }: PaquetePageProps) {
  const [showConsulta, setShowConsulta] = useState(false)
  const paquete = getPaqueteById(Number.parseInt(params.id))

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!paquete) {
    notFound()
  }

  if (showConsulta) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header showBackButton />
        <div className="pt-24 pb-16 container mx-auto px-4">
          <ConsultaOptions item={paquete} tipo="paquete" />
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
            {/* Header del paquete */}
            <div className="relative mb-8">
              <img
                src={paquete.imagen || "/placeholder.svg"}
                alt={paquete.titulo}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-red-500 text-white mb-2">{paquete.descuento}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{paquete.titulo}</h1>
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{paquete.ubicacion}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{paquete.duracion}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{paquete.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenido principal */}
              <div className="lg:col-span-2 space-y-8">
                {/* Descripción */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Descripción</h2>
                  <p className="text-gray-300">{paquete.descripcion}</p>
                </div>

                {/* Itinerario */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Itinerario</h2>
                  <div className="space-y-3">
                    {paquete.detalles.itinerario.map((dia, index) => (
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
                      {paquete.detalles.incluye.map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">❌ No incluye</h3>
                    <ul className="space-y-2">
                      {paquete.detalles.noIncluye.map((item, index) => (
                        <li key={index} className="text-gray-300 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hoteles */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">🏨 Hoteles</h3>
                  <ul className="space-y-2">
                    {paquete.detalles.hoteles.map((hotel, index) => (
                      <li key={index} className="text-gray-300">
                        • {hotel}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar con precio y reserva */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800 border-gray-700 sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <span className="text-gray-400 line-through text-lg">
                        ARS ${paquete.precioOriginal.toLocaleString()}
                      </span>
                      <div className="text-3xl font-bold text-teal-500">
                        ARS ${paquete.precioActual.toLocaleString()}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Por persona</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Duración:</span>
                        <span className="text-white">{paquete.duracion}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Reviews:</span>
                        <span className="text-white">{paquete.reviews} opiniones</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white">{paquete.rating}</span>
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
