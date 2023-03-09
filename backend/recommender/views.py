from .models import SimilarityModel
from django_pandas.io import read_frame
from products.models import Product
from django.http import HttpResponse, JsonResponse


def train_model_init():
    """
    Creates the 'product_similarity' record in the database, trains the model and saves it in the database. 
    This is done if one does not already exist in the database.
    """
    if Product.objects.all().count() > 0:
        message = ""
        if SimilarityModel.objects.filter(name='product_similarity').exists() == False:
            qs = Product.objects.all()
            df = read_frame(qs, fieldnames=['id', 'name', 'description'])

            similarity_model = SimilarityModel(name='product_similarity')

            # Compute and save the similarity data
            similarity_model.save_similarity_data(df)
            message = "Training complete."
        else:
            message = "Already trained."

        return message

# Define a function to get the top n similar products


def get_similar_products(pk, n=3):
    """
    Gets similar products to a product when given the UUID of a product.
    Loads up the saved pickle model and uses it determine product similarity.
    Returns a list containing product id's
    """
    product_queryset = Product.objects.filter(id=pk)
    result = ""
    if product_queryset.exists():
        product_queryset = product_queryset.values()
        # Fetch similarity model
        similarity_model = SimilarityModel.objects.get(
            name='product_similarity')
        tfidf_matrix, cosine_sim = similarity_model.get_similarity_matrices()

        # Read all products
        qs = Product.objects.all()
        df = read_frame(qs, fieldnames=['id', 'name', 'description'])

        # Get the index of the product
        index = df[df['id'] == product_queryset[0]["id"]].index[0]

        # Get the cosine similarity scores for the product
        sim_scores = list(enumerate(cosine_sim[index]))

        # Sort the products by similarity score, in descending order
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the top n similar products
        sim_scores = sim_scores[1:n+1]

        # Get the indices and similarity scores of the similar products
        indices = [i[0] for i in sim_scores]
        scores = [i[1] for i in sim_scores]

        # Return a dataframe with the similar products
        similar_products = df.loc[indices, ['id', 'name', 'description']]
        similar_products['score'] = scores

        # Extract product ids
        products = similar_products["id"]
        products = products.tolist()

        result = products
    else:
        result = []

    return result
