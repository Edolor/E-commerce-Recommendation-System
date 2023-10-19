import pickle
from django.db import models
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class SimilarityModel(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    date_retrained = models.DateTimeField(auto_now=True, editable=True)
    tfidf_matrix = models.BinaryField()
    cosine_sim = models.BinaryField()

    # Extracting whitespaces
    def clean_text(self, value):
        result = str(value).lower()
        return result.replace(" ", '')

    def save_similarity_data(self, df):
        # Create a TF-IDF vectorizer
        tfidf = TfidfVectorizer(stop_words='english')

        df["name"] = df["name"].str.lower()
        df["description"] = df["description"].str.lower()

        # Compute the TF-IDF matrix
        tfidf_matrix = tfidf.fit_transform(df[["name", "description"]].apply(
            lambda x: ' '.join(x.dropna().astype(str)), axis=1))

        # Compute the cosine similarity matrix
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # Serialize the matrices
        tfidf_matrix_data = pickle.dumps(tfidf_matrix)
        cosine_sim_data = pickle.dumps(cosine_sim)

        # Save the data to the model instance
        self.tfidf_matrix = tfidf_matrix_data
        self.cosine_sim = cosine_sim_data
        self.save()

    def get_similarity_matrices(self):
        # Load the serialized matrices
        tfidf_matrix = pickle.loads(self.tfidf_matrix)
        cosine_sim = pickle.loads(self.cosine_sim)

        return tfidf_matrix, cosine_sim

    def __str__(self):
        return self.name
