from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import HealthCheck

urlpatterns = [
    path('', HealthCheck.as_view(), name="health-check"),
    path('admin/', admin.site.urls),
    path('account/', include("accounts.urls")),
    path('products/', include("products.urls")),
    path('contact/', include("contact.urls")),
    path('order/', include("order.urls")),
]

if settings.DEBUG == True:
    urlpatterns += static(settings.MEDIA_URL,
           document_root=settings.MEDIA_ROOT)