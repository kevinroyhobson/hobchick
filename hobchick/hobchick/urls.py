from django.conf.urls import patterns, include, url

from django.contrib import admin
from hobchick.views.WhereView import WhereView
from hobchick.views.WhenView import WhenView
from hobchick.views.HomeView import HomeView
from hobchick.views.WhyView import WhyView

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hobchick.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', HomeView.as_view()),
    url(r'^when/$', WhenView.as_view()),
    url(r'^where/$', WhereView.as_view()),
    url(r'^why/$', WhyView.as_view()),
)
