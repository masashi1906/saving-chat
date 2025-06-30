class SavingChatApp {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.goalsList = document.getElementById('goalsList');
        
        this.goals = this.loadGoals();
        this.chatHistory = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderGoals();
        this.loadChatHistory();
    }
    
    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.chatInput.addEventListener('input', () => {
            this.sendButton.disabled = this.chatInput.value.trim().length === 0;
        });
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.sendButton.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send to backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    context: {
                        goals: this.goals,
                        chatHistory: this.chatHistory.slice(-5) // Last 5 messages for context
                    }
                })
            });
            
            const data = await response.json();
            
            // Remove typing indicator and add AI response
            this.removeTypingIndicator();
            this.addMessage(data.response, 'ai');
            
            // Check if we should create a goal based on the conversation
            this.analyzeForGoalCreation(message, data.response);
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.removeTypingIndicator();
            this.addMessage('申し訳ございません。エラーが発生しました。もう一度お試しください。', 'ai');
        }
    }
    
    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Handle line breaks and format content
        const formattedContent = content.replace(/\n/g, '<br>');
        messageContent.innerHTML = `<p>${formattedContent}</p>`;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Save to chat history
        this.chatHistory.push({ type, content, timestamp: new Date().toISOString() });
        this.saveChatHistory();
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message';
        typingDiv.id = 'typingIndicator';
        
        const indicatorContent = document.createElement('div');
        indicatorContent.className = 'typing-indicator';
        indicatorContent.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        typingDiv.appendChild(indicatorContent);
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    analyzeForGoalCreation(userMessage, aiResponse) {
        const msg = userMessage.toLowerCase();
        
        // Check if user mentioned specific amounts and timeframes
        const amountMatch = msg.match(/(\d+)万円/);
        const timeMatch = msg.match(/(\d+)(年|ヶ月|月)/);
        
        if (amountMatch && timeMatch) {
            const amount = parseInt(amountMatch[1]) * 10000;
            const timeValue = parseInt(timeMatch[1]);
            const timeUnit = timeMatch[2];
            
            let months = 0;
            if (timeUnit.includes('年')) {
                months = timeValue * 12;
            } else {
                months = timeValue;
            }
            
            // Determine goal type from conversation
            let goalType = '貯金目標';
            if (msg.includes('車') || msg.includes('くるま')) goalType = '車の購入';
            else if (msg.includes('旅行')) goalType = '旅行';
            else if (msg.includes('結婚')) goalType = '結婚資金';
            else if (msg.includes('緊急') || msg.includes('備え')) goalType = '緊急時の備え';
            
            this.createGoal(goalType, amount, months);
        }
    }
    
    createGoal(name, targetAmount, months) {
        const goal = {
            id: Date.now().toString(),
            name: name,
            targetAmount: targetAmount,
            currentAmount: 0,
            targetDate: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
            createdDate: new Date(),
            monthlyTarget: Math.ceil(targetAmount / months),
            milestones: [
                { percentage: 25, amount: targetAmount * 0.25, achieved: false },
                { percentage: 50, amount: targetAmount * 0.5, achieved: false },
                { percentage: 75, amount: targetAmount * 0.75, achieved: false },
                { percentage: 100, amount: targetAmount, achieved: false }
            ]
        };
        
        this.goals.push(goal);
        this.saveGoals();
        this.renderGoals();
        
        // Add confirmation message
        this.addMessage(
            `✅ 目標「${name}」を作成しました！\n` +
            `目標金額: ${targetAmount.toLocaleString()}円\n` +
            `期限: ${goal.targetDate.toLocaleDateString('ja-JP')}\n` +
            `月々の目標: ${goal.monthlyTarget.toLocaleString()}円`,
            'ai'
        );
    }
    
    renderGoals() {
        if (this.goals.length === 0) {
            this.goalsList.innerHTML = `
                <div class="no-goals">
                    <p>まだ目標が設定されていません</p>
                    <p>チャットで目標を相談してみましょう！</p>
                </div>
            `;
            return;
        }
        
        this.goalsList.innerHTML = this.goals.map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const remainingDays = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24));
            
            return `
                <div class="goal-card">
                    <div class="goal-header">
                        <div class="goal-title">${goal.name}</div>
                        <div class="goal-amount">${goal.targetAmount.toLocaleString()}円</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="goal-stats">
                        <span>現在: ${goal.currentAmount.toLocaleString()}円</span>
                        <span>${remainingDays > 0 ? `残り${remainingDays}日` : '期限経過'}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    loadGoals() {
        const saved = localStorage.getItem('savingchat_goals');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveGoals() {
        localStorage.setItem('savingchat_goals', JSON.stringify(this.goals));
    }
    
    loadChatHistory() {
        const saved = localStorage.getItem('savingchat_history');
        if (saved) {
            this.chatHistory = JSON.parse(saved);
            // Restore last few messages
            this.chatHistory.slice(-10).forEach(msg => {
                if (msg.type !== 'ai' || !msg.content.includes('こんにちは！貯金計画のお手伝い')) {
                    this.addMessageToUI(msg.content, msg.type);
                }
            });
        }
    }
    
    addMessageToUI(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
    }
    
    saveChatHistory() {
        // Keep only last 50 messages
        if (this.chatHistory.length > 50) {
            this.chatHistory = this.chatHistory.slice(-50);
        }
        localStorage.setItem('savingchat_history', JSON.stringify(this.chatHistory));
    }
}

// Quick start functions
function quickStart(type) {
    const app = window.savingChatApp;
    const messages = {
        '車': '車の購入を考えています',
        '旅行': '旅行の計画を立てたいです',
        '結婚': '結婚資金を貯めたいです',
        '緊急時': '緊急時の備えとして貯金したいです'
    };
    
    app.chatInput.value = messages[type] || messages['車'];
    app.sendMessage();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.savingChatApp = new SavingChatApp();
});

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}