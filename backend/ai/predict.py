# backend/ai/predict.py
import joblib
import sys

clf = joblib.load('ai/model.pkl')

query = sys.argv[1]
data = [float(x) for x in query.split(',')]
prediction = clf.predict([data])

print(prediction[0])
