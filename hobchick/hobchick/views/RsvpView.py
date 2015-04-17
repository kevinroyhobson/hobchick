import json
from django.http import HttpResponse
from hobchick.views.NavigationFactory import NavigationFactory

__author__ = 'kevin'

from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import View
import sendgrid
import logging
from datetime import datetime

class RsvpView(View):

    def __init__(self):
        self._navigationFactory = NavigationFactory()
        self._sendGridUsername = 'kevinroyhobson'
        self._sendGridPassword = 'smushbush'
        self._hobEmailAddress = 'Kev <hob@hobchick.com>'
        self._chickEmailAddress = 'Yells <chick@hobchick.com>'

    def get(self, request):
        model = {}
        model['footer'] = self._navigationFactory.getFooter()

        return render_to_response('RsvpTemplate.html', model, context_instance=RequestContext(request))

    def post(self, request):

        name = request.POST['name']
        isComing = request.POST['isComing'] == 'true'
        isTakingTheBus = request.POST['isTakingTheBus'] == 'true'

        self.sendEmail(name, isComing, isTakingTheBus)

        model = {}
        model['success'] = True

        return HttpResponse(json.dumps(model), content_type="application/json")

    def sendEmail(self, name, isComing, isTakingTheBus):

        logString = self.createLogString(name, isComing, isTakingTheBus)

        try:

            sg = sendgrid.SendGridClient(self._sendGridUsername, self._sendGridPassword)

            message = sendgrid.Mail()
            message.set_from(self._hobEmailAddress)
            message.add_to(self._hobEmailAddress)
            message.add_to(self._chickEmailAddress)
            message.set_subject('Hobchick RSVP!'.format(name))

            explanation = '{0} submitted their RSVP.\nAre they coming? {1}\nAre they taking the bus? {2}\n\nHope you\'re having a good day.\nHob'
            explanation = explanation.format(name,
                                             'Yes' if isComing else 'No',
                                             'Yes' if isTakingTheBus else 'No')
            message.set_text(explanation)
            status, msg = sg.send(message)

            if status == 200:
                self.logRsvp(logString)
            else:
                raise Exception

        except Exception:
            self.logFailureToSendEmail(logString)

    def logRsvp(self, messageSent):
        logger = logging.getLogger('django.request')
        logger.debug('{0}: someone submitted an RSVP. message: {1}'.format(datetime.now(), messageSent))


    def logFailureToSendEmail(self, attemptedMessage):
        logger = logging.getLogger('django.request')
        logger.debug('{0}: oh fuck, we failed to send out somebody\'s RSVP. message: {1}'.format(datetime.now(), attemptedMessage))

    def createLogString(self, name, isComing, isTakingTheBus):
        return 'name={0}, isComing={1}, isTakingTheBus={2}'.format(name, isComing, isTakingTheBus)
