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

   // - setting filters for displayed data based on
   //  - price range
   //  - flight duration range
   //  - flight departure time range
   self.filters = [
      { 
         title: "price", 
         filter: function(flightData) {
            return (parseInt(flightData.price) >= self.minPrice() 
                    && parseInt(flightData.price) <= self.maxPrice());
         }
      },
      { 
         title: "departure",
         filter: function(flightData) {
            return (parseInt(flightData.takeoffTime) >= self.minDepartureTime()
                    && parseInt(flightData.takeoffTime) <= self.maxDepartureTime());
         }
      },
      {
         title: "duration",
         filter: function(flightData) {
            return (parseInt(flightData.duration) >= self.minDuration()
                    && parseInt(flightData.duration) <= self.maxDuration());
         }
      }

   ];

   self.filteredFlightData = ko.computed(function() {

      // commented out in favor of method chaining solution
      //return ko.utils.arrayFilter(ko.utils.arrayFilter(self.flightsData, self.filters[0].filter),
      //                            self.filters[1].filter);
      return self.flightsData.filter(self.filters[0].filter)
                             .filter(self.filters[1].filter)
                             .filter(self.filters[2].filter);
   });


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
