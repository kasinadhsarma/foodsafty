"use client"

import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const safePredictions = [
  { id: 1, food: "Chicken Curry", prediction: "24 hours", status: "Safe" },
  { id: 2, food: "Vegetable Stir Fry", prediction: "12 hours", status: "Caution" },
  { id: 3, food: "Beef Stew", prediction: "48 hours", status: "Safe" },
  { id: 4, food: "Pasta Salad", prediction: "6 hours", status: "Expired" },
  { id: 5, food: "Grilled Salmon", prediction: "18 hours", status: "Safe" },
]

export default function SafePredictions() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Safe Predictions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safePredictions.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.food}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">Safe for: {item.prediction}</p>
                <Badge
                  variant={item.status === "Safe" ? "default" : item.status === "Caution" ? "secondary" : "destructive"}
                >
                  {item.status}
                </Badge>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

