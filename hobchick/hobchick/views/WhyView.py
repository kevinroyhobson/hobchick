from hobchick.views.NavigationFactory import NavigationFactory

__author__ = 'kevin'

from django.shortcuts import render
from django.template import RequestContext
from django.views.generic import View

class WhyView(View):

    def __init__(self):
        self._navigationFactory = NavigationFactory()

    def get(self, request):
        model = {}
        model['footer'] = self._navigationFactory.getFooter()
        return render(request, 'WhyTemplate.html', model)
