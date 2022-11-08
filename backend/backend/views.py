from django.http import HttpResponse

def index(request):
    return httpResponse("This is the root page!!")