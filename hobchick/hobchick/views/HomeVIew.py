from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import View

__author__ = 'kevin'

class HomeView(View):
    
    def __init__(self):
        pass

    def get(self, request):

        model = {}
        model['weddingDate'] = ''
        return render_to_response('HomeTemplate.html', model, context_instance=RequestContext(request))