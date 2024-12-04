import logging
from ..utils.db import execute_query
import logging
from users.models import Product,Image,Color,Size,Cart,ProductVariant

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
    def add_product_to_cart(variant_id, username, quantity):
        try:
            existing_cart_item = Cart.objects.filter(username=username, variant_id=variant_id).first()
            if existing_cart_item:
                existing_cart_item.quantity += quantity
                existing_cart_item.save()
                return {'message': 'Product quantity updated in the cart successfully'}
            else:
                new_cart = Cart.objects.create(
                    username=username,
                    variant_id=variant_id,
                    quantity=quantity
                )
                new_cart.save()
                return {'message': 'Product added to cart successfully'}
        except ProductVariant.DoesNotExist:
            return {'message': 'Product does not exist'}
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


