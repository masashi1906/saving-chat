export default function Header() {
  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white h-[120px] flex flex-col justify-center">
      <div className="px-5 pt-6 pb-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-6 h-6"></div> {/* Placeholder for menu icon */}
          <div className="w-6 h-6"></div> {/* Placeholder for notification icon */}
        </div>
        
        {/* Greeting Message */}
        <div>
          <p className="text-base font-medium leading-6">
            こんにちは！<br />
            今日も貯金頑張りましょう 💪
          </p>
        </div>
      </div>
    </div>
  )
}