from django.db import models

# Bảng Account
class Account(models.Model):
    username = models.CharField(max_length=150, primary_key=True)
    password = models.CharField(max_length=255)
    status = models.BooleanField(default=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    birthday = models.DateField()
    address = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], null=True, blank=True)
    avatar = models.URLField(null=True, blank=True)
    background = models.URLField(null=True, blank=True)

    class Meta:
        db_table = 'account'

# Bảng Categories
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'categories'

# Bảng Colors
class Color(models.Model):
    color_id = models.AutoField(primary_key=True)
    color_name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'colors'

# Bảng Feedback
class Feedback(models.Model):
    product_id = models.IntegerField()
    username = models.ForeignKey(Account, on_delete=models.CASCADE)
    rating = models.IntegerField()
    description = models.TextField()
    dateFB = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'feedback'
        unique_together = ('product_id', 'username')



# Bảng Image
class Image(models.Model):
    url = models.URLField(primary_key=True)
    product_id = models.IntegerField()

    class Meta:
        db_table = 'image'

# Bảng OrderDetails
class OrderDetail(models.Model):
    order_id = models.IntegerField()
    variant_id = models.IntegerField()
    quantity = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'orderdetails'
        unique_together = ('order_id', 'variant_id')
# Bảng Cart
class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    variant_id = models.IntegerField()
    username = models.CharField(max_length=255)
    quantity =models.IntegerField()
    price = models.FloatField()
    class Meta:
        db_table = 'Cart'
# Bảng Orders
class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    username = models.ForeignKey(Account, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    payment_date = models.DateTimeField(null=True, blank=True)
    voucher_id = models.IntegerField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'orders'

# Bảng Products
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    title = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category_id = models.TextField(null=True, blank=True)
    imageSP = models.URLField(null=True, blank=True)
    rating = models.FloatField(default=0)
    dateadd = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'products'

class ProductVariant(models.Model):
    variant_id = models.AutoField(primary_key=True)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)  # Liên kết tới bảng Product
    quantity = models.IntegerField()
    color = models.ForeignKey('Color', on_delete=models.SET_NULL, null=True)  # Liên kết tới bảng Colors
    size = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True)    # Liên kết tới bảng Sizes

    class Meta:
        db_table = 'ProductVariants'

class FavoriteProduct(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)  # Tên người dùng
    product_id = models.IntegerField() # Quan hệ One-to-Many với Product

    class Meta:
        db_table = 'FavoriteProduct'

       


# Bảng Sizes
class Size(models.Model):
    size_id = models.AutoField(primary_key=True)
    size_name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'sizes'


