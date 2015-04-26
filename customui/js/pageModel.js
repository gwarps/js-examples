appendDuration(flightsData);

var pageModel = function(airlineMap, airportMap, flightsData) {
   var self = this;
   self.airlineMap = airlineMap;
   self.airportMap = airportMap;
   self.flightsData = ko.observableArray(flightsData);
   
   
   self.headers = [
      {title: 'Airline', sortProperty: 'airlineCode', asc: true},
      {title: 'Departure', sortProperty: 'takeoffTime', asc: true},
      {title: 'Arrival', sortProperty: 'landingTime', asc: true},
      {title: 'Duration', sortProperty: 'duration', asc: true},
      {title: 'Price', sortProperty: 'price', asc: true}
   ];

   self.activeSort = self.headers[4]; // setting default sort as price
   self.sort = function(header, event) {
      if (self.activeSort === header) { // check if clicked for first time
         header.asc = !header.asc; // if so, reverse the sort direction
      } else {
         self.activeSort = header // first click, stores it
      }

      var sort_prop = self.activeSort.sortProperty;
      var ascSort = function(a, b) {
         if (a[sort_prop] < b[sort_prop]) return -1;
         else if (a[sort_prop] > b[sort_prop]) return 1;
         else return 0;
      };
      var descSort = function(a, b) {
         return ascSort(b, a);
      };
   
      var sortDirection = self.activeSort.asc ? ascSort : descSort;
      self.flightsData.sort(sortDirection);
   };


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

   // for displaying checkbox and keeping options track
   // observale not required since not used
   self.airlineArray = ko.observableArray(Object.keys(airlineMap));

   // used for track of checked items and airline filter
   self.airlineComputed = ko.observableArray(Object.keys(airlineMap));

   // - setting filters for displayed data based on
   //  - price range
   //  - flight duration range
   //  - flight departure time range
   //  - selected airlines
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
      },
      {
         title: "airline",
         filter: function(flightData) {
            return ($.inArray(flightData.airlineCode, self.airlineComputed()) > -1);
         }
      }

   ];

   //self.filteredFlightData = ko.computed(function() {

      // commented out in favor of method chaining solution
      //return ko.utils.arrayFilter(ko.utils.arrayFilter(self.flightsData, self.filters[0].filter),
      //                            self.filters[1].filter);
      //return self.flightsData();//filter(self.filters[0].filter)
                             //.filter(self.filters[1].filter)
                             //.filter(self.filters[2].filter) 
                             //.filter(self.filters[3].filter);
      //return self.flightsData.filterByFunction(self.filters[0].filter);

   //});
   self.filteredFlightData = self.flightsdata;


};


function appendDuration(flightsData) {
   flightsData.forEach(function(flight) {
      flight.duration = flight.landingTime - flight.takeoffTime;
      flight.price = parseInt(flight.price);
   });
} 
