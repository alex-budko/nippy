# Generated by Django 4.0.5 on 2022-08-15 01:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_useraccount_shorted_stocks_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='shorting_money',
            new_name='shorted_money',
        ),
    ]