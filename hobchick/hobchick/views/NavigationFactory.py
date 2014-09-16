__author__ = 'kevin'



class NavigationFactory:

    def __init__(self):
        pass

    def getFooter(self):
        linkNames = [ 'WHO', 'WHAT', 'WHEN', 'WHERE', 'WHY', 'HOW']
        links = map(lambda name: {'display': name, 'url': '/{0}'.format(name.lower())}, linkNames)
        return {'links': links, 'slug': {'display': 'HOBCHICK', 'link': '/'}}

    def getMobileFooter(self):

        linkPairs = [ {'left': {'display': 'WHO', 'url': '/m/who'}, 'right': {'display': 'WHAT', 'url': '/m/what'}},
                      {'left': {'display': 'WHEN', 'url': '/m/when'}, 'right': {'display': 'WHERE', 'url': '/m/where'}},
                      {'left': {'display': 'WHY', 'url': '/m/why'}, 'right': {'display': 'HOW', 'url': '/m/how'}} ]

        return {'linkPairs': linkPairs}
