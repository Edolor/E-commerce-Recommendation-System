from rest_framework.response import Response
from django.http import HttpResponse

def product_list(request):
    return HttpResponse("All products here")