from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.contrib.humanize.templatetags import humanize

class UserAccountManager(BaseUserManager):
    def create(self, username, email, money=500000, shorted_money = 0, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            money=float(money),
            shorted_money=float(shorted_money)
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, email, money=500000, shorted_money=0, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            money=float(money),
            shorted_money=float(shorted_money)
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, money=500000, shorted_money=0, password=None):
        user = self.create_user(
            email,
            password=password,
            username=username,
            money=float(money),
            shorted_money=float(shorted_money)
        )

        user.is_admin = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser):

    email = models.EmailField(
        verbose_name='email address',
        max_length=265,
        unique=True,
    )

    username = models.CharField(
        max_length=265, primary_key=True, unique=True, blank=False)

    money = models.FloatField(default=500000.0)
    shorted_money = models.FloatField(default=0.0)

    stocks = models.JSONField(default=dict({}))

    shorted_stocks = models.JSONField(default=dict({}))

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def has_perm(self):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    def get_username(self):
        return self.username

    def __str__(self):
        return self.email


class Stock(models.Model):
    def default_data():
        return {"data": "none"}

    name = models.CharField(default='NOT_FOUND', max_length=265, unique=True)
    price = models.FloatField(default=0.0)
    data = models.JSONField(default=dict({"data": "none"}))

    def __str__(self):
        return self.name


class Message(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, auto_created = True, blank=False)
    text = models.CharField(max_length=60)

    def created_at(self):
        return humanize.naturaltime(self.created)
