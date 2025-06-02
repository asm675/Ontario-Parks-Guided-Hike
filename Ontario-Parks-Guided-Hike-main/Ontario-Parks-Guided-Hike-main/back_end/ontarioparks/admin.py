from django.contrib import admin
from ontarioparks.models import POIDATA, POI
# class POIAdmin(admin.ModelAdmin):
#     list_display = ['latitude', 'longitude']
#     # @admin.display(description='POIs')
#     # def my_stock(self, obj):
#     #     return "POIs"
#     # my_stock.short_description = 'POIs'


# Register your models here.
# admin.site.register(USER)
admin.site.register(POI)
admin.site.register(POIDATA)
