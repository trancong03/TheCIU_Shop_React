from django.urls import path
from users.views import user , Product
from . import views1
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', user.login, name='login'),
    path('register/', user.register, name='register'),
    path('users/<str:username>/', user.update_user, name='update_user'),
    path('update-images/', user.update_user_images, name='update_user_images'),
    path('reset-password/', user.reset_password, name='reset_password'),
    path('reset-password-forgot/', user.reset_password_forgot, name='reset_password_forgot'),
    path('forgot-password/', user.forgot_password, name='forgot_password'),  
    path('verify-otp/', user.verify_otp, name='verify_otp'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('scan-cccd/', views1.scan_cccd, name='scan_cccd'),
    path('user/<str:username>/', user.get_user, name='get_user'),


    path('product/', Product.get_all_product, name='get_all_product'),
    path('color/', Product.get_all_color, name='get_all_color'),
    path('size/', Product.get_all_sizet, name='get_all_sizet'),
    path('product/<int:product_id>/', Product.get_all_product_image_by_id, name='get_all_product_image_by_id'),
    path('add_to_cart/', Product.add_to_cart, name='add_to_cart'),
    path('update_cart/', Product.update_cart, name='update_cart'),
    path('get_variant_id/', Product.get_variant_id, name='get_variant_id'),
    path('get_sizes_and_colors/', Product.get_sizes_and_colors, name='get_sizes_and_colors'),
    path('get_cart_quantity/<str:username>/', Product.get_cart_quantity, name='get_sizes_and_colors'),
    path('delete-cart-item/', Product.delete_cart_item, name='delete_cart_item'),
    path('toggle-favorite/<str:username>/<int:product_id>/', Product.toggle_favorite, name='toggle_favorite'),
    path('favorite-products/<str:username>/', Product.get_favorite_products, name='get_favorite_products'),
]
