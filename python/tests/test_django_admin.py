# ruff: noqa: E402

from __future__ import annotations

from django.conf import settings

if not settings.configured:
    settings.configure(
        SECRET_KEY="test-secret-key",
        INSTALLED_APPS=[
            "django.contrib.admin",
            "django.contrib.auth",
            "django.contrib.contenttypes",
            "django.contrib.messages",
            "django.contrib.sessions",
            "django.contrib.staticfiles",
            "olloweditor.apps.OllowEditorConfig",
        ],
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": ":memory:",
            }
        },
        MIDDLEWARE=[],
        ROOT_URLCONF=__name__,
        STATIC_URL="/static/",
        TEMPLATES=[
            {
                "BACKEND": "django.template.backends.django.DjangoTemplates",
                "APP_DIRS": True,
                "OPTIONS": {
                    "context_processors": [
                        "django.template.context_processors.request",
                        "django.contrib.auth.context_processors.auth",
                        "django.contrib.messages.context_processors.messages",
                    ]
                },
            }
        ],
        USE_TZ=True,
    )

import django

django.setup()

from django import forms
from django.apps import apps
from django.contrib import admin
from django.contrib.staticfiles import finders
from django.db import models

from olloweditor.integrations.django import OllowEditorField, OllowEditorWidget

urlpatterns: list[object] = []


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = OllowEditorField()
    summary = models.TextField(blank=True)

    class Meta:
        app_label = "tests"


class ArticleAdmin(admin.ModelAdmin):
    pass


class ExistingTextFieldForm(forms.ModelForm):
    content = forms.CharField(
        widget=OllowEditorWidget(
            attrs={"class": "field-content existing"},
            options={"theme": "auto"},
        )
    )

    class Meta:
        model = Article
        fields = ["content"]


def test_django_app_imports() -> None:
    config = apps.get_app_config("olloweditor")
    assert config.name == "olloweditor"


def test_static_files_are_discoverable() -> None:
    assert finders.find("olloweditor/olloweditor.css")
    assert finders.find("olloweditor/olloweditor.browser.js")
    assert finders.find("olloweditor/olloweditor-init.js")


def test_admin_form_uses_olloweditor_widget_for_field() -> None:
    model_admin = ArticleAdmin(Article, admin.sites.AdminSite())
    form_class = model_admin.get_form(request=None)
    assert isinstance(form_class.base_fields["content"].widget, OllowEditorWidget)


def test_existing_textfield_form_can_use_olloweditor_widget() -> None:
    form = ExistingTextFieldForm()
    assert isinstance(form.fields["content"].widget, OllowEditorWidget)
    rendered = str(form["content"])
    assert 'data-olloweditor="true"' in rendered
