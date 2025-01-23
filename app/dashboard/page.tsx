"use client"

import Link from "next/link"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Clock, Settings } from "lucide-react"

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to SafeFood AI</h1>
        <p className="text-xl text-gray-600">Your intelligent food safety assistant</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predict Safe Consumption</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">New Prediction</p>
              <p className="text-xs text-muted-foreground">Make a new prediction for safe food consumption window</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/predict">Make Prediction</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">View History</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Past Predictions</p>
              <p className="text-xs text-muted-foreground">View your past predictions and results</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/history">View History</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Settings</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Manage Account</p>
              <p className="text-xs text-muted-foreground">Update your account settings and preferences</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/settings">Manage Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

