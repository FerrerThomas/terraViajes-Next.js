"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Edit, Save, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Paquete, Crucero } from "@/lib/data"
import {
  getPaquetes,
  getCruceros,
  savePaquetes,
  saveCruceros,
  resetToDefaults,
  defaultPaquetes,
  defaultCruceros,
} from "@/lib/data"

const ADMIN_PASSWORD = "terraviajes2024" // Cambiar por una contraseña segura

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [paquetes, setPaquetes] = useState<Paquete[]>([])
  const [cruceros, setCruceros] = useState<Crucero[]>([])
  const [editingPaquete, setEditingPaquete] = useState<number | null>(null)
  const [editingCrucero, setEditingCrucero] = useState<number | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      setPaquetes(getPaquetes())
      setCruceros(getCruceros())
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Contraseña incorrecta")
    }
  }

  const handleSavePaquete = (paquete: Paquete) => {
    const updatedPaquetes = paquetes.map((p) => (p.id === paquete.id ? paquete : p))
    setPaquetes(updatedPaquetes)
    savePaquetes(updatedPaquetes)
    setEditingPaquete(null)
  }

  const handleSaveCrucero = (crucero: Crucero) => {
    const updatedCruceros = cruceros.map((c) => (c.id === crucero.id ? crucero : c))
    setCruceros(updatedCruceros)
    saveCruceros(updatedCruceros)
    setEditingCrucero(null)
  }

  const handleResetData = () => {
    if (confirm("¿Estás seguro de que quieres resetear todos los datos a los valores por defecto?")) {
      resetToDefaults()
      setPaquetes(defaultPaquetes)
      setCruceros(defaultCruceros)
      alert("Datos reseteados correctamente")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Ingresa la contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full bg-teal-500 hover:bg-teal-600">
              Ingresar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Panel de Administración - Terra Viajes</h1>
          <div className="flex gap-2">
            <Button
              onClick={handleResetData}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetear Datos
            </Button>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline">
              Cerrar Sesión
            </Button>
          </div>
        </div>

        <Tabs defaultValue="paquetes" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="paquetes" className="data-[state=active]:bg-teal-500">
              Paquetes ({paquetes.length})
            </TabsTrigger>
            <TabsTrigger value="cruceros" className="data-[state=active]:bg-teal-500">
              Cruceros ({cruceros.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paquetes">
            <div className="grid gap-6">
              {paquetes.map((paquete) => (
                <PaqueteEditor
                  key={paquete.id}
                  paquete={paquete}
                  isEditing={editingPaquete === paquete.id}
                  onEdit={() => setEditingPaquete(paquete.id)}
                  onSave={handleSavePaquete}
                  onCancel={() => setEditingPaquete(null)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cruceros">
            <div className="grid gap-6">
              {cruceros.map((crucero) => (
                <CruceroEditor
                  key={crucero.id}
                  crucero={crucero}
                  isEditing={editingCrucero === crucero.id}
                  onEdit={() => setEditingCrucero(crucero.id)}
                  onSave={handleSaveCrucero}
                  onCancel={() => setEditingCrucero(null)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PaqueteEditor({
  paquete,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: {
  paquete: Paquete
  isEditing: boolean
  onEdit: () => void
  onSave: (paquete: Paquete) => void
  onCancel: () => void
}) {
  const [editedPaquete, setEditedPaquete] = useState<Paquete>(paquete)

  useEffect(() => {
    setEditedPaquete(paquete)
  }, [paquete])

  const handleSave = () => {
    onSave(editedPaquete)
  }

  const updateArrayField = (field: keyof Paquete["detalles"], value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "")
    setEditedPaquete({
      ...editedPaquete,
      detalles: {
        ...editedPaquete.detalles,
        [field]: items,
      },
    })
  }

  if (!isEditing) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">{paquete.titulo}</CardTitle>
          <Button onClick={onEdit} size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Ubicación:</strong> {paquete.ubicacion}
            </div>
            <div>
              <strong>Duración:</strong> {paquete.duracion}
            </div>
            <div>
              <strong>Rating:</strong> {paquete.rating}
            </div>
            <div>
              <strong>Precio Original:</strong> ARS ${paquete.precioOriginal.toLocaleString()}
            </div>
            <div>
              <strong>Precio Actual:</strong> ARS ${paquete.precioActual.toLocaleString()}
            </div>
            <div>
              <Badge className="bg-red-500">{paquete.descuento}</Badge>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-300">{paquete.descripcion}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Editando: {paquete.titulo}</CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button onClick={onCancel} size="sm" variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Título</Label>
            <Input
              value={editedPaquete.titulo}
              onChange={(e) => setEditedPaquete({ ...editedPaquete, titulo: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Ubicación</Label>
            <Input
              value={editedPaquete.ubicacion}
              onChange={(e) => setEditedPaquete({ ...editedPaquete, ubicacion: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Duración</Label>
            <Input
              value={editedPaquete.duracion}
              onChange={(e) => setEditedPaquete({ ...editedPaquete, duracion: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Descuento</Label>
            <Input
              value={editedPaquete.descuento}
              onChange={(e) => setEditedPaquete({ ...editedPaquete, descuento: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Rating</Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={editedPaquete.rating}
              onChange={(e) => setEditedPaquete({ ...editedPaquete, rating: Number.parseFloat(e.target.value) || 0 })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Reviews</Label>
            <Input
              type="number"
              value={editedPaquete.reviews}
              onChange={(e) => setEditedPaquete({ ...editedPaquete, reviews: Number.parseInt(e.target.value) || 0 })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Precio Original</Label>
            <Input
              type="number"
              value={editedPaquete.precioOriginal}
              onChange={(e) =>
                setEditedPaquete({ ...editedPaquete, precioOriginal: Number.parseInt(e.target.value) || 0 })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Precio Actual</Label>
            <Input
              type="number"
              value={editedPaquete.precioActual}
              onChange={(e) =>
                setEditedPaquete({ ...editedPaquete, precioActual: Number.parseInt(e.target.value) || 0 })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label className="text-white">Descripción</Label>
          <Textarea
            value={editedPaquete.descripcion}
            onChange={(e) => setEditedPaquete({ ...editedPaquete, descripcion: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Incluye (uno por línea)</Label>
            <Textarea
              value={editedPaquete.detalles.incluye.join("\n")}
              onChange={(e) => updateArrayField("incluye", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
          <div>
            <Label className="text-white">No Incluye (uno por línea)</Label>
            <Textarea
              value={editedPaquete.detalles.noIncluye.join("\n")}
              onChange={(e) => updateArrayField("noIncluye", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
          <div>
            <Label className="text-white">Itinerario (uno por línea)</Label>
            <Textarea
              value={editedPaquete.detalles.itinerario.join("\n")}
              onChange={(e) => updateArrayField("itinerario", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
          <div>
            <Label className="text-white">Hoteles (uno por línea)</Label>
            <Textarea
              value={editedPaquete.detalles.hoteles.join("\n")}
              onChange={(e) => updateArrayField("hoteles", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CruceroEditor({
  crucero,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: {
  crucero: Crucero
  isEditing: boolean
  onEdit: () => void
  onSave: (crucero: Crucero) => void
  onCancel: () => void
}) {
  const [editedCrucero, setEditedCrucero] = useState<Crucero>(crucero)

  useEffect(() => {
    setEditedCrucero(crucero)
  }, [crucero])

  const handleSave = () => {
    onSave(editedCrucero)
  }

  const updateArrayField = (field: keyof Crucero["detalles"] | "puertos" | "amenidades", value: string) => {
    const items = value.split("\n").filter((item) => item.trim() !== "")
    if (field === "puertos" || field === "amenidades") {
      setEditedCrucero({
        ...editedCrucero,
        [field]: items,
      })
    } else {
      setEditedCrucero({
        ...editedCrucero,
        detalles: {
          ...editedCrucero.detalles,
          [field]: items,
        },
      })
    }
  }

  if (!isEditing) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">{crucero.titulo}</CardTitle>
          <Button onClick={onEdit} size="sm" className="bg-teal-500 hover:bg-teal-600">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Barco:</strong> {crucero.barco}
            </div>
            <div>
              <strong>Duración:</strong> {crucero.duracion}
            </div>
            <div>
              <strong>Rating:</strong> {crucero.rating}
            </div>
            <div>
              <strong>Precio Original:</strong> USD ${crucero.precioOriginal}
            </div>
            <div>
              <strong>Precio Actual:</strong> USD ${crucero.precioActual}
            </div>
            <div>
              <strong>Puertos:</strong> {crucero.puertos.join(", ")}
            </div>
          </div>
          <div className="mt-4">
            <strong>Amenidades:</strong> {crucero.amenidades.join(" • ")}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Editando: {crucero.titulo}</CardTitle>
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button onClick={onCancel} size="sm" variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Título</Label>
            <Input
              value={editedCrucero.titulo}
              onChange={(e) => setEditedCrucero({ ...editedCrucero, titulo: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Barco</Label>
            <Input
              value={editedCrucero.barco}
              onChange={(e) => setEditedCrucero({ ...editedCrucero, barco: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Duración</Label>
            <Input
              value={editedCrucero.duracion}
              onChange={(e) => setEditedCrucero({ ...editedCrucero, duracion: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Rating</Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={editedCrucero.rating}
              onChange={(e) => setEditedCrucero({ ...editedCrucero, rating: Number.parseFloat(e.target.value) || 0 })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Precio Original</Label>
            <Input
              type="number"
              value={editedCrucero.precioOriginal}
              onChange={(e) =>
                setEditedCrucero({ ...editedCrucero, precioOriginal: Number.parseInt(e.target.value) || 0 })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label className="text-white">Precio Actual</Label>
            <Input
              type="number"
              value={editedCrucero.precioActual}
              onChange={(e) =>
                setEditedCrucero({ ...editedCrucero, precioActual: Number.parseInt(e.target.value) || 0 })
              }
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Puertos (uno por línea)</Label>
            <Textarea
              value={editedCrucero.puertos.join("\n")}
              onChange={(e) => updateArrayField("puertos", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={4}
            />
          </div>
          <div>
            <Label className="text-white">Amenidades (uno por línea)</Label>
            <Textarea
              value={editedCrucero.amenidades.join("\n")}
              onChange={(e) => updateArrayField("amenidades", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={4}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white">Incluye (uno por línea)</Label>
            <Textarea
              value={editedCrucero.detalles.incluye.join("\n")}
              onChange={(e) => updateArrayField("incluye", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
          <div>
            <Label className="text-white">No Incluye (uno por línea)</Label>
            <Textarea
              value={editedCrucero.detalles.noIncluye.join("\n")}
              onChange={(e) => updateArrayField("noIncluye", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
          <div>
            <Label className="text-white">Itinerario (uno por línea)</Label>
            <Textarea
              value={editedCrucero.detalles.itinerario.join("\n")}
              onChange={(e) => updateArrayField("itinerario", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
          <div>
            <Label className="text-white">Camarotes (uno por línea)</Label>
            <Textarea
              value={editedCrucero.detalles.camarotes.join("\n")}
              onChange={(e) => updateArrayField("camarotes", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              rows={5}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
