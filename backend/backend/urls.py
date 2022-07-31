from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from market.views import ModdedTokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('market/', include('market.urls')),
    path('api/token/', ModdedTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
