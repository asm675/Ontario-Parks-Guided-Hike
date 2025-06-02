from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from ontarioparks.models import POI, POIDATA


class POI_Serializer(serializers.ModelSerializer):
    # poi_data = POI_DATA_Serializer()
    class Meta:
        model = POI
        fields = ("POI_id", "latitude", "longitude", "data_object")
        depth = 1


class AddPoiSerializer(serializers.ModelSerializer):
    class Meta:
        model = POI
        fields = '__all__'


class AddPoiDataSerializer(serializers.ModelSerializer):
    poi_data = AddPoiSerializer(many=True, read_only=True)
    class Meta:
        model = POIDATA
        fields = ('POI_DATA_id', 'POI_DATA_Type', 'photo', 'uploaded_on', 'expiration_date', 'reoccurrence',
                  'audio_file', 'name', 'description', 'isAudioPresent', 'isActive', 'poi_data')

    # def save(self):
    #     flag_audio = False
    #     flag_active = True
    #     print(self.validated_data)
    #     if self.validated_data['isAudioPresent'] is not None:
    #         flag_audio = True
    #
    #     if self.validated_data['uploaded_on'] > self.validated_data['expiration_on']:
    #         flag_active = False
    #
    #     data = POIDATA.objects.create(POI_DATA_Type=self.validated_data['POI_DATA_Type'],
    #                                   name=self.validated_data['name'], photo=self.validated_data['photo'],
    #                                   uploaded_on=self.validated_data['uploaded_on'],
    #                                   expiration_date=self.validated_data['expiration_date'],
    #                                   reoccurrence=self.validated_data['reoccurrence'],
    #                                   audio_file=self.validated_data['audio_file'],
    #                                   description=self.validated_data['description'],
    #                                   isActive=flag_active, isAudioPresent=flag_audio)
    #     data.save()
    #     return data





class EditPoiDataSerializer(serializers.ModelSerializer):
    POI_DATA_Type = serializers.CharField(required=False)
    photo = serializers.FileField(required=False)
    uploaded_on = serializers.DateField(required=False)
    expiration_date = serializers.DateField(required=False)
    reoccurrence = serializers.CharField(required=False)
    audio_file = serializers.FileField(required=False)
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    isAudioPresent = serializers.BooleanField(required=False)
    isActive = serializers.BooleanField(required=False)
    audio_file = serializers.FileField(required=False)
    class Meta:
        model = POIDATA
        fields = (
            'POI_DATA_Type', 'photo', 'uploaded_on', 'expiration_date', 'reoccurrence',
            'audio_file', 'name', 'description', 'isAudioPresent', 'isActive')

    def save(self, _id):
        try:
            obj = get_object_or_404(POIDATA, pk=_id)

            fields = ['POI_DATA_Type', 'photo', 'uploaded_on', 'expiration_date', 'reoccurrence',
                                  'audio_file', 'name', 'description', 'isAudioPresent', 'isActive']

            for x in fields:
                if x not in self.validated_data.keys():
                    self.validated_data[x] = ""

            if obj:
                # User.objects.update_or_create()
                print(obj)
                print(self.validated_data)
                if self.validated_data['POI_DATA_Type'] != "":
                    obj.POI_DATA_Type = self.validated_data['POI_DATA_Type']

                if self.validated_data['photo'] != "":
                    obj.photo = self.validated_data['photo']
                    print(obj.photo)

                if self.validated_data['uploaded_on'] != "":
                    obj.uploaded_on = self.validated_data['uploaded_on']

                if self.validated_data['expiration_date'] != "":
                    print(self.validated_data['expiration_date'])
                    obj.expiration_date = self.validated_data['expiration_date']

                if self.validated_data['reoccurrence'] != "":
                    # print(self.validated_data['avatar'])
                    obj.reoccurrence = self.validated_data['reoccurrence']

                if self.validated_data['audio_file'] != "":
                    obj.audio_file = self.validated_data['audio_file']
                    print(obj.audio_file)

                if self.validated_data['name'] != "":
                    obj.name = self.validated_data['name']

                if self.validated_data['description'] != "":
                    obj.description = self.validated_data['description']

                if self.validated_data['isAudioPresent'] != "":
                    obj.isAudioPresent = self.validated_data['isAudioPresent']

                if self.validated_data['isActive'] != "":
                    obj.isActive = self.validated_data['isActive']

                # obj.save(_id)
                # obj.save()

        except Http404:
            raise serializers.ValidationError({'Invalid Try Again'})

        obj.save()
        return obj


class EditPoiSerializer(serializers.ModelSerializer):
    latitude = serializers.DecimalField(max_digits=15, decimal_places=7, required=False)
    longitude = serializers.DecimalField(max_digits=15, decimal_places=7, required=False)

    class Meta:
        model = POI
        fields = ('latitude', 'longitude')

    def save(self, _id):
        print(self.validated_data)
        try:
            obj = get_object_or_404(POI, pk=_id)
            if obj:
                if self.validated_data['latitude'] != "":
                    obj.latitude = self.validated_data['latitude']

                if self.validated_data['longitude'] != "":
                    obj.longitude = self.validated_data['longitude']

        except Http404:
            raise serializers.ValidationError({'Invalid Try Again'})

        obj.save()
        return obj


class DeletePoiSerializer(serializers.ModelSerializer):
    class Meta:
        model = POI



class DeletePoiDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = POIDATA