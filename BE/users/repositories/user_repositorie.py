from users.models import Account

class UserRepository:
    @staticmethod
    def get_user_by_id(username):
        try:
            return Account.objects.get(username=username)
        except Account.DoesNotExist:
            return None
    @staticmethod
    def update_user_info(user: Account, data):
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        user.address = data.get('address', user.address)
        user.phone = data.get('phone', user.phone)
        user.gender = data.get('gender', user.gender)
        user.birthday = data.get('birthday', user.birthday)
        user.save()
        return user
    @staticmethod
    def get_user_by_email(email):
        try:
            return Account.objects.get(email=email)
        except Account.DoesNotExist:
            return None
#     @staticmethod
#     def login(username, password):
#         try:
#             return NguoiDung.objects.get(tendangnhap=username, matkhau=password)
#         except NguoiDung.DoesNotExist:
#             return None

#     @staticmethod
#     def update_user_info(user: NguoiDung, data):
#         user.hoten = data.get('hoten', user.hoten)
#         user.email = data.get('email', user.email)
#         user.diachi = data.get('diachi', user.diachi)
#         user.sodienthoai = data.get('sodienthoai', user.sodienthoai)
#         user.gioitinh = data.get('gioitinh', user.gioitinh)
#         user.socccd = data.get('socccd', user.socccd)
#         user.mota = data.get('mota', user.mota)
#         user.ngaysinh = data.get('ngaysinh', user.ngaysinh)
#         user.save()
#         return user
    @staticmethod
    def reset_password_forgot(user: Account, new_password):
        user.password = new_password
        user.save()
        return user
#     @staticmethod   
#     def update_images(user: NguoiDung, avatar_name, background_name):
       
#         if avatar_name:
#             user.anhdaidien = avatar_name
#         if background_name:
#             user.anhnen = background_name
#         user.save()
