from django.shortcuts import render
from .models import GoraStrony, Uslugi, PrzyciskUslugi, SekcjaConcierge, BelkaRealizacje, Kontakt

# Create your views here.
def index(request):
    gorastrony = GoraStrony.objects.all()
    uslugi = Uslugi.objects.all()
    przyciskuslugi = PrzyciskUslugi.objects.all()
    sekcjaconcierge = SekcjaConcierge.objects.all()
    belkarealizacje = BelkaRealizacje.objects.all()
    kontakt = Kontakt.objects.all()
    return render(request, 'index/index.html', {
        'gorastrony': gorastrony,
        'uslugi': uslugi,
        'przyciskuslugi': przyciskuslugi,
        'sekcjaconcierge': sekcjaconcierge,
        'belkarealizacje': belkarealizacje,
        'kontakt': kontakt,
    })
