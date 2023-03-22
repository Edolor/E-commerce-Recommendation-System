from django.contrib import admin
from .models import Product, Image, Category


class ImageInline(admin.TabularInline):
    model = Image
    extra = 2


class ProductAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["name", "price", "category", "description", "total_quantity"]})
    ]
    inlines = [ImageInline]


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
