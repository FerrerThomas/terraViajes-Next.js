"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Clock, Users, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { paquetes } from "@/lib/data"

export default function PaquetesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPaquetes, setFilteredPaquetes] = useState(paquetes)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term === "") {
      setFilteredPaquetes(paquetes)
    } else {
      const filtered = paquetes.filter(
        (paquete) =>
          paquete.titulo.toLowerCase().includes(term.toLowerCase()) ||
          paquete.ubicacion.toLowerCase().includes(term.toLowerCase()) ||
          paquete.descripcion.toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredPaquetes(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <section className="relative min-h-[400px] pt-32 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=400&width=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Todos Nuestros Paquetes</h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Explora todos nuestros destinos disponibles y encuentra tu próxima aventura perfecta.
          </p>

          {/* Search Form */}
          <div className="bg-gray-900/80 backdrop-blur rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                <Input
                  placeholder="Buscar destino..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Paquetes Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              {searchTerm ? `Resultados para "${searchTerm}"` : "Todos los Paquetes"}
            </h2>
            <p className="text-gray-400">
              {filteredPaquetes.length} paquete{filteredPaquetes.length !== 1 ? "s" : ""} disponible
              {filteredPaquetes.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredPaquetes.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-white mb-2">No se encontraron paquetes</h3>
              <p className="text-gray-400 mb-6">Intenta con otros términos de búsqueda</p>
              <Button onClick={() => handleSearch("")} className="bg-teal-500 hover:bg-teal-600 text-white">
                Ver Todos los Paquetes
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPaquetes.map((paquete) => (
                <Card
                  key={paquete.id}
                  className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                  <div className="relative">
                    <img
                      src={paquete.imagen || "/placeholder.svg"}
                      alt={paquete.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">{paquete.descuento}</Badge>
                    <div className="absolute top-2 right-2 bg-black/60 rounded px-2 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{paquete.rating}</span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{paquete.titulo}</h3>

                    <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{paquete.ubicacion}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{paquete.duracion}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{paquete.descripcion}</p>

                    <div className="flex items-center space-x-1 text-gray-400 text-sm mb-4">
                      <Users className="h-4 w-4" />
                      <span>{paquete.reviews} reviews</span>
                    </div>

                    <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-gray-400 line-through text-sm">
                          ARS ${paquete.precioOriginal.toLocaleString()}
                        </span>
                        <div className="text-lg font-bold text-teal-500">
                          ARS ${paquete.precioActual.toLocaleString()}
                        </div>
                      </div>
                      <Link href={`/paquete/${paquete.id}`}>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white text-sm">Ver Detalles</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿No encontraste lo que buscabas?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Contáctanos y te ayudamos a armar el viaje perfecto según tus necesidades y presupuesto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <span className="mr-2">📱</span>
              Consultar por WhatsApp
            </Button>
            <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white">
              <span className="mr-2">✉️</span>
              Enviar Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
