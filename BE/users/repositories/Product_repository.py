import logging
from ..utils.db import execute_query
import logging
from users.models import Product,Image,Color,Size,Cart,ProductVariant
from django.db import transaction
from django.db import connection
class ProductRepository:
    @staticmethod
    def get_all_product():
        try:
            accounts = Product.objects.all()
            return accounts
        except Product.DoesNotExist:
            return None
    @staticmethod
    def get_all_product_image_by_id(product_id):
        try:
            images = Image.objects.filter(product_id=product_id)
            return images
        except Product.DoesNotExist:
            return None
    @staticmethod
    def get_all_color():
        try:
            color = Color.objects.all()
            return color
        except Product.DoesNotExist:
            return None
    @staticmethod
    def get_all_size():
        try:
            size = Size.objects.filter()
            return size
        except Product.DoesNotExist:
            return None
    @staticmethod
    def get_all_size():
        try:
            size = Size.objects.filter()
            return size
        except Product.DoesNotExist:
            return None
        
    @staticmethod
    @transaction.atomic()
    def add_product_to_cart(cart_id, username,product_id, size=None, color=None, quantity=1):
        try:
            # Nếu không có size và color, lấy variant bất kỳ của product_id
            if not size and not color:
                variant = ProductVariant.objects.filter(product_id=product_id).first()  # Lấy variant đầu tiên của product_id
            else:
                print(product_id,size,color)
                variant = ProductVariant.objects.filter(product_id=product_id, size=size, color=color).first()

            # Kiểm tra nếu không tìm thấy variant
            if not variant:
                return {'message': 'Variant not found for the given product, size, and color'}

            existing_cart_item = Cart.objects.filter(cart_id=cart_id).first()
            
            if existing_cart_item:
                # Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
                existing_cart_item.quantity += quantity
                existing_cart_item.save()
                return {'message': 'Product quantity updated in the cart successfully'}
            else:
                # Nếu sản phẩm chưa có trong giỏ, tạo mới
                new_cart = Cart.objects.create(
                    username=username,
                    variant_id=variant.variant_id,
                    quantity=quantity,
                )
                new_cart.save()
                return {'message': 'Product added to cart successfully'}

        except ProductVariant.DoesNotExist:
            return {'message': 'Product variant does not exist'}
        except Exception as e:
            return {'message': f'An error occurred: {str(e)}'}


    @staticmethod
    def get_variant_id(product_id, color_id, size_id):
        try:
            variant = ProductVariant.objects.filter(
                product_id = product_id,
                color_id = color_id,
                size_id = size_id
            ).first()
            if variant:
                return {
                    'variant_id': variant.variant_id,
                    'quantity': variant.quantity
                }
            else:
                return {'message': 'Variant not found'}
        except Exception as e:
            return {'message': f'An error occurred: {str(e)}'}
   
    @staticmethod
    def get_sizes_and_colors(product_id):
        try:
            variants = ProductVariant.objects.filter(product_id=product_id).select_related('size', 'color')
            if variants.exists():
                # Loại bỏ trùng lặp cho sizes
                sizes = { (variant.size.size_id, variant.size.size_name) for variant in variants }
                sizes = [{'id': size[0], 'name': size[1]} for size in sizes]

                # Loại bỏ trùng lặp cho colors
                colors = { (variant.color.color_id, variant.color.color_name) for variant in variants }
                colors = [{'id': color[0], 'name': color[1]} for color in colors]

                return {
                    'sizes': sizes,
                    'colors': colors,
                }
            return {'message': 'No variants found for the given product_id'}
        except Exception as e:
            return {'message': f'An error occurred: {str(e)}'}


    @staticmethod
    def get_cart_quantity(username):
        try:
            cart_items = Cart.objects.filter(username=username)
            
            total_quantity = sum(item.quantity for item in cart_items)
            
            return total_quantity
        except Exception as e:
            return {'message': f'An error occurred: {str(e)}'}
    @staticmethod
    def get_cart_details(username):
        try:
            cart_items = Cart.objects.filter(username=username)
            
            if cart_items.exists():
                unique_products = cart_items.values('variant_id').distinct()
                product_count = unique_products.count()
                cart_details = []
                for item in cart_items:
                    product_variant = ProductVariant.objects.get(variant_id=item.variant_id)
                    product = product_variant.product  # Lấy thông tin sản phẩm từ ProductVariant
                    cart_details.append({
                        'cart_id': item.cart_id,
                        'product_id': product.product_id,
                        'product_name': product.product_name,
                        'variant_id': item.variant_id,
                        'quantity': item.quantity,
                        'price': product.price,
                        'color': product_variant.color.color_name if product_variant.color else None,
                        'color_id': product_variant.color.color_id if product_variant.color else None,
                        'image':product.imageSP,
                        'size': product_variant.size.size_name if product_variant.size else None,
                        'size_id': product_variant.size.size_id if product_variant.size else None,
                    })
                return {
                    'total_quantity': product_count,
                    'cart_items': cart_details,
                }
            else:
                return {'message': 'No items found in cart'}
        except Exception as e:
            return {'message': f'An error occurred: {str(e)}'}
