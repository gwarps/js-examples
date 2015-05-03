// Not used

ko.observableArray.fn.filterByFunction = function(filterFunction) {
   return ko.pureComputed(function() {
      return ko.utils.arrayFilter(this(), filterFunction)
   }, this);
};

