# backend/ai/model.py
from sklearn.ensemble import RandomForestClassifier

class MyModel:
    def __init__(self):
        self.clf = RandomForestClassifier(n_estimators=100)

    def fit(self, X, y):
        self.clf.fit(X, y)

    def predict(self, X):
        return self.clf.predict(X)
