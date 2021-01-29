from django.shortcuts import render
from django.template import RequestContext
from django.views.generic import View
from hobchick.views.NavigationFactory import NavigationFactory

__author__ = 'kevin'

class HomeView(View):
    
    def __init__(self):
        self._navigationFactory = NavigationFactory()

    def get(self, request):
        model = {}
        model['footer'] = self._navigationFactory.getFooter()
        model['footer']['slug'] = {'display': '7.4.15', 'link': None}
        return render(request, 'HomeTemplate.html', model)
