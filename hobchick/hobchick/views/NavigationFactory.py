__author__ = 'kevin'



class NavigationFactory:

    def __init__(self):
        pass

    def getFooter(self):
        linkNames = [ 'WHO', 'WHAT', 'WHEN', 'WHERE', 'WHY', 'HOW', 'RSVP']
        links = map(lambda name: {'display': name, 'url': '/{0}'.format(name.lower())}, linkNames)
        return {'links': links, 'slug': {'display': 'HOBCHICK', 'link': '/'}}

    def getMobileFooter(self):

        links = {'leftLinks':  [{'display': 'WHO', 'url': '/m/who'},
                                  {'display': 'WHEN', 'url': '/m/when'},
                                  {'display': 'WHY', 'url': '/m/why'}],
                 'rightLinks': [{'display': 'WHAT', 'url': '/m/what'},
                                  {'display': 'WHERE', 'url': '/m/where'},
                                  {'display': 'RSVP', 'url': '/m/rsvp'}],
                 'topLink': {'display': 'HOME', 'url': '/m'}};

        return links;
