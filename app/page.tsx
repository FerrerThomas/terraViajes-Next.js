"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  MapPin,
  Clock,
  Users,
  Search,
  Calendar,
  Ship,
  Star,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  PhoneCall,
  Anchor,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { paquetes, cruceros } from "@/lib/data"

export default function TerraViajes() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPaqueteIndex, setCurrentPaqueteIndex] = useState(0)
  const [currentCruceroIndex, setCurrentCruceroIndex] = useState(0)
  const paquetesRef = useRef<HTMLDivElement>(null)
  const crucerosRef = useRef<HTMLDivElement>(null)

  const scrollToPaquete = (index: number) => {
    setCurrentPaqueteIndex(index)
    if (paquetesRef.current) {
      const cardWidth = paquetesRef.current.scrollWidth / paquetes.length
      paquetesRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      })
    }
  }

  const scrollToCrucero = (index: number) => {
    setCurrentCruceroIndex(index)
    if (crucerosRef.current) {
      const cardWidth = crucerosRef.current.scrollWidth / cruceros.length
      crucerosRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      })
    }
  }

  const nextPaquete = () => {
    const nextIndex = (currentPaqueteIndex + 1) % paquetes.length
    scrollToPaquete(nextIndex)
  }

  const prevPaquete = () => {
    const prevIndex = currentPaqueteIndex === 0 ? paquetes.length - 1 : currentPaqueteIndex - 1
    scrollToPaquete(prevIndex)
  }

  const nextCrucero = () => {
    const nextIndex = (currentCruceroIndex + 1) % cruceros.length
    scrollToCrucero(nextIndex)
  }

  const prevCrucero = () => {
    const prevIndex = currentCruceroIndex === 0 ? cruceros.length - 1 : currentCruceroIndex - 1
    scrollToCrucero(prevIndex)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[600px] pt-32 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=600&width=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Descubre el mundo con nosotros</h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Vive experiencias únicas con nuestros paquetes turísticos y cruceros. Tu próxima aventura te está esperando.
          </p>

          {/* Search Form */}
          <div className="bg-gray-900/80 backdrop-blur rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                <Input
                  placeholder="¿A dónde querés ir?"
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-teal-500" />
                <Input
                  type="date"
                  className="pl-10 bg-gray-800 border-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Paquetes Section */}
      <section id="paquetes" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Viajá en vacaciones de invierno</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Descubre los mejores destinos con nuestros paquetes especiales. Ofertas exclusivas para que vivas momentos
              inolvidables.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paquetes.map((paquete) => (
              <Card
                key={paquete.id}
                className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <div className="relative">
                  <img
                    src={paquete.imagen || "/fondo.png"}
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
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{paquete.titulo}</h3>

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
                      <div className="text-xl font-bold text-teal-500">
                        ARS ${paquete.precioActual.toLocaleString()}
                      </div>
                    </div>
                    <Link href={`/paquete/${paquete.id}`}>
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white">Ver Detalles</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div
              ref={paquetesRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {paquetes.map((paquete) => (
                <Card
                  key={paquete.id}
                  className="bg-gray-800 border-gray-700 overflow-hidden flex-shrink-0 w-80 snap-start"
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
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{paquete.titulo}</h3>

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
                        <div className="text-xl font-bold text-teal-500">
                          ARS ${paquete.precioActual.toLocaleString()}
                        </div>
                      </div>
                      <Link href={`/paquete/${paquete.id}`}>
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">Ver Detalles</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPaquete}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextPaquete}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {paquetes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPaquete(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentPaqueteIndex ? "bg-teal-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ver más paquetes button */}
        <div className="text-center mt-8">
          <Link href="/paquetes">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg">Ver Más Paquetes</Button>
          </Link>
        </div>
      </section>

      {/* Cruceros Section */}
      <section id="cruceros" className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Temporada de Costa Cruceros</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Navega por los mares más hermosos del mundo con Costa Cruceros. Experiencias únicas a bordo de los mejores
              barcos.
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cruceros.map((crucero) => (
              <Card
                key={crucero.id}
                className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <div className="relative">
                  <img
                    src={crucero.imagen || "/placeholder.svg"}
                    alt={crucero.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-teal-500 text-white flex items-center space-x-1">
                    <Anchor className="h-3 w-3" />
                    <span className="text-xs">CRUCERO</span>
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-teal-500 text-sm mb-2">
                    <Ship className="h-4 w-4" />
                    <span>{crucero.barco}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{crucero.titulo}</h3>

                  <div className="text-gray-300 text-sm mb-3">
                    <div className="flex flex-wrap gap-1">
                      {crucero.puertos.map((puerto, index) => (
                        <span key={index} className="text-xs">
                          {puerto}
                          {index < crucero.puertos.length - 1 ? " • " : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-gray-400 text-sm mb-3">
                    <Clock className="h-4 w-4" />
                    <span>{crucero.duracion}</span>
                  </div>

                  <div className="text-xs text-gray-400 mb-4">{crucero.amenidades.join(" • ")}</div>

                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-center">
                      <span className="text-gray-400 line-through text-sm">USD ${crucero.precioOriginal}</span>
                      <div className="text-lg font-bold text-teal-500">USD ${crucero.precioActual}</div>
                    </div>
                    <Link href={`/crucero/${crucero.id}`}>
                      <Button className="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white text-sm">
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div
              ref={crucerosRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cruceros.map((crucero) => (
                <Card
                  key={crucero.id}
                  className="bg-gray-800 border-gray-700 overflow-hidden flex-shrink-0 w-80 snap-start"
                >
                  <div className="relative">
                    <img
                      src={crucero.imagen || "/placeholder.svg"}
                      alt={crucero.titulo}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-teal-500 text-white flex items-center space-x-1">
                      <Anchor className="h-3 w-3" />
                      <span className="text-xs">CRUCERO</span>
                    </Badge>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 text-teal-500 text-sm mb-2">
                      <Ship className="h-4 w-4" />
                      <span>{crucero.barco}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{crucero.titulo}</h3>

                    <div className="text-gray-300 text-sm mb-3">
                      <div className="flex flex-wrap gap-1">
                        {crucero.puertos.map((puerto, index) => (
                          <span key={index} className="text-xs">
                            {puerto}
                            {index < crucero.puertos.length - 1 ? " • " : ""}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-400 text-sm mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{crucero.duracion}</span>
                    </div>

                    <div className="text-xs text-gray-400 mb-4">{crucero.amenidades.join(" • ")}</div>

                    <div className="border-t border-gray-700 pt-3">
                      <div className="text-center">
                        <span className="text-gray-400 line-through text-sm">USD ${crucero.precioOriginal}</span>
                        <div className="text-lg font-bold text-teal-500">USD ${crucero.precioActual}</div>
                      </div>
                      <Link href={`/crucero/${crucero.id}`}>
                        <Button className="w-full mt-2 bg-teal-500 hover:bg-teal-600 text-white text-sm">
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevCrucero}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextCrucero}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4">
              {cruceros.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToCrucero(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentCruceroIndex ? "bg-teal-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ver más cruceros button */}
        <div className="text-center mt-8">
          <Link href="/cruceros">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg">Ver Más Cruceros</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 text-teal-500" />
                <span className="text-lg font-bold text-white">Terra Viajes</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Tu agencia de viajes de confianza. Más de 15 años creando experiencias inolvidables alrededor del mundo.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors duration-300" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors duration-300" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors duration-300" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#inicio" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#paquetes" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Paquetes
                  </a>
                </li>
                <li>
                  <a href="#cruceros" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Cruceros
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Términos y Condiciones
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Paquetes Nacionales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Paquetes Internacionales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Cruceros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Vuelos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors duration-300">
                    Hoteles
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <PhoneCall className="h-4 w-4 text-teal-500" />
                  <span className="text-gray-400">+54 11 4567-8900</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-teal-500" />
                  <span className="text-gray-400">info@terraviajes.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-teal-500 mt-0.5" />
                  <span className="text-gray-400">
                    Av. Corrientes 1234
                    <br />
                    CABA, Argentina
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 Terra Viajes y Turismo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
