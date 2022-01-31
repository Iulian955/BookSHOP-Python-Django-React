from django.urls import path
from .views import index
urlpatterns = [
    path('',index),
    path('home/',index),
    path('product/<int:id>',index),
    path('category/<slug:slug>',index),
    path('cart',index),
    path('signup',index),
    path('login',index),
    path('checkout',index),
    path('type/<str:type>',index),
    path('search/<str:query>',index),
    path('rest-auth/password/reset/confirm/<uidb64>/<token>/', index,
            name='password_reset_confirm'),
]