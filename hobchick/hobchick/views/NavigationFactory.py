__author__ = 'kevin'



class NavigationFactory:

    def __init__(self):
        pass

    def getFooter(self):
        linkNames = [ 'WHO', 'WHAT', 'WHEN', 'WHERE', 'WHY', 'HOW']
        links = map(lambda name: {'display': name, 'url': '/{0}'.format(name.lower())}, linkNames)
        return {'links': links, 'slug': {'display': 'HOBCHICK', 'link': '/'}}
