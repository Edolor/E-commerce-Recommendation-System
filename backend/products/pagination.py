from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 3
    page_query_param = "page"
    page_size_query_param = "size"
    max_page_size = 15