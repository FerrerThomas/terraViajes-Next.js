"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Mail, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Paquete, Crucero } from "@/lib/data"

interface ConsultaOptionsProps {
  item: Paquete | Crucero
  tipo: "paquete" | "crucero"
}

export default function ConsultaOptions({ item, tipo }: ConsultaOptionsProps) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailForm, setEmailForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    mensaje: "",
  })

  const handleWhatsAppConsulta = () => {
    const mensaje = `Buenas, quería realizar una consulta sobre "${item.titulo}" (ID: ${item.id})`
    const whatsappUrl = `https://wa.me/5491145678900?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se procesaría el envío del email
    console.log("Consulta por email:", {
      ...emailForm,
      item,
      tipo,
    })
    alert("Consulta enviada correctamente. Te contactaremos pronto.")
    setEmailForm({ nombre: "", apellido: "", email: "", mensaje: "" })
    setShowEmailForm(false)
  }

  if (showEmailForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setShowEmailForm(false)}
            className="text-white hover:text-teal-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a opciones
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">Consulta por Email</h1>
          <p className="text-gray-400">
            Consulta sobre: <span className="text-teal-500 font-semibold">{item.titulo}</span>
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre" className="text-white">
                Nombre *
              </Label>
              <Input
                id="nombre"
                required
                value={emailForm.nombre}
                onChange={(e) => setEmailForm({ ...emailForm, nombre: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <Label htmlFor="apellido" className="text-white">
                Apellido *
              </Label>
              <Input
                id="apellido"
                required
                value={emailForm.apellido}
                onChange={(e) => setEmailForm({ ...emailForm, apellido: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-white">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={emailForm.email}
              onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <Label htmlFor="mensaje" className="text-white">
              Mensaje
            </Label>
            <Textarea
              id="mensaje"
              rows={5}
              placeholder="Escribe tu consulta aquí..."
              value={emailForm.mensaje}
              onChange={(e) => setEmailForm({ ...emailForm, mensaje: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white flex-1">
              <Send className="h-4 w-4 mr-2" />
              Enviar Consulta
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEmailForm(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-white mb-2">¿Cómo querés consultar?</h1>
      <p className="text-gray-400 mb-8">
        Consulta sobre: <span className="text-teal-500 font-semibold">{item.titulo}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 hover:border-teal-500 transition-colors duration-300">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
            <p className="text-gray-400 mb-6">Consulta rápida por WhatsApp con respuesta inmediata</p>
            <Button onClick={handleWhatsAppConsulta} className="w-full bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Consultar por WhatsApp
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:border-teal-500 transition-colors duration-300">
          <CardContent className="p-8 text-center">
            <Mail className="h-12 w-12 text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-gray-400 mb-6">Envía una consulta detallada por correo electrónico</p>
            <Button onClick={() => setShowEmailForm(true)} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
              <Mail className="h-4 w-4 mr-2" />
              Consultar por Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
