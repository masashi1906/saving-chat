interface QuickActionButtonProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

export default function QuickActionButton({
  icon,
  title,
  description,
  onClick
}: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-card rounded-card shadow-card border border-border-light p-4 w-full text-left hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  )
}