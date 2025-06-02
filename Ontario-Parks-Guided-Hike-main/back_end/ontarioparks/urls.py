from django.urls import path
from ontarioparks.api.views import ViewPOI_APIView, EditPoiAPIView, EditPoiDataAPIView, AddPoiAPIView, AddPoiDataAPIView, \
    GetPoiDataId, poi_data_detail, poi_detail

app_name = "ontarioparks"

urlpatterns = [
    path('', ViewPOI_APIView.as_view(), name='view'),
    path('get_id/<str:slug>/', GetPoiDataId.as_view(), name='get_id'),
    path('edit_poi/<int:id>/', EditPoiAPIView.as_view(), name='edit_poi'),
    path('edit_poi_data/<int:id>/', EditPoiDataAPIView.as_view(), name='edit_poi_data'),
    path('add_poi/', AddPoiAPIView.as_view(), name='add_poi_data'),
    path('add_poi_data/', AddPoiDataAPIView.as_view(), name='add_poi_data'),
    path('delete_poi/<int:POI_id>/', poi_detail, name='delete_poi'),
    path('delete_poi_data/<int:POI_DATA_id>/', poi_data_detail, name='delete_poi_data')
]
