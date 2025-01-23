import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PredictionResultProps {
  data: {
    safeHours: number
    storageTemp: number
    humidity: number
    containerType: string
  }
}

export function PredictionResult({ data }: PredictionResultProps) {
  const safetyLevel = data.safeHours
  
  const getStatusColor = () => {
    if (safetyLevel > 72) return "bg-green-500"
    if (safetyLevel > 48) return "bg-yellow-500"
    return "bg-red-500"
  }

  const progressWidth = Math.min((safetyLevel / 96) * 100, 100)

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Safety Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Safe Consumption Window</h3>
            <div className="flex items-center gap-4">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className={`h-full rounded-full ${getStatusColor()}`}
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
              <span className="font-bold whitespace-nowrap">{safetyLevel} hours</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Storage Recommendations</h4>
              <ul className="text-sm space-y-1">
                <li>Keep at {data.storageTemp}°C</li>
                <li>Maintain {data.humidity}% humidity</li>
                <li>Use {data.containerType} container</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Safety Tips</h4>
              <ul className="text-sm space-y-1">
                <li>Check for off-odors before consuming</li>
                <li>Reheat thoroughly when serving</li>
                <li>Keep container sealed</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}