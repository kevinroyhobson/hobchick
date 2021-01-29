"""hobchick URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic.base import RedirectView
from django.contrib import admin

from hobchick.views.WhatView import WhatView
from hobchick.views.mobile.MobileHomeView import MobileHomeView
from hobchick.views.WhereView import WhereView
from hobchick.views.WhenView import WhenView
from hobchick.views.HomeView import HomeView
from hobchick.views.WhyView import WhyView
from hobchick.views.HowView import HowView
from hobchick.views.WhoView import WhoView
from hobchick.views.mobile.MobileWhoView import MobileWhoView
from hobchick.views.mobile.MobileWhatView import MobileWhatView
from hobchick.views.mobile.MobileWhenView import MobileWhenView
from hobchick.views.mobile.MobileWhereView import MobileWhereView
from hobchick.views.mobile.MobileWhyView import MobileWhyView
from hobchick.views.RsvpView import RsvpView
from hobchick.views.mobile.MobileRsvpView import MobileRsvpView

urlpatterns = [
    path('admin/', admin.site.urls),

    re_path(r'^$', HomeView.as_view()),

    re_path(r'^who/$', WhoView.as_view()),
    re_path(r'^what/$', WhatView.as_view()),
    re_path(r'^when/$', WhenView.as_view()),
    re_path(r'^where/$', WhereView.as_view()),
    re_path(r'^why/$', WhyView.as_view()),
    re_path(r'^how/$', HowView.as_view()),
    re_path(r'^rsvp/$', RsvpView.as_view()),

    re_path(r'^m/$', MobileHomeView.as_view()),
    re_path(r'^m/who/$', MobileWhoView.as_view()),
    re_path(r'^m/what/$', MobileWhatView.as_view()),
    re_path(r'^m/when/$', MobileWhenView.as_view()),
    re_path(r'^m/where/$', MobileWhereView.as_view()),
    re_path(r'^m/why/$', MobileWhyView.as_view()),
    re_path(r'^m/rsvp/$', MobileRsvpView.as_view()),

    re_path(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico', permanent=True)),
]
