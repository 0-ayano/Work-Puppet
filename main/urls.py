from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path(r'', views.index, name='main'),
    path(r'mini.html/', views.miniWindow, name='sub'),

    path('video1/', views.video_feed_view(0), name="mode1"),
    path('video2/', views.video_feed_view(1), name="mode2"),
    path('video3/', views.video_feed_view(2), name="mode3"),
    path('ajaxPost/', views.ajaxPost, name='post'),
    path('serialStart/', views.serialStart, name='switchON'),
    path('serialEnd/', views.serialEnd, name='switchOFF'),
]
urlpatterns += staticfiles_urlpatterns()