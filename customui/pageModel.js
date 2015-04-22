var pageModel = function(airlineMap, airportMap, flightsData) {
   var self = this;
   self.airlineMap = airlineMap;
   self.airportMap = airportMap;

   self.airlineArray = ko.observableArray(checkMap(airlineMap));
}

var airlineModel = function(code, check) {
   var self = this;
   self.airlineCode = code;
   self.airlineChecked = check;
}

function checkMap(airlineMap) {
   var cmap = [];
   for(var prop in airlineMap) {
      if (airlineMap.hasOwnProperty(prop)) {
         cmap.push(ko.observable(new airlineModel(prop, true)));
      }
   }
   return cmap;
} 
