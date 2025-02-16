"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { Layout } from "@/components/Layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PredictionResult } from "@/components/PredictionResult"
import { Button } from "@/components/ui/button"

interface FormData {
  ingredients: string
  cookingMethod: string
  cookingTemperature: string
  cookingDuration: string
  storageTemperature: string
  humidity: string
  containerType: string
}

interface PredictionData {
  safeHours: number
  storageTemp: number
  humidity: number
  containerType: string
}

// Rest of the component remains the same
export default function Predict() {
  const [formData, setFormData] = useState<FormData>({
    ingredients: "",
    cookingMethod: "",
    cookingTemperature: "",
    cookingDuration: "",
    storageTemperature: "",
    humidity: "",
    containerType: "",
  })
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error(await response.text())
      }
      
      const data = await response.json()
      setPredictionData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Food Safety Predictor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Input
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    placeholder="Enter ingredients (comma-separated)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookingMethod">Cooking Method</Label>
                  <Select 
                    value={formData.cookingMethod}
                    onValueChange={(value: string) => handleSelectChange(value, "cookingMethod")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cooking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fried">Fried</SelectItem>
                      <SelectItem value="boiled">Boiled</SelectItem>
                      <SelectItem value="baked">Baked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookingTemperature">Cooking Temperature (°C)</Label>
                  <Input
                    id="cookingTemperature"
                    name="cookingTemperature"
                    type="number"
                    value={formData.cookingTemperature}
                    onChange={handleInputChange}
                    placeholder="Enter cooking temperature"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookingDuration">Cooking Duration (minutes)</Label>
                  <Input
                    id="cookingDuration"
                    name="cookingDuration"
                    type="number"
                    value={formData.cookingDuration}
                    onChange={handleInputChange}
                    placeholder="Enter cooking duration"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storageTemperature">Storage Temperature (°C)</Label>
                  <Input
                    id="storageTemperature"
                    name="storageTemperature"
                    type="number"
                    value={formData.storageTemperature}
                    onChange={handleInputChange}
                    placeholder="Enter storage temperature"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <Input
                    id="humidity"
                    name="humidity"
                    type="number"
                    value={formData.humidity}
                    onChange={handleInputChange}
                    placeholder="Enter humidity"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="containerType">Container Type</Label>
                  <Select
                    value={formData.containerType}
                    onValueChange={(value: string) => handleSelectChange(value, "containerType")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select container type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">Plastic</SelectItem>
                      <SelectItem value="glass">Glass</SelectItem>
                      <SelectItem value="metal">Metal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Predicting..." : "Predict Safe Consumption Window"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {predictionData && <PredictionResult data={predictionData} />}
      </div>
    </Layout>
  )
}
