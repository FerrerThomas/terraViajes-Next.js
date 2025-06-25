"use client"

import Link from "next/link"
import { Plane, Phone, Menu, X } from "lucide-react"

interface HeaderProps {
  isMenuOpen?: boolean
  setIsMenuOpen?: (open: boolean) => void
  showBackButton?: boolean
}

export default function Header({ isMenuOpen = false, setIsMenuOpen, showBackButton = false }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur border-b border-gray-800 z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-teal-500" />
          <span className="text-xl font-bold text-white">Terra Viajes</span>
        </Link>

        {!showBackButton && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/#inicio" className="text-white hover:text-teal-500 transition-colors duration-300">
                Inicio
              </a>
              <a href="/#paquetes" className="text-white hover:text-teal-500 transition-colors duration-300">
                Paquetes
              </a>
              <a href="/#cruceros" className="text-white hover:text-teal-500 transition-colors duration-300">
                Cruceros
              </a>
              <a href="/#contacto" className="text-white hover:text-teal-500 transition-colors duration-300">
                Contacto
              </a>
            </nav>

            {/* Phone */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white hover:text-teal-500 transition-colors duration-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+54 11 4567-8900</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            {setIsMenuOpen && (
              <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && !showBackButton && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="/#inicio" className="block text-white hover:text-teal-500 transition-colors duration-300">
              Inicio
            </a>
            <a href="/#paquetes" className="block text-white hover:text-teal-500 transition-colors duration-300">
              Paquetes
            </a>
            <a href="/#cruceros" className="block text-white hover:text-teal-500 transition-colors duration-300">
              Cruceros
            </a>
            <a href="/#contacto" className="block text-white hover:text-teal-500 transition-colors duration-300">
              Contacto
            </a>
            <div className="flex items-center space-x-2 text-white">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+54 11 4567-8900</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
