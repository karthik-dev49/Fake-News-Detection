from flask import Blueprint, request , jsonify
import re
import os
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from joblib import load
from flask_cors import CORS

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words("english"))


predict_route = Blueprint('predict_route', __name__)
CORS(predict_route)
models_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'model_01','trained_models'))
model_path = os.path.join(models_dir, 'fnd.joblib')
tfidf_path = os.path.join(models_dir, 'tfidf_vocab.joblib')
model = load(open(model_path, 'rb'))
tfidf = load(open(tfidf_path, 'rb'))

@predict_route.route('/predict1', methods=['POST'])
def predict():
    news = request.json.get('news')
    news = news.lower()
    news = re.sub('[^a-zA-Z]', ' ', news)
    news = ' '.join([word for word in nltk.word_tokenize(news) if word not in set(stop_words)])
    news = ' '.join([lemmatizer.lemmatize(word) for word in nltk.word_tokenize(news)])
    corpus = [news]
    X_input = tfidf.transform(corpus)
    y_pred = model.predict(X_input)
    if y_pred == 0:
        prediction = "Fake"
    else:
        prediction = "Real"
    return jsonify({'prediction': prediction, 'status': 200})