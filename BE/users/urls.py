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
    path('get_variant_id/', Product.get_variant_id, name='get_variant_id'),
    # path('new-Product/', Product.tao_bai_viet, name='tao_bai_viet'),
    # path('update-Product/', Product.sua_bai_viet, name='sua_bai_viet'),
   
    # path('delete-Product/<int:id>/', Product.xoa_bai_viet, name='xoa_bai_viet'),
    # path('Product-id/<int:id>/', Product.get_Product_by_id, name='get_Product_by_id'),
    # path('Product-like/<int:iduser>/', Product.get_all_bai_viet_like, name='get_all_bai_viet_like'),
    # path('Product/<int:iduser>/', Product.get_all_bai_viet_by_manguoidung, name='get_all_bai_viet_by_manguoidung'),
    

    # path('like-Product/', Product.them_yeu_thich, name='them_yeu_thich'),
    # path('islike-Product/', Product.kiem_tra_yeu_thich, name='them_yeu_thich'),
    # path('get-like-Product/<int:iduser>/', Product.lay_list_yeu_thich, name='lay_list_yeu_thich'),
    # path('remove-like-Product/', Product.xoa_yeu_thich, name='them_yeu_thich'),
]
