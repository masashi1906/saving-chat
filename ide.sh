#!/bin/bash

echo "🚀 SavingChat IDE - Development Environment"
echo "=========================================="
echo ""
echo "📁 Project: SavingChat - AI貯金計画アシスタント"
echo "🌐 Repository: https://github.com/masashi1906/saving-chat"
echo ""

# Show project structure
echo "📂 Project Structure:"
echo "├── server.js (Express server with AI chat endpoints)"
echo "├── package.json (Node.js dependencies)"
echo "├── public/"
echo "│   ├── index.html (Main web app)"
echo "│   ├── styles.css (Modern mobile-first CSS)"
echo "│   └── app.js (Frontend JavaScript logic)"
echo "└── CLAUDE.md (Project configuration)"
echo ""

# Show available commands
echo "💻 Available Commands:"
echo "  npm start     - Start the SavingChat server"
echo "  npm run dev   - Start in development mode"
echo "  npm run ide   - This IDE script"
echo ""

# Show server status
echo "🔍 Checking server status..."
if pgrep -f "node server.js" > /dev/null; then
    echo "✅ SavingChat server is running"
    echo "🌐 Access at: http://localhost:3000"
else
    echo "⏸️  SavingChat server is not running"
    echo "💡 Run 'npm start' to start the server"
fi

echo ""
echo "🛠️  Development Tools:"
echo "  - AI Chat Engine: Rule-based chatbot for savings planning"
echo "  - Frontend: Vanilla JavaScript with modern ES6+ features"
echo "  - Backend: Express.js with RESTful API"
echo "  - Storage: LocalStorage for client-side data persistence"
echo "  - PWA Ready: Service worker support for mobile app experience"
echo ""

# Show recent git activity
echo "📝 Recent Activity:"
git log --oneline -5 2>/dev/null || echo "No git history available"
echo ""

echo "🎯 Ready for development! Happy coding!"