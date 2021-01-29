from django.shortcuts import render
from django.template import RequestContext
from django.views.generic import View
from hobchick.views.NavigationFactory import NavigationFactory

__author__ = 'kevin'

class MobileWhenView(View):
    
    def __init__(self):
        self._navigationFactory = NavigationFactory()

    def get(self, request):
        model = {}
        model['footer'] = self._navigationFactory.getMobileFooter()
        return render(request, 'MobileWhenTemplate.html', model)
