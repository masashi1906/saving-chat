const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// AI Chat endpoint (Claude functionality)
app.post('/api/chat', (req, res) => {
  const { message, context } = req.body;
  
  // Simple rule-based chatbot for savings planning
  let response = processMessage(message, context);
  
  res.json({
    response: response,
    timestamp: new Date().toISOString()
  });
});

// Savings goal endpoints
app.get('/api/goals', (req, res) => {
  // Return saved goals (would be from database in production)
  res.json({ goals: [] });
});

app.post('/api/goals', (req, res) => {
  const goal = req.body;
  // Save goal (would be to database in production)
  res.json({ success: true, goal });
});

// Simple chatbot logic
function processMessage(message, context = {}) {
  const msg = message.toLowerCase();
  
  if (msg.includes('こんにちは') || msg.includes('はじめまして')) {
    return 'こんにちは！貯金計画のお手伝いをさせていただきます。どのような目標で貯金をお考えですか？（例：車の購入、旅行、結婚資金など）';
  }
  
  if (msg.includes('車') || msg.includes('くるま')) {
    return '車の購入ですね！素晴らしい目標です。どれくらいの予算をお考えですか？また、いつ頃までに購入予定でしょうか？';
  }
  
  if (msg.includes('旅行') || msg.includes('りょこう')) {
    return '旅行の計画ですね！どちらへの旅行をお考えですか？予算と時期を教えていただければ、最適な貯金プランをご提案します。';
  }
  
  if (msg.includes('結婚') || msg.includes('けっこん')) {
    return '結婚資金の準備ですね！人生の大切な節目ですね。式の規模や時期によって必要な資金も変わりますが、目標金額はどれくらいをお考えですか？';
  }
  
  if (msg.includes('万円') || msg.includes('円')) {
    const amounts = msg.match(/(\d+)万円/g);
    if (amounts) {
      const amount = amounts[0];
      return `${amount}の目標ですね！いつまでに貯めたいですか？期間を教えていただければ、月々の貯金額を計算してご提案します。`;
    }
  }
  
  if (msg.includes('月') || msg.includes('年')) {
    return '期間を教えていただきありがとうございます！毎月どれくらい貯金に回すことができそうでしょうか？無理のない範囲で計画を立てましょう。';
  }
  
  if (msg.includes('ありがとう')) {
    return 'どういたしまして！一緒に目標達成に向けて頑張りましょう。何か他にご質問があればお気軽にお聞かせください。';
  }
  
  // Default response
  return '貯金計画について、もう少し詳しく教えてください。目標（車、旅行、結婚資金など）、予算、期間などを教えていただければ、より具体的なアドバイスができます。';
}

// Serve the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎯 SavingChat server is running on http://localhost:${PORT}`);
  console.log(`💰 Your AI-powered savings planning assistant is ready!`);
  console.log(`🚀 Open your browser and start planning your financial goals!`);
});