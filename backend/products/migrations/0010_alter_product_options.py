# Generated by Django 4.1.7 on 2023-03-07 13:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_alter_product_price'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-created_at']},
        ),
    ]
