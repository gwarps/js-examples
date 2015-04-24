appendDuration(flightsData);

var pageModel = function(airlineMap, airportMap, flightsData) {
   var self = this;
   self.airlineMap = airlineMap;
   self.airportMap = airportMap;
   self.flightsData = flightsData;

   self.minPrice = ko.observable(Math.min.apply(Math, flightsData.map(function(o) {
      return o.price;
   })));
   self.maxPrice = ko.observable(Math.max.apply(Math, flightsData.map(function(o) {
      return o.price;
   })));

   self.medPrice = ko.observable(2);

   self.minDepartureTime = ko.observable(Math.min.apply(Math, flightsData.map(function(o) {
      return o.takeoffTime;
   })));
   self.maxDepartureTime = ko.observable(Math.max.apply(Math, flightsData.map(function(o) {
      return o.takeoffTime;
   })));

   self.minDuration = ko.observable(Math.min.apply(Math, flightsData.map(function(o) {
      return o.duration;
   })));
   self.maxDuration = ko.observable(Math.max.apply(Math, flightsData.map(function(o) {
      return o.duration;
   })));

   self.airlineArray = ko.observableArray(checkMap(airlineMap));

};


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


function appendDuration(flightsData) {
   flightsData.forEach(function(flight) {
      flight.duration = flight.landingTime - flight.takeoffTime;
   });
} 
