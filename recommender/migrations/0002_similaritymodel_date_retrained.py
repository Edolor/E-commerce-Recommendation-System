# Generated by Django 4.1.7 on 2023-03-09 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommender', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='similaritymodel',
            name='date_retrained',
            field=models.DateTimeField(auto_now=True),
        ),
    ]