import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import json

from django.views.decorators.csrf import csrf_exempt
from .user import authenticate_token
from users.repositories.Product_repository import ProductRepository
from ..services.Product_service import ProductService
from django.forms.models import model_to_dict
def get_all_product(request):
    query_result = ProductService.get_all_product()
    if query_result:
        # Chuyển đổi queryset thành danh sách dict
        products_list = list(query_result.values())
        try:
            # Trả về dữ liệu dưới dạng JSON
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
def get_all_color(request):
    query_result = ProductRepository.get_all_color()
    if query_result:
        # Chuyển đổi queryset thành danh sách dict
        products_list = list(query_result.values())
        try:
            # Trả về dữ liệu dưới dạng JSON
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
def get_all_sizet(request):
    query_result = ProductRepository.get_all_size()
    if query_result:
        products_list = list(query_result.values())
        try:
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
def get_all_product_image_by_id(request,product_id):
    query_result = ProductRepository.get_all_product_image_by_id(product_id)
    if query_result:
        # Chuyển đổi queryset thành danh sách dict
        products_list = list(query_result.values())
        try:
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
@csrf_exempt
def add_to_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            variant_id = data.get("variant_id")
            username = data.get("username")
            quantity = data.get("quantity")
            query_result = ProductRepository.add_product_to_cart(variant_id,username,quantity)
            if query_result:  # Nếu có kết quả trả về
                return JsonResponse(query_result, status=200)
            else:  # Nếu không có kết quả trả về
                return JsonResponse({"error": "Failed to add product to cart"}, status=500)            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def get_variant_id(request):
    if request.method == "GET":
        try:
            product_id = request.GET.get('product_id')
            color_id = request.GET.get('color_id')
            size_id = request.GET.get('size_id')
            if not product_id or not color_id or not size_id:
                return JsonResponse({"error": "Missing required parameters"}, status=400)
            variant = ProductRepository.get_variant_id(product_id,color_id,size_id)
            if variant:
                print(variant)
                return JsonResponse(variant, status=200)
            else:
                return JsonResponse({"error": "Variant not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
@csrf_exempt
def get_sizes_and_colors(request):
    if request.method == "GET":
        try:
            product_id = request.GET.get('product_id')
            if not product_id :
                return JsonResponse({"error": "Missing required parameters"}, status=400)
            variant = ProductRepository.get_sizes_and_colors(product_id)
            if variant:
                return JsonResponse(variant, status=200)
            else:
                return JsonResponse({"error": "Variant not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)