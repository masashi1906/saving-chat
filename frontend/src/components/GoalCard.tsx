interface GoalCardProps {
  title: string
  currentAmount: number
  targetAmount: number
  progress: number
  daysLeft?: number
}

export default function GoalCard({ 
  title, 
  currentAmount, 
  targetAmount, 
  progress,
  daysLeft 
}: GoalCardProps) {
  return (
    <div className="bg-card rounded-card shadow-card border border-border-light p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-foreground text-base">{title}</h3>
        {daysLeft && (
          <span className="text-sm text-gray-500">{daysLeft}日</span>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            ¥{currentAmount.toLocaleString()} / ¥{targetAmount.toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-primary-500">
            {progress}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        あと ¥{(targetAmount - currentAmount).toLocaleString()}
      </div>
    </div>
  )
}