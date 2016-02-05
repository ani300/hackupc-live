$(document).ready(function() {
  var eventsLoaded = function(json) {
    json.events.map(function(ev){
      ev.begin = new Date(ev.begin);
      ev.end = new Date(ev.end);
    });
    var activeEvents = json.events.filter(function(ev){
      return ev.end >= Date.now();
    });

    var saturdayEvents = activeEvents.filter(function(ev){
      return ev.begin.getDay() == 6;
    });
    var sundayEvents = activeEvents.filter(function(ev){
      return ev.begin.getDay() == 0;
    });
    console.log(json);
    console.log(activeEvents);

    /*$.ajax({
      url: "/templates/applications-list.hbs",
      type: "GET",
      success: function(data) {
          var template = Handlebars.compile(data);
          $("#list-applications tbody").html(template(json));
      }
    });*/
  };

  $.ajax({
      url: "/data/events.json",
      type: "GET",
      dataType : "json",
      success: eventsLoaded,
   
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      error: function(xhr, status, errorThrown) {
          alert("Sorry, there was a problem!");
          console.log("Error: " + errorThrown);
          console.log("Status: " + status);
          console.dir(xhr);
      },
   
      // Code to run regardless of success or failure
      complete: function(xhr, status) {
      }
  });


});