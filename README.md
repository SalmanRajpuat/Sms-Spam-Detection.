# SMS Spam Detection Project 📧

A machine learning-based SMS spam classifier that uses Natural Language Processing (NLP) techniques to identify whether a text message is spam or legitimate (ham). The project includes a complete data science pipeline from data preprocessing to model deployment with a user-friendly Streamlit web interface.

## Project Overview

This project implements a supervised machine learning solution to classify SMS messages as spam or ham (legitimate messages). It uses various NLP techniques including text preprocessing, feature extraction with TF-IDF, and multiple machine learning algorithms to achieve high accuracy in spam detection.

## ✨ Features

- **Text Preprocessing**: Lowercasing, tokenization, stopword removal, and stemming
- **Feature Engineering**: TF-IDF vectorization for text representation
- **Multiple ML Models**: Naive Bayes, SVM, Random Forest, and ensemble methods
- **Model Comparison**: Performance evaluation across different algorithms
- **Web Interface**: Interactive Streamlit app for real-time predictions
- **Data Visualization**: EDA with charts and graphs for insights

## Technologies Used

- **Python 3.11+**
- **Machine Learning**: Scikit-learn
- **NLP**: NLTK
- **Data Analysis**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn
- **Web App**: Streamlit
- **Model Serialization**: Pickle

## Requirements

### Core Dependencies

```
streamlit>=1.27.0
scikit-learn>=1.7.0
nltk>=3.8.0
pandas>=2.0.0
numpy>=1.26.0
matplotlib>=3.7.0
seaborn>=0.12.0
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SalmanRajpuat/Sms-Spam-Detection.git
   cd Sms-Spam-Detection
   ```

2. **Install required packages:**
   ```bash
   pip install streamlit scikit-learn nltk pandas numpy matplotlib seaborn
   ```

3. **Download NLTK data:**
   ```python
   import nltk
   nltk.download('punkt')
   nltk.download('stopwords')
   ```

## Quick Start

### Running the Streamlit App

1. **Navigate to the project directory:**
   ```bash
   cd sms-spam-detection
   ```

2. **Run the Streamlit app:**
   ```bash
   streamlit run app.py
   ```
   or
   ```bash
   python -m streamlit run app.py
   ```

3. **Open your browser and go to:**
   - Local: `http://localhost:8501`
   - Network: `http://your-ip:8501`

### Using the Web Interface

1. Enter your SMS message in the text area
2. Click the "Predict" button
3. View the classification result (Spam or Not Spam)

## 📊 Dataset

The project uses the SMS Spam Collection Dataset containing:
- **5,574 SMS messages**
- **Labels**: spam (747 messages) and ham (4,827 messages)
- **Features**: Text content of SMS messages
- **Source**: UCI Machine Learning Repository

## 🔬 Model Pipeline

### 1. Data Preprocessing
- **Text Cleaning**: Remove special characters, convert to lowercase
- **Tokenization**: Split text into individual words
- **Stopword Removal**: Remove common English stopwords
- **Stemming**: Reduce words to their root form using Porter Stemmer

### 2. Feature Engineering
- **TF-IDF Vectorization**: Convert text to numerical features
- **Feature Selection**: Top 3000 features selected
- **Data Splitting**: 80% training, 20% testing

### 3. Model Training
Multiple algorithms tested:
- **Naive Bayes** (MultinomialNB, GaussianNB, BernoulliNB)
- **Support Vector Machine** (SVM)
- **Random Forest**
- **Logistic Regression**
- **Ensemble Methods** (Voting, Stacking)

### 4. Model Evaluation
- **Accuracy Score**
- **Precision Score**
- **Confusion Matrix**
- **Cross-validation**

## 📁 Project Structure

```
sms-spam-detection/
│
├── app.py                      # Streamlit web application
├── sms-spam-detection.ipynb    # Jupyter notebook with full analysis
├── spam.csv                    # Dataset file
├── model.pkl                   # Trained model (pickle file)
├── vectorizer.pkl              # TF-IDF vectorizer (pickle file)
├── README.md                   # Project documentation
└── requirements.txt            # Dependencies (if created)
```

## 🎯 Model Performance

The best performing model achieves:
- **Accuracy**: ~97%
- **Precision**: ~95%
- **Model**: Multinomial Naive Bayes with TF-IDF features

## 🔧 Customization

### Adding New Features
You can enhance the model by:
- Adding message length features
- Including word count features
- Implementing advanced NLP techniques (word embeddings)
- Using deep learning models (LSTM, BERT)

### Modifying Preprocessing
Edit the `transform_text()` function in `app.py` to:
- Change stemming algorithms
- Add lemmatization
- Include n-grams
- Adjust stopword lists

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Salman Ahmad Rajput**
- GitHub: [@SalmanRajpuat](https://github.com/SalmanRajpuat)
- LinkedIn: [Salman Ahmad](https://www.linkedin.com/in/salman-ahmad-425331175/)
- Email: salmanwzb@gmail.com

## 🙏 Acknowledgments

- UCI Machine Learning Repository for the SMS Spam Collection Dataset
- Scikit-learn community for machine learning tools
- Streamlit team for the amazing web framework
- NLTK contributors for natural language processing tools

## Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/SalmanRajpuat/Sms-Spam-Detection/issues) page
2. Create a new issue with detailed description
3. Contact the author via email or LinkedIn

---

**Happy Coding!🚀**
