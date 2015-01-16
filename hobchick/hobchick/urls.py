from django.conf.urls import patterns, include, url

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
from hobchick.views.mobile.MobileHowView import MobileHowView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hobchick.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', HomeView.as_view()),

    url(r'^who/$', WhoView.as_view()),
    url(r'^what/$', WhatView.as_view()),
    url(r'^when/$', WhenView.as_view()),
    url(r'^where/$', WhereView.as_view()),
    url(r'^why/$', WhyView.as_view()),
    url(r'^how/$', HowView.as_view()),

    url(r'^m/$', MobileHomeView.as_view()),
    url(r'^m/who/$', MobileWhoView.as_view()),
    url(r'^m/what/$', MobileWhatView.as_view()),
    url(r'^m/when/$', MobileWhenView.as_view()),
    url(r'^m/where/$', MobileWhereView.as_view()),
    url(r'^m/why/$', MobileWhyView.as_view()),
)
