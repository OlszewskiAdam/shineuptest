from django.db import models


class GoraStrony(models.Model):
    naglowek_strony = models.CharField(max_length=20)
    opis_strony = models.TextField(max_length=300)
    tekst_przycisku = models.CharField(max_length=20, default='')
    def publish(self):
        self.save()

    def __str__(self):
        return self.naglowek_strony

class Uslugi(models.Model):
    nazwa_uslugi = models.CharField(max_length=20)
    opis_uslugi = models.TextField(max_length=200)

    def publish(self):
        self.save()

    def __str__(self):
        return self.nazwa_uslugi

class PrzyciskUslugi(models.Model):
    tekst_przycisku = models.CharField(max_length=20)
    def publish(self):
        self.save()

    def __str__(self):
        return self.tekst_przycisku

class SekcjaConcierge(models.Model):
    naglowek_sekcji = models.CharField(max_length=20)
    opis_sekcji = models.TextField(max_length=500)
    tekst_przycisku = models.CharField(max_length=20, default='')
    def publish(self):
        self.save()
    def __str__(self):
        return self.naglowek_sekcji

class BelkaRealizacje(models.Model):
    naglowek = models.CharField(max_length=20)
    opis = models.TextField(max_length=500)
    def publish(self):
        self.save()
    def __str__(self):
        return self.naglowek

class Kontakt(models.Model):
    numer_telefonu = models.CharField(max_length=15)
    adres_mail = models.EmailField(max_length=30)
    adres = models.TextField(max_length=100)
    informacja = models.TextField(max_length=500, default='')
    def publish(self):
        self.save()
    def __str__(self):
        return "Kontakt"
