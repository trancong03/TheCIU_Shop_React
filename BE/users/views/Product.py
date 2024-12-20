import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import json
from users.models import Product,Account,Color,Size,Cart,ProductVariant,FavoriteProduct
from django.views.decorators.csrf import csrf_exempt
from .user import authenticate_token
from users.repositories.Product_repository import ProductRepository
from ..services.Product_service import ProductService
from django.forms.models import model_to_dict
def get_all_product(request):
    query_result = ProductService.get_all_product()
    if query_result:
        products_list = list(query_result.values())
        try:
            return JsonResponse(products_list, safe=False)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Failed to decode JSON"}, status=500)
    return JsonResponse({"error": "No data found or invalid structure"}, status=404)
def get_cart_quantity(request,username):
    query_result = ProductRepository.get_cart_details(username)
    if query_result:
        try:
             return JsonResponse({"data":query_result}, status=200)
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
            username = data.get("username")
            product_id = data.get("product_id")
            size = data.get("size")
            color = data.get("color")
            quantity = data.get("quantity")
            query_result = ProductRepository.add_product_to_cart(username,product_id,size,color,quantity)
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
def update_cart(request):
    if request.method == "POST":
        try:
            # Lấy dữ liệu từ request
            data = json.loads(request.body)
            cart_id = data.get("cart_id")
            product_id = data.get("product_id")
            size = data.get("size")
            color = data.get("color")
            quantity = data.get("quantity")

            # Kiểm tra nếu các tham số bắt buộc không có hoặc không hợp lệ
            if not cart_id or not product_id or not size or not color or quantity is None or quantity <= 0:
                return JsonResponse({"error": "cart_id, product_id, size, color, and valid quantity are required"}, status=400)

            # Tìm Cart item từ cart_id
            cart_item = Cart.objects.filter(cart_id=cart_id).first()
            if not cart_item:
                return JsonResponse({"error": "Cart item not found"}, status=404)

            # Tìm ProductVariant bằng product_id, size và color
            product_variant = ProductVariant.objects.filter(
                product_id=product_id,
                size=size,
                color=color
            ).first()

            if not product_variant:
                return JsonResponse({"error": "Product variant not found"}, status=404)

            # Cập nhật variant_id và quantity
            cart_item.product_variant = product_variant  # Cập nhật variant_id (size, color)
            cart_item.quantity = quantity  # Cập nhật số lượng
            cart_item.save()

            return JsonResponse({"message": "Cart updated successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def delete_cart_item(request):
    if request.method == "DELETE":
        try:
            # Lấy dữ liệu từ body request
            data = json.loads(request.body)
            cart_id = data.get("cart_id")

            # Tìm cart item theo cart_id và variant_id
            cart_item = Cart.objects.filter(cart_id=cart_id).first()

            if not cart_item:
                return JsonResponse({"error": "Cart item not found"}, status=404)
            # Xóa sản phẩm khỏi giỏ hàng
            cart_item.delete()
            return JsonResponse({"message": "Cart item deleted successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

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

@csrf_exempt
def get_favorite_products(request, username):
    try:
        # Lấy tất cả các đối tượng FavoriteProduct của người dùng
        favorite_products = FavoriteProduct.objects.filter(username=username)

        # Kiểm tra nếu không có sản phẩm yêu thích nào
        if not favorite_products.exists():
            return JsonResponse({"data": []}, status=200)  # Trả về danh sách rỗng nếu không có sản phẩm yêu thích

        # Tạo danh sách chứa các sản phẩm yêu thích
        products_list = []
        for favorite in favorite_products:
            product_id = favorite.product_id  # Truy cập sản phẩm yêu thích qua trường product
            if product_id:  # Kiểm tra nếu sản phẩm tồn tại
                try:
                    # Lấy thông tin sản phẩm
                    product = Product.objects.get(product_id=product_id)
                    # Chuyển đối tượng Product thành dictionary chứa tất cả các thuộc tính
                    product_data = model_to_dict(product)
                    products_list.append(product_data)
                except Product.DoesNotExist:
                    # Nếu sản phẩm không tồn tại, bỏ qua
                    continue

        return JsonResponse({"data": products_list}, safe=False, status=200)

    except Exception as e:
        # Xử lý lỗi chung
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

@csrf_exempt
def toggle_favorite(request, username, product_id):
    try:
        # Kiểm tra xem sản phẩm có tồn tại không
        favorite = FavoriteProduct.objects.filter(username=username, product_id=product_id)

        if favorite.exists():
            # Nếu sản phẩm đã có trong danh sách yêu thích, xóa nó
            favorite.delete()
            return JsonResponse({"message": "Product removed from favorites."}, status=200)
        else:
            # Nếu sản phẩm chưa có trong danh sách yêu thích, thêm nó
            FavoriteProduct.objects.create(username=username, product_id=product_id)
            return JsonResponse({"message": "Product added to favorites."}, status=200)

    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found."}, status=404)
    except Exception as e:
        # Xử lý lỗi chung
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
