# MovieMood — AI Movie Review Sentiment Analyzer

**MovieMood** is a beginner-friendly web application that uses artificial intelligence to analyze the sentiment of movie reviews. Simply paste or type a movie review, and the app will predict whether the sentiment is **POSITIVE** or **NEGATIVE** with a confidence percentage.

## Features

- 🎬 Clean, modern, responsive interface
- 🤖 AI-powered sentiment analysis using DistilBERT
- 📱 Works on desktop and mobile devices
- ⚡ Fast predictions (model loaded once at startup)
- 💾 No database required — runs locally
- 🧪 Example reviews to try out
- ✅ Input validation and error handling
- 📊 Confidence score visualization

## Technology Stack

- **Backend:** Python Flask
- **AI Model:** Hugging Face Transformers (DistilBERT fine-tuned for sentiment)
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Model:** `yashaswinii2/my-first-distilbert-sentiment`

## Setup & Installation (Windows)

### Step 1: Install Python Dependencies

Open PowerShell in the project folder and run:

```powershell
pip install -r requirements.txt
```

This installs:
- **Flask** — lightweight web server
- **transformers** — Hugging Face library for loading the model
- **torch** — deep learning framework (required by transformers)

### Step 2: Run the Application

```powershell
python app.py
```

The server will start on `http://localhost:5000`.

### Step 3: Open in Browser

Open your web browser and navigate to:

```
http://localhost:5000
```

## How It Works

1. **User Input:** You paste or type a movie review in the text area.
2. **Validation:** The app checks that the review is not empty and meets minimum length.
3. **API Call:** Your review is sent to the Flask backend via POST request.
4. **Model Prediction:** The DistilBERT model predicts the sentiment (POSITIVE or NEGATIVE) and confidence score.
5. **Display Result:** The app shows the prediction with a visual confidence bar.

## Code Overview

### `app.py` (Backend)
- Loads the sentiment model once when Flask starts (efficient).
- Provides `/` route for the HTML frontend.
- Provides `/analyze` POST endpoint that processes reviews.
- Handles validation and error responses gracefully.

### `templates/index.html` (Frontend Structure)
- Hero section with app title and explanation.
- Example buttons to try sample reviews.
- Large text area for user input.
- Loading indicator while analyzing.
- Result display card with sentiment and confidence.

### `static/style.css` (Styling)
- Dark theme with purple accent colors.
- Fully responsive grid and flexbox layout.
- Smooth animations and transitions.
- Mobile-friendly design.

### `static/script.js` (Frontend Logic)
- Handles button clicks and keyboard events.
- Sends review to backend via fetch API.
- Displays results and error messages.
- Updates UI without page reload.

## Important Notes

### Model Accuracy
This model was fine-tuned on a specific dataset. Its accuracy depends on:
- How similar your review is to the training data
- The context and nuance of your review
- Language patterns the model learned

**Not all predictions will be 100% accurate.** Always interpret results as predictions, not facts.

### First Load
The first time you run the app, it will download the model from Hugging Face (~300 MB). This may take a few minutes. Subsequent runs will use the cached model.

### Internet Required
You need an internet connection to download the model the first time. After that, the app can run without internet (predictions are local).

## Stopping the Server

Press `Ctrl+C` in PowerShell to stop the Flask server.

## Troubleshooting

**"ModuleNotFoundError: No module named 'flask'"**
→ Run `pip install -r requirements.txt`

**"Connection refused" or "Cannot connect to localhost:5000"**
→ Make sure `python app.py` is still running in PowerShell

**"Model download is slow"**
→ The first download takes time. Subsequent runs are instant.

**"CUDA/GPU not available"**
→ The model will automatically fall back to CPU. Predictions will be slower but still accurate.

## Files & Folder Structure

```
MovieMood/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── templates/
│   └── index.html         # Frontend HTML
└── static/
    ├── style.css          # Styling
    └── script.js          # Frontend logic
```

## License & Attribution

- Model: [yashaswinii2/my-first-distilbert-sentiment](https://huggingface.co/yashaswinii2/my-first-distilbert-sentiment) on Hugging Face
- Framework: Flask
- Transformer: DistilBERT from Hugging Face

## Future Improvements (Optional)

- Add ability to upload multiple reviews
- Save analysis history
- Support for other languages
- Custom model training UI
- Dark/light theme toggle

---

**Enjoy analyzing movie reviews with MovieMood! 🎬✨**
