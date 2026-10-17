from flask import Flask, render_template, request, jsonify
from transformers import pipeline
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the model once when the app starts
try:
    logger.info("Loading sentiment analysis model...")
    sentiment_pipeline = pipeline(
        "sentiment-analysis",
        model="yashaswinii2/my-first-distilbert-sentiment"
    )
    logger.info("Model loaded successfully!")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    sentiment_pipeline = None


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    # Check if model is loaded
    if sentiment_pipeline is None:
        return jsonify({
            'error': 'Model is not available. Please check the server logs.'
        }), 500

    # Get the review from the request
    data = request.get_json()

    if not data or 'review' not in data:
        return jsonify({'error': 'No review provided.'}), 400

    review = data['review'].strip()

    # Validate empty review
    if not review:
        return jsonify({'error': 'Please enter a movie review to analyze.'}), 400

    # Validate minimum length
    if len(review) < 3:
        return jsonify({'error': 'Review is too short. Please enter at least 3 characters.'}), 400

    try:
        # Run sentiment analysis
        result = sentiment_pipeline(review)[0]

        label = result['label']
        score = result['score']

        return jsonify({
            'sentiment': label,
            'confidence': round(score * 100, 2)
        })

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({
            'error': 'An error occurred while analyzing the review. Please try again.'
        }), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
