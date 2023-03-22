# Generated by Django 4.1.7 on 2023-03-21 22:35

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0002_product_former_price_product_total_quantity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('full_name', models.CharField(max_length=120)),
                ('email', models.CharField(max_length=150)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('failed', 'Failed'), ('success', 'Success')], default='pending', max_length=7)),
                ('state', models.CharField(max_length=60)),
                ('city', models.CharField(max_length=60)),
                ('address', models.TextField()),
                ('total_price', models.FloatField()),
                ('date_created', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True)),
                ('quantity', models.PositiveIntegerField()),
                ('total_price', models.FloatField()),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='order.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='products.product')),
            ],
        ),
    ]
