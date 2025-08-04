// SMS Spam Detection JavaScript Implementation
// This is a simplified client-side version of the Python ML model

class SpamDetector {
    constructor() {
        // Common spam keywords and their weights (simplified from the actual TF-IDF model)
        this.spamKeywords = {
            'free': 0.8, 'win': 0.7, 'winner': 0.8, 'prize': 0.7, 'money': 0.6,
            'cash': 0.7, 'urgent': 0.8, 'call': 0.5, 'text': 0.4, 'claim': 0.7,
            'congratulations': 0.8, 'selected': 0.6, 'offer': 0.5, 'limited': 0.6,
            'act': 0.5, 'now': 0.4, 'today': 0.4, 'expires': 0.7, 'click': 0.6,
            'link': 0.5, 'visit': 0.4, 'website': 0.4, 'guaranteed': 0.7,
            'risk': 0.6, 'bonus': 0.6, 'discount': 0.5, 'save': 0.4,
            'thousand': 0.7, 'hundred': 0.6, 'million': 0.8, 'pounds': 0.6,
            'dollars': 0.6, 'reward': 0.6, 'nokia': 0.5, 'mobile': 0.4,
            'phone': 0.3, 'txt': 0.5, 'msg': 0.4, 'stop': 0.3,
            'premium': 0.6, 'rate': 0.4, 'subscription': 0.5, 'service': 0.3
        };

        // Common legitimate words that reduce spam probability
        this.hamKeywords = {
            'hi': -0.3, 'hello': -0.3, 'how': -0.3, 'are': -0.2, 'you': -0.2,
            'the': -0.1, 'and': -0.1, 'is': -0.2, 'at': -0.2, 'to': -0.1,
            'for': -0.1, 'will': -0.2, 'can': -0.2, 'see': -0.2, 'meet': -0.3,
            'lunch': -0.4, 'dinner': -0.4, 'tomorrow': -0.3, 'today': -0.2,
            'thanks': -0.4, 'thank': -0.4, 'love': -0.4, 'home': -0.3,
            'work': -0.2, 'school': -0.3, 'family': -0.3, 'friend': -0.3
        };

        this.spamPatterns = [
            /\b(free|FREE)\b/g,
            /\$\d+/g,
            /\b\d+%\s*(off|discount)\b/gi,
            /\b(urgent|URGENT)\b/g,
            /\b(winner|WINNER)\b/g,
            /\b(claim|CLAIM)\b/g,
            /!{2,}/g, // Multiple exclamation marks
            /\b(call|text)\s+\d{4,}/gi // Call/text followed by numbers
        ];
    }

    preprocessText(text) {
        // Convert to lowercase
        text = text.toLowerCase();
        
        // Remove special characters but keep spaces
        text = text.replace(/[^\w\s]/g, ' ');
        
        // Remove extra spaces
        text = text.replace(/\s+/g, ' ').trim();
        
        // Tokenize (split into words)
        let words = text.split(' ').filter(word => word.length > 0);
        
        // Simple stemming (remove common suffixes)
        words = words.map(word => {
            // Basic stemming rules
            if (word.endsWith('ing')) return word.slice(0, -3);
            if (word.endsWith('ed')) return word.slice(0, -2);
            if (word.endsWith('er')) return word.slice(0, -2);
            if (word.endsWith('est')) return word.slice(0, -3);
            if (word.endsWith('ly')) return word.slice(0, -2);
            if (word.endsWith('tion')) return word.slice(0, -4);
            return word;
        });
        
        return words;
    }

    calculateSpamScore(text) {
        const words = this.preprocessText(text);
        let spamScore = 0;
        let wordCount = words.length;
        
        // Check for spam keywords
        words.forEach(word => {
            if (this.spamKeywords[word]) {
                spamScore += this.spamKeywords[word];
            }
            if (this.hamKeywords[word]) {
                spamScore += this.hamKeywords[word];
            }
        });
        
        // Check for spam patterns
        this.spamPatterns.forEach(pattern => {
            const matches = text.match(pattern);
            if (matches) {
                spamScore += matches.length * 0.3;
            }
        });
        
        // Normalize by word count
        if (wordCount > 0) {
            spamScore = spamScore / Math.sqrt(wordCount);
        }
        
        // Additional heuristics
        if (text.length < 10) spamScore -= 0.2; // Very short messages less likely to be spam
        if (text.match(/\d{10,}/)) spamScore += 0.3; // Long numbers (like phone numbers in spam)
        if (text.match(/[A-Z]{3,}/)) spamScore += 0.2; // ALL CAPS words
        if ((text.match(/!/g) || []).length > 2) spamScore += 0.3; // Multiple exclamation marks
        
        return spamScore;
    }

    predict(text) {
        if (!text || text.trim().length === 0) {
            return { prediction: 'ham', confidence: 0, score: 0 };
        }

        const score = this.calculateSpamScore(text);
        
        // Threshold for spam classification (tuned based on the original model)
        const threshold = 0.5;
        const prediction = score > threshold ? 'spam' : 'ham';
        
        // Calculate confidence (convert score to probability-like value)
        let confidence = Math.abs(score);
        confidence = Math.min(confidence, 1.0); // Cap at 1.0
        confidence = Math.max(confidence, 0.1); // Minimum confidence
        
        return {
            prediction: prediction,
            confidence: Math.round(confidence * 100),
            score: Math.round(score * 100) / 100
        };
    }
}

// Initialize the spam detector
const detector = new SpamDetector();

// Form handling
document.getElementById('spamForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const messageText = document.getElementById('messageText').value;
    const resultDiv = document.getElementById('result');
    
    if (!messageText.trim()) {
        alert('Please enter a message to analyze.');
        return;
    }
    
    // Show loading state
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div class="result-box" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <i class="fas fa-spinner fa-spin"></i> Analyzing message...
        </div>
    `;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        const result = detector.predict(messageText);
        
        let resultClass = result.prediction === 'spam' ? 'spam-result' : 'ham-result';
        let icon = result.prediction === 'spam' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
        let message = result.prediction === 'spam' ? 'SPAM DETECTED' : 'LEGITIMATE MESSAGE';
        let description = result.prediction === 'spam' ? 
            'This message appears to be spam. Be cautious of suspicious links or requests.' : 
            'This message appears to be legitimate and safe.';
        
        resultDiv.innerHTML = `
            <div class="result-box ${resultClass}">
                <i class="${icon} fa-2x mb-2"></i>
                <div>${message}</div>
                <small class="d-block mt-2">${description}</small>
                <small class="d-block mt-1">Confidence: ${result.confidence}%</small>
            </div>
        `;
        
        // Add some animation
        resultDiv.querySelector('.result-box').style.transform = 'scale(0.9)';
        setTimeout(() => {
            resultDiv.querySelector('.result-box').style.transform = 'scale(1)';
            resultDiv.querySelector('.result-box').style.transition = 'transform 0.3s ease';
        }, 100);
        
    }, 1000);
});

// Example messages for testing
const examples = [
    "Free entry in 2 a wkly comp to win FA Cup final tkts. Text FA to 87121",
    "Hey, are we still meeting for lunch tomorrow?",
    "URGENT! You've won $10,000! Call now to claim your prize!",
    "Thanks for dinner last night. Had a great time!",
    "Congratulations! You have been selected to receive a cash prize of $5000!"
];

// Add example button functionality
function loadExample() {
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    document.getElementById('messageText').value = randomExample;
}

// Add example button to the page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('spamForm');
    const exampleBtn = document.createElement('button');
    exampleBtn.type = 'button';
    exampleBtn.className = 'btn btn-outline-secondary btn-sm mt-2';
    exampleBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Try Example';
    exampleBtn.onclick = loadExample;
    
    form.appendChild(exampleBtn);
});
