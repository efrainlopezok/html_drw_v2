function MiniRouter(routes) {
  
  /*
  USAGE:
  
  On instantiation, MiniRouter expects to receive a route object
  with each key as a URL regex and each value as a function to call when
  the route regex matches the current URL.

  var router = new MiniRouter({
    '/$': function() {},
    '/about': function() {},
    '/approach': function() {},
    '/work/(.*)': function() {}
  });
  */
 
  //
  //   Private Vars
  //
  //////////////////////////////////////////////////////////////////////
 
  var self = {
    
  };
 
 
  //
  //   Public Vars
  //
  //////////////////////////////////////////////////////////////////////
 
  self.routes = routes;
 
 
  //
  //   Private Methods
  //
  //////////////////////////////////////////////////////////////////////
 
  var _init = function() {
    _route();
  };
 
  var _route = function() {
    var currentUrl = window.location.pathname;
    
    // Run through each route until we find a match
    for (var key in self.routes) {
      var routeFunction = self.routes[key];
      var matchResult = self.matchPathToRoute(key, currentUrl);
      if (matchResult) routeFunction();
    }
  };
 
 
  //
  //   Public Methods
  //
  //////////////////////////////////////////////////////////////////////
  
  self.addRoute = function(routeObject) {
    for (var key in routeObject) {
      self.routes[key] = routeObject[key];
    }
  };

  self.matchPathToRoute = function(routeRegExp, str) {
    var re = new RegExp(routeRegExp, 'i');
    var matchResult = str.match(re);
    return (matchResult) ? true : false;
  };
 
  // Initiate
  _init();
 
  // Return the Object
  return self;
}