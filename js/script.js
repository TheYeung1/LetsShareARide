$(document).ready(function(){
    $('#riderEventSelect').change(function(){
        $('#availableDrivers').empty();
        var Drivers = Parse.Object.extend('Driver');
        var query = Parse.Query(Drivers);
        query.equalTo('eventID', $('#riderEventSelect').val());
        query.find({
          success: function(results){
            for (var i = 0; i < results.length; i++) { 
              var driver = results[i];
              $('#availableDrivers').append(
                  '<option value=' + driver.objectId + '>' + driver.name + '</object>'
                );
            }
          },
          error: function(error){
            console.log(error);
          }
        })
    });
    $('#driverSignUpSubmit').on('click', function(){
        var fbEventID = $('#driverSignUpForm select.EventsDropdownForm').val();
        var numSeats = $('#driverSignUpForm input').val();
        var Drivers = Parse.Object.extend('Driver');
        var query = new Parse.Query(Drivers);
        query.equalTo('eventID', fbEventID);
        query.equalTo('DriverID', Parse.User.current());
        // check if this user already signed up for this ride, if they did then ya
        query.first({
          success: function(object){
              if (object){
                console.log('user already signed up for this');
                // add a prompr for user
              } else {
                var newRide = new Drivers();
                newRide.set('DriverID', Parse.User.current());
                newRide.set('eventID', fbEventID);
                newRide.set('Seats', numSeats);
                newRide.save(null, {
                  success: function(response){
                    //do stuff
                  },
                  error: function(error){
                    // do stuff
                  }
                });
              }
          }
        })
    })
});

function getEventObject(eventID){
  var Events = Parse.Object.extend('Event');
  var query = Parse.Query(Events);
}