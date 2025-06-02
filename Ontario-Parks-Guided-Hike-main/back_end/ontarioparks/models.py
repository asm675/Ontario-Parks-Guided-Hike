from django.db import models


# Create your models here.
class POIDATA(models.Model):
    RECURRENCE_OP = [
        ["...", "1-Months"], ["...", "2-Months"],
        ["...", "3-Months"], ["...", "4-Months"],
        ["...", "5-Months"], ["...", "6-Months"],
        ["...", "7-Months"], ["...", "8-Months"],
        ["...", "9-Months"], ["...", "10-Months"],
        ["...", "11-Months"], ["...", "1 Year"],
    ]
    """
    POI_DATA_id: generated id for this model

    pictures: the type of file this is

    file_location: location of file

    name: name that the file represents. i.e park

    description: description of what the file is about

    audio_file = audio file
    """
    POI_DATA_id = models.AutoField(primary_key=True, verbose_name="Point Of Interest Data ID")
    POI_DATA_Type = models.CharField(max_length=50, verbose_name="Point Of Interest Data Type")
    photo = models.FileField(upload_to='photo_images/', null=True, blank=True, verbose_name="Photo File")
    uploaded_on = models.DateField(verbose_name="Upload Date")
    expiration_date = models.DateField(verbose_name="Expiration Date", default=None, null=True, blank=True)
    reoccurrence = models.CharField(default=None, verbose_name="Repeat", max_length=50, choices=RECURRENCE_OP, null=True, blank=True)
    audio_file = models.FileField(upload_to='audio_files/', null=True, blank=True, verbose_name="Upload Audio")
    name = models.CharField(max_length=50, verbose_name="Name")
    description = models.TextField(verbose_name="Description")
    isAudioPresent = models.BooleanField(default=False, verbose_name="Audio Present")
    isActive = models.BooleanField(default=True, verbose_name="Active")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'POI Data'
        verbose_name_plural = 'POI DATA\'s'



class POI(models.Model):
    """
    POI model

    POI_id: the id of the data. Not related to POI_DATA_id

    latitude: the POI latitude
    longitude: the POI longitude

    name: name of the POI

    description: short description of the POI

    data_object: foreign key to related files for this POI. links to POI_DATA_id
    """
    POI_id = models.AutoField(primary_key=True, verbose_name="Point of Interest ID")
    latitude = models.DecimalField(max_digits=15, decimal_places=7, null=False, blank=False, default=0,
                                   verbose_name="Location Latitude")
    longitude = models.DecimalField(max_digits=15, decimal_places=7, null=False, blank=False, default=0,
                                    verbose_name="Location Longitude")
    data_object = models.ForeignKey(to=POIDATA, on_delete=models.CASCADE, related_name='poi_data')

    class Meta:
        verbose_name = 'POI'
        verbose_name_plural = 'POI\'s'
