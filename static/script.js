// DOM Elements
const reviewTextarea = document.getElementById('review');
const analyzeBtn = document.getElementById('analyze-btn');
const clearBtn = document.getElementById('clear-btn');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');
const resultCard = document.getElementById('result-card');
const sentimentBadge = document.getElementById('sentiment-badge');
const confidenceBar = document.getElementById('confidence-bar');
const confidencePct = document.getElementById('confidence-pct');
const charCount = document.getElementById('char-count');
const exampleBtns = document.querySelectorAll('.example-btn');

// Character counter
reviewTextarea.addEventListener('input', () => {
  const count = reviewTextarea.value.length;
  charCount.textContent = count;

  // Hide error when user starts typing
  if (errorMsg.classList.contains('visible')) {
    hideError();
  }
});

// Example review buttons
exampleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const review = btn.dataset.review;
    reviewTextarea.value = review;
    charCount.textContent = review.length;

    // Hide any previous result
    hideResult();

    // Focus textarea
    reviewTextarea.focus();
  });
});

// Analyze button click
analyzeBtn.addEventListener('click', analyzeSentiment);

// Enter key to analyze (Ctrl+Enter or just Enter)
reviewTextarea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    analyzeSentiment();
  }
});

// Clear button
clearBtn.addEventListener('click', () => {
  reviewTextarea.value = '';
  charCount.textContent = '0';
  hideError();
  hideResult();
  reviewTextarea.focus();
});

async function analyzeSentiment() {
  const review = reviewTextarea.value.trim();

  // Clear previous errors
  hideError();

  // Client-side validation
  if (!review) {
    showError('Please enter a movie review to analyze.');
    return;
  }

  if (review.length < 3) {
    showError('Review is too short. Please enter at least 3 characters.');
    return;
  }

  // Disable button and show loading
  analyzeBtn.disabled = true;
  loading.classList.remove('hidden');
  hideResult();

  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ review: review })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    // Display result
    displayResult(data);

  } catch (error) {
    showError(error.message || 'Failed to analyze. Please try again.');
  } finally {
    analyzeBtn.disabled = false;
    loading.classList.add('hidden');
  }
}

function displayResult(data) {
  const { sentiment, confidence } = data;

  // Set badge
  sentimentBadge.textContent = sentiment;
  sentimentBadge.className = 'sentiment-badge';

  if (sentiment === 'POSITIVE') {
    sentimentBadge.classList.add('positive');
    confidenceBar.className = 'confidence-bar positive';
  } else {
    sentimentBadge.classList.add('negative');
    confidenceBar.className = 'confidence-bar negative';
  }

  // Set confidence bar width and text
  confidenceBar.style.width = `${confidence}%`;
  confidencePct.textContent = `${confidence.toFixed(1)}%`;

  // Show result card
  resultCard.classList.remove('hidden');

  // Scroll to result on mobile
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add('visible');
}

function hideError() {
  errorMsg.textContent = '';
  errorMsg.classList.remove('visible');
}

function hideResult() {
  resultCard.classList.add('hidden');
}