"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PredictionResult from "@/components/PredictionResult"

export default function FoodInputForm() {
  const [formData, setFormData] = useState({
    ingredients: "",
    cookingMethod: "",
    cookingTemperature: "",
    cookingDuration: "",
    storageTemperature: "",
    humidity: "",
    containerType: "",
  })

  const [prediction, setPrediction] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send data to backend API
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

      <div>
        <Label htmlFor="cookingMethod">Cooking Method</Label>
        <Select name="cookingMethod" onValueChange={(value) => handleSelectChange("cookingMethod", value)}>
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

      <div>
        <Label htmlFor="cookingTemperature">Cooking Temperature (°C)</Label>
        <Input
          id="cookingTemperature"
          name="cookingTemperature"
          type="number"
          value={formData.cookingTemperature}
          onChange={handleInputChange}
          placeholder="Enter cooking temperature"
          required
        />
      </div>

      <div>
        <Label htmlFor="cookingDuration">Cooking Duration (minutes)</Label>
        <Input
          id="cookingDuration"
          name="cookingDuration"
          type="number"
          value={formData.cookingDuration}
          onChange={handleInputChange}
          placeholder="Enter cooking duration"
          required
        />
      </div>

      <div>
        <Label htmlFor="storageTemperature">Storage Temperature (°C)</Label>
        <Input
          id="storageTemperature"
          name="storageTemperature"
          type="number"
          value={formData.storageTemperature}
          onChange={handleInputChange}
          placeholder="Enter storage temperature"
          required
        />
      </div>

      <div>
        <Label htmlFor="humidity">Humidity (%)</Label>
        <Input
          id="humidity"
          name="humidity"
          type="number"
          value={formData.humidity}
          onChange={handleInputChange}
          placeholder="Enter humidity"
          required
        />
      </div>

      <div>
        <Label htmlFor="containerType">Container Type</Label>
        <Select name="containerType" onValueChange={(value) => handleSelectChange("containerType", value)}>
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

      <Button type="submit">Predict Safe Consumption Window</Button>
    </form>
  )
}

