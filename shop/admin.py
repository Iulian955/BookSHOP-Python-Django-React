from django.contrib import admin
from .models import Category,Product,Order, OrderBook, Coupon,Address, Opinion
from django.utils.safestring import mark_safe
from django.urls import reverse
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name','author' ,'slug','category', 'price',
                'available','created','updated']
    list_filter = ['available','created','updated']
    list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):   
    list_display = ['user','delivery_address','start_date','ordered_date','ordered','paid','coupon','get_total_before','get_total',]
    list_display_links = [
        'user',
        'delivery_address',
        'coupon'
    ]
    list_filter = ['ordered','user','paid']

    search_fields = [
        'user__username',]
    filter_horizontal = ('books',)

    def get_books(self,obj):
        return "\n".join([str(i.book) for i in obj.books.all()])

@admin.register(OrderBook)
class OrderBookAdmin(admin.ModelAdmin):
    list_display = ['user','book','quantity','get_final_price']

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'valid_from','valid_to', 'discount', 'active']
    list_filter = ['active','valid_from','valid_to']
    search_fields = ['code']

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['user','street_address','apartment_address','city',
        'postal_code','delivery_type',]
    list_filter = ['delivery_type', 'city']
    search_fields = ['user', 'street_address', 'apartment_address', 'postal_code']

@admin.register(Opinion)
class OpinionAdmin(admin.ModelAdmin):
    list_display = ['user','product', 'opinion', 'rating']

