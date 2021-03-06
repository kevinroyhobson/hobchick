from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import View
from hobchick.views.NavigationFactory import NavigationFactory

__author__ = 'kevin'

class MobileHowView(View):
    
    def __init__(self):
        self._navigationFactory = NavigationFactory()

    def get(self, request):
        model = {}
        model['footer'] = self._navigationFactory.getMobileFooter()
        return render_to_response('MobileHowTemplate.html', model)