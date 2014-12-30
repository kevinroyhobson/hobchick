from hobchick.views.NavigationFactory import NavigationFactory

__author__ = 'kevin'

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import View

class WhatView(View):

    def __init__(self):
        self._navigationFactory = NavigationFactory()

    def get(self, request):
        model = {}
        model['footer'] = self._navigationFactory.getFooter()
        return render_to_response('WhatTemplate.html', model, context_instance=RequestContext(request))