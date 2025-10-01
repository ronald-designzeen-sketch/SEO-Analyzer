interface ScoreIndicatorProps {
  label: string
  score: number
  description?: string
}

export default function ScoreIndicator({ label, score, description }: ScoreIndicatorProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 50) return 'bg-orange-100'
    return 'bg-red-100'
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-600'
    if (score >= 50) return 'bg-orange-600'
    return 'bg-red-600'
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBackground(score)} ${getScoreColor(score)}`}>
          {score}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(score)}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  )
}

