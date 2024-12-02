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
