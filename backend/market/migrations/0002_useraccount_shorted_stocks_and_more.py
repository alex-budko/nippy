# Generated by Django 4.0.5 on 2022-08-15 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='shorted_stocks',
            field=models.JSONField(default={}),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='shorting_money',
            field=models.FloatField(default=0.0),
        ),
    ]
