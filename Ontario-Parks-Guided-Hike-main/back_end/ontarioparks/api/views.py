from django.shortcuts import get_object_or_404
from rest_framework.generics import UpdateAPIView, ListAPIView, ListCreateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from ontarioparks.api.pagination import CustomPagination
from ontarioparks.api.serializer import POI_Serializer, EditPoiSerializer, EditPoiDataSerializer, AddPoiSerializer, \
    AddPoiDataSerializer, DeletePoiSerializer, DeletePoiDataSerializer
from ontarioparks.models import POI, POIDATA
from django.http import Http404
from rest_framework.decorators import api_view

class ViewPOI_APIView(ListAPIView):
    """
        Returns a List of the Objects that are in the Database.
    """
    page_size = 0
    serializer_class = POI_Serializer
    permission_classes = [AllowAny]
    pagination_class = None
    queryset = POI.objects.all()



class AddPoiDataAPIView(ListCreateAPIView):
    """
        Add the POIDATA in the database with the given arguments.
    """
    serializer_class = AddPoiDataSerializer
    permission_classes = (AllowAny,)
    queryset = POIDATA.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = AddPoiDataSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            obj = serializer.save()
            x = POI.objects.filter(data_object=obj.POI_DATA_id)
            data['POI_id'] = x
            data['name'] = obj.name
            data['type'] = obj.POI_DATA_Type
            data['description'] = obj.description
            data['isActive'] = obj.isActive
            data['isAudioPresent'] = obj.isAudioPresent
            data['reoccurrence'] = obj.reoccurrence
            data['photo'] = str(obj.photo)
            data['uploaded_on'] = obj.uploaded_on
            data['expiration_date'] = obj.expiration_date
            data['audio_file'] = str(obj.audio_file)
        else:
            data = serializer.errors
        return Response(data)


class GetPoiDataId(ListAPIView):
    """
        returns the data of the "slug" field, specifically its POI_DATA ID.
    """
    lookup_field = 'slug'
    page_size = 0
    serializer_class = AddPoiDataSerializer

    def get_queryset(self, *arg, **kwargs):
        obj = POIDATA.objects.filter(name=self.kwargs['slug'])
        if not obj:
            raise Http404
        return obj


class AddPoiAPIView(ListCreateAPIView):
    """
        Add the POI_DATA in the database with the given arguments.
    """
    serializer_class = AddPoiSerializer
    permission_classes = (AllowAny,)
    queryset = POI.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = AddPoiSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            obj = serializer.save()
            print(obj)
        else:
            data = serializer.errors
        return Response(data)


class EditPoiAPIView(UpdateAPIView):
    """
        Perform Updates using the 'id' parameter provided in the database for the POI_DATA Object.
    """
    serializer_class = EditPoiSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
    queryset = POI.objects.all()

    def get_queryset(self):
        obj = POI.objects.filter(POI_id=self.kwargs['id'])
        print(obj)
        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = EditPoiSerializer(instance)
        return Response(serializer.data)

    def perform_update(self, serializer):
        return serializer.save(self.kwargs['id'])

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = get_object_or_404(self.get_queryset(), pk=self.kwargs['id'])
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_update(serializer)
        serializer = EditPoiSerializer(instance)
        return Response(serializer.data)


class EditPoiDataAPIView(UpdateAPIView):
    """
        Perform Updates using the 'id' parameter provided in the database for the POI_DATA Object.
    """
    serializer_class = EditPoiDataSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'
    queryset = POIDATA.objects.all()

    def get_queryset(self):
        obj = POIDATA.objects.filter(POI_DATA_id=self.kwargs['id'])
        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = EditPoiDataSerializer(instance)
        return Response(serializer.data)

    def perform_update(self, serializer):
        return serializer.save(self.kwargs['id'])

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = get_object_or_404(self.get_queryset(), pk=self.kwargs['id'])
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_update(serializer)
        serializer = EditPoiDataSerializer(instance)
        return Response(serializer.data)


@api_view(['DELETE'])
def poi_detail(request, POI_id):
    """
        Deletes the given POI object in the database.
        The "given" POI object refers to the one that is passed into the DELETE api call,
        through the parameter "POI_DATA_id".
    """
    if request.method == "DELETE":
        to_be_delete = POI.objects.get(pk=POI_id)
        to_be_delete.delete()
        return Response()


@api_view(['DELETE'])
def poi_data_detail(request, POI_DATA_id):
    """
        Deletes the given POI_DATA object in the database.
        The "given" POI_DATA object refers to the one that is passed into the DELETE api call,
        through the parameter "POI_DATA_id".
    """
    if request.method == "DELETE":
        to_be_delete = POIDATA.objects.get(pk=POI_DATA_id)
        to_be_delete.delete()
        return Response()
