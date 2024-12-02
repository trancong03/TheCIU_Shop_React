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
# @csrf_exempt
# def get_Product_by_id(request, id):
#     Product = ProductService.get_Product_by_id(id)
#     Product_dict = model_to_dict(Product)
#     if not Product:
#         return JsonResponse({'error': 'User not found'}, status=404)
#     return  JsonResponse(Product_dict, safe=False, status=200)
# def get_all_bai_viet_like(request,iduser):
#     query_result = ProductService.get_all_bai_viet_like(iduser)
#     if query_result and isinstance(query_result, list):
#         json_data = query_result[0].get('', '')
#         if json_data:
#             try:
#                 parsed_result = json.loads(json_data)
#                 return JsonResponse(parsed_result, safe=False)
#             except json.JSONDecodeError:
#                 return JsonResponse({"error": "Failed to decode JSON"}, status=500)
#     return JsonResponse({"error": "No data found or invalid structure"}, status=404)
# def get_all_bai_viet_by_manguoidung(request,iduser):
#     query_result = ProductService.get_all_bai_viet_by_manguoidung(iduser)
#     if query_result and isinstance(query_result, list):
#         json_data = query_result[0].get('', '')
#         if json_data:
#             try:
#                 parsed_result = json.loads(json_data)
#                 return JsonResponse(parsed_result, safe=False)
#             except json.JSONDecodeError:
#                 return JsonResponse({"error": "Failed to decode JSON"}, status=500)
#     return JsonResponse({"error": "No data found or invalid structure"}, status=404)
# @csrf_exempt
# def tao_bai_viet(request):
#     if request.method == 'Product':
#         try:
#             ma_nguoi_dung = request.Product.get('manguoidung')  # Lấy mã người dùng từ token
#             # Lấy các trường văn bản từ request.Product
#             ma_gd = request.Product.get('magd')
#             tieu_de = request.Product.get('tieuDe')
#             thong_tin_lien_lac = request.Product.get('thongTinLienLac')
#             mo_ta = request.Product.get('moTa')
#             dia_chi_bai_viet = request.Product.get('diaChiBaiViet')
#             hang_xe = request.Product.get('hangXe')
#             loai_xe = request.Product.get('loaiXe')
#             nam_mua = request.Product.get('namMua')
#             dung_tich = request.Product.get('dungTich')
#             so_km_da_di = request.Product.get('soKmDaDi')
#             bao_hanh = request.Product.get('baoHanh')
#             xuat_xu = request.Product.get('xuatXu')
#             tinh_trang_xe = request.Product.get('tinhTrangXe')
#             gia_ban = request.Product.get('giaBan')
#             danh_sach_hinh = request.Product.get('danhSachHinh')  # Đây có thể là chuỗi chứa URL hoặc tên hình ảnh
#             danh_file_sach_hinh = request.FILES.getlist('danhSachFileHinh')
#             if danh_file_sach_hinh:
#                 image_dir = os.path.join(settings.MEDIA_ROOT, 'images')
#                 os.makedirs(image_dir, exist_ok=True)
#                 image_urls = []  
#                 for image in danh_file_sach_hinh:
#                     image_path = os.path.join(image_dir, image.name)
#                     fs = FileSystemStorage(location=image_dir)
#                     fs.save(image.name, image)
#                     image_url = os.path.join(settings.MEDIA_URL, 'images', image.name)
#                     image_urls.append(image_url)
           
#             # Call the service layer to handle the logic
#             result = ProductService.tao_bai_viet(
#                 ma_nguoi_dung, ma_gd, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
#                 hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh,
#                 xuat_xu, tinh_trang_xe, gia_ban, danh_sach_hinh
#             )
#             if result:
#                 return JsonResponse({'message': 'Bài viết và hình ảnh đã được thêm thành công.'}, status=200)
#             else:
#                 return JsonResponse({'error': 'Lỗi khi tạo bài viết.'}, status=500)

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
#         except ValueError as e:
#             return JsonResponse({'error': str(e)}, status=401)
#         except Exception as e:
#             return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
#     else:
#         return JsonResponse({'error': 'Chỉ hỗ trợ phương thức Product.'}, status=405)

# @csrf_exempt
# def sua_bai_viet(request):
#     if request.method == 'Product':
#         try:
#             ma_bai_viet = request.Product.get('maBaiViet') # Mã bài viết cần chỉnh sửa
#             tieu_de = request.Product.get('tieuDe')
#             thong_tin_lien_lac = request.Product.get('thongTinLienLac')
#             mo_ta = request.Product.get('moTa')
#             dia_chi_bai_viet = request.Product.get('diaChiBaiViet')
#             hang_xe = request.Product.get('hangXe')
#             loai_xe = request.Product.get('loaiXe')
#             nam_mua = request.Product.get('namMua')
#             dung_tich = request.Product.get('dungTich')
#             so_km_da_di = request.Product.get('soKmDaDi')
#             bao_hanh = request.Product.get('baoHanh')
#             xuat_xu = request.Product.get('xuatXu')
#             tinh_trang_xe = request.Product.get('tinhTrangXe')
#             gia_ban = request.Product.get('giaBan')
#             danh_sach_hinh = request.Product.get('danhSachHinh')  # Đây có thể là chuỗi chứa URL hoặc tên hình ảnh
#             # Xử lý danh sách tệp hình ảnh (nếu có)
#             danh_file_sach_hinh = request.FILES.getlist('danhSachFileHinh')
#             image_urls = []  # Danh sách chứa URL các hình ảnh mới
#             if danh_file_sach_hinh:
#                 image_dir = os.path.join(settings.MEDIA_ROOT, 'images')
#                 os.makedirs(image_dir, exist_ok=True)
#                 for image in danh_file_sach_hinh:
#                     image_path = os.path.join(image_dir, image.name)
#                     fs = FileSystemStorage(location=image_dir)
#                     fs.save(image.name, image)
#                     image_url = os.path.join(settings.MEDIA_URL, 'images', image.name)
#                     image_urls.append(image_url)

#             # Call the service layer to handle the logic
#             result = ProductService.sua_bai_viet(
#                 ma_bai_viet, tieu_de, thong_tin_lien_lac, mo_ta, dia_chi_bai_viet,
#                 hang_xe, loai_xe, nam_mua, dung_tich, so_km_da_di, bao_hanh, xuat_xu, tinh_trang_xe, gia_ban,
#                 danh_sach_hinh, 
#             )
#             if result:
#                 return JsonResponse({'message': 'Bài viết đã được cập nhật thành công.'}, status=200)
#             else:
#                 return JsonResponse({'error': 'Lỗi khi chỉnh sửa bài viết.'}, status=500)

#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
#         except ValueError as e:
#             return JsonResponse({'error': str(e)}, status=401)
#         except Exception as e:
#             return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
#     else:
#         return JsonResponse({'error': 'Chỉ hỗ trợ phương thức PATCH.'}, status=405)
# @csrf_exempt
# def xoa_bai_viet(request, id):
#     Product = ProductService.xoa_bai_viet(id)
#     if not Product:
#         return JsonResponse({'error': 'Product not found'}, status=404)
#     return  JsonResponse({"message":"delete Product successful"}, status=200)
# @csrf_exempt
# def them_yeu_thich(request):
#     if request.method == 'Product':
#         try:
#             # Lấy dữ liệu từ FormData
#             ma_nguoi_dung = request.Product.get('manguoidung')
#             ma_bai_viet = request.Product.get('maBaiViet')

#             # Kiểm tra tham số bắt buộc
#             if not ma_nguoi_dung or not ma_bai_viet:
#                 return JsonResponse({'error': 'Thiếu mã người dùng hoặc mã bài viết.'}, status=400)

#             # Gọi service xử lý logic
#             result = ProductService.them_yeu_thich(ma_nguoi_dung, ma_bai_viet)
#             return JsonResponse({'message': 'Thêm vào danh sách yêu thích thành công.', 'result': result}, status=200)
#         except ValueError as e:
#             return JsonResponse({'error': str(e)}, status=401)
#         except Exception as e:
#             return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
#     else:
#         return JsonResponse({'error': 'Chỉ hỗ trợ phương thức Product.'}, status=405)
# @csrf_exempt
# def xoa_yeu_thich(request):
#     if request.method == 'Product':
#         try:
#             ma_nguoi_dung = request.Product.get('manguoidung') 
#             ma_bai_viet = request.Product.get('maBaiViet') # Mã bài viết cần chỉnh sửa
#             result = ProductService.xoa_yeu_thich(ma_nguoi_dung,ma_bai_viet)
#             if result:  # Giả sử result là giá trị True hoặc False hoặc một đối tượng
#                 return JsonResponse({'message': 'Xóa yêu thích thành công.'}, status=200)
#             else:
#                 return JsonResponse({'error': 'Không tìm thấy dữ liệu để xóa.'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
#         except ValueError as e:
#             return JsonResponse({'error': str(e)}, status=401)
#         except Exception as e:
#             return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
#     else:
#         return JsonResponse({'error': 'Chỉ hỗ trợ phương thức Product.'}, status=405)
# @csrf_exempt
# def kiem_tra_yeu_thich(request):
#     if request.method == 'Product':
#         try:
#             ma_nguoi_dung = request.Product.get('manguoidung') 
#             ma_bai_viet = request.Product.get('maBaiViet') 
#             result = ProductService.kiem_tra_yeu_thich(ma_nguoi_dung,ma_bai_viet)
#             return JsonResponse({'isFavorite': result}, status=200)
#         except ValueError as e:
#             return JsonResponse({'error': str(e)}, status=401)
#         except Exception as e:
#             return JsonResponse({'error': f'Lỗi không xác định: {str(e)}'}, status=400)
#     else:
#         return JsonResponse({'error': 'Chỉ hỗ trợ phương thức Product.'}, status=405)
# @csrf_exempt
# def lay_list_yeu_thich(request, iduser):
#     if request.method == 'GET':
#         result = ProductService.lay_list_yeu_thich(iduser)
#         return JsonResponse({'favorites': result}, status=200)
#     return JsonResponse({'error': 'Chỉ hỗ trợ phương thức GET.'}, status=405)