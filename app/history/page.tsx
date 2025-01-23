"use client"

import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration
const historyData = [
  { id: 1, date: "2023-06-01", food: "Chicken Curry", prediction: "24 hours" },
  { id: 2, date: "2023-06-02", food: "Vegetable Stir Fry", prediction: "48 hours" },
  { id: 3, date: "2023-06-03", food: "Beef Stew", prediction: "72 hours" },
  { id: 4, date: "2023-06-04", food: "Pasta Salad", prediction: "36 hours" },
  { id: 5, date: "2023-06-05", food: "Grilled Salmon", prediction: "24 hours" },
]

export default function History() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Prediction History</h1>
        <Card>
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Food Item</TableHead>
                  <TableHead>Predicted Safe Window</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.food}</TableCell>
                    <TableCell>{item.prediction}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

