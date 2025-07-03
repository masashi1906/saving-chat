'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import GoalCard from '@/components/GoalCard'
import QuickActionButton from '@/components/QuickActionButton'
import BottomNavigation from '@/components/BottomNavigation'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home')

  // Sample data
  const goals = [
    {
      id: 1,
      title: '新車購入',
      currentAmount: 350000,
      targetAmount: 1500000,
      progress: 23,
      daysLeft: 180
    },
    {
      id: 2,
      title: '海外旅行',
      currentAmount: 80000,
      targetAmount: 200000,
      progress: 40,
      daysLeft: 90
    }
  ]

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`)
  }

  return (
    <div className="min-h-screen flex flex-col w-full max-w-[375px] mx-auto bg-background">
      {/* Header */}
      <Header />
      
      {/* Content */}
      <div className="flex-1 px-5 py-5 space-y-6">
        {/* Current Goals */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">現在の目標</h2>
          <div className="space-y-4">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                title={goal.title}
                currentAmount={goal.currentAmount}
                targetAmount={goal.targetAmount}
                progress={goal.progress}
                daysLeft={goal.daysLeft}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">クイックアクション</h2>
          <div className="space-y-3">
            <QuickActionButton
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              title="進捗を記録"
              description="今月の貯金額を入力"
              onClick={() => handleQuickAction('record')}
            />
            
            <QuickActionButton
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              title="AIに相談"
              description="貯金計画について質問"
              onClick={() => handleQuickAction('chat')}
            />
          </div>
        </div>

        {/* New Goal Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">新しい目標</h2>
          <button className="w-full py-4 border-2 border-dashed border-border-gray rounded-card text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors">
            <div className="flex flex-col items-center space-y-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="font-medium">新しい目標を追加</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />
    </div>
  )
}
