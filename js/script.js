$(window).load(function(){
    if($("#EventsDropdown").length == 0){
        getAndLoadEvents();
    }


    $('#riderEventSelect').change(function(){
        $('#availableDrivers').empty();
        var Drivers = Parse.Object.extend('Driver');
        var query = new Parse.Query(Drivers);
        
        query.equalTo('eventID', $('#riderEventSelect').val());
        query.find({
          success: function(results){
            for (var i = 0; i < results.length; i++) { 
              var driver = results[i];
              var dID = driver.get("DriverID");
              var uquery = new Parse.Query(Parse.User);

              uquery.equalTo('objectId', dID);
              uquery.first({
                success: function(object){
                  $('#availableDrivers').append(
                  '<option value=' + object.id + '>' + object.get('name') + '</object>'
                  );
                }
              })
            };
          },
          error: function(error){
            console.log(error);
          }
        })
    });
    $('#availableDrivers').change(function(){
        $('#seatsAvailable').text('Getting Number of seats available...')
        var Drivers = Parse.Object.extend('Driver');
        var query = new Parse.Query(Drivers);
        query.equalTo('DriverID', $('#availableDrivers').val());
        query.equalTo('eventID', $('#riderEventSelect').val());
        query.first({
            success: function(object){
                var totalSeats =  object.get("Seats");
                var rideQuery = new Parse.Query(Parse.Object.extend('RidingWith'));
                rideQuery.equalTo('DriverID', $('#availableDrivers').val());
                rideQuery.equalTo('EventID', $('#riderEventSelect').val());
                rideQuery.find({
                    success: function(results){
                        remainingSeats = totalSeats - results.length;
                        $('#seatsAvailable').text('Remaining seats ' + remainingSeats);
                    }
                });
            }
        });
    });
    $('#riderSignUpSubmit').on('click', function(){
        var fbEventID = $('#riderEventSelect').val();
        var driverID = $('#availableDrivers').val();
        var rWith = Parse.Object.extend('RidingWith');
        var q = new Parse.Query(rWith);
        q.equalTo('DriverID', driverID);
        q.equalTo('EventID', fbEventID);
        q.equalTo('PassengerID', Parse.User.current().id);
        q.first({
            success: function(object){
                if (object){
                    console.log('user already signed up for this ride');
                    // add prompt to user
                } else {
                    var ride = new rWith();
                    ride.set('DriverID', driverID);
                    ride.set('EventID', fbEventID);
                    ride.set('PassengerID', Parse.User.current().id);
                    ride.save(null,{
                        success: function(response){
                            console.log("woohoo");
                            $('.modal').modal('hide');
                        },
                        error: function(error){
                            console.log('shit');
                            console.log(error);
                        }
                    });
                }
            }
        })
    });  
    $('#driverSignUpSubmit').on('click', driverSignUp(null));
});

$(document).on('click', '.beadriver', function(event) {
    var eID = event.target.id;
    console.log("beadriverclicked " + eID);
    var options = $('#driverSignUpForm').children('select').children('option');
    var option = options.find("[value='" + eID + "']");
    //alert(option.attr("value")); //undefined
    option.prop('selected', true);
});

function getEventObject(eventID){
  var Events = Parse.Object.extend('Event');
  var query = Parse.Query(Events);
}

function driverSignUp(param) {
    var fbEventID = $('#driverSignUpForm select.EventsDropdownForm').val();
    var numSeats = parseInt($('#driverSignUpForm input').val());
    var Drivers = Parse.Object.extend('Driver');
    var query = new Parse.Query(Drivers);
    query.equalTo('eventID', fbEventID);
    query.equalTo('DriverID', Parse.User.current().id);
    // check if this user already signed up for this ride, if they did then ya
    query.first({
      success: function(object){
          if (object){
            console.log('user already signed up for this');
            // add a prompr for user
          } else {
            var newRide = new Drivers();
            newRide.set('DriverID', Parse.User.current().id);
            newRide.set('eventID', fbEventID);
            newRide.set('Seats', numSeats);
            newRide.set('startLat', mylat);
            newRide.set('startLng', mylng);
            newRide.save(null, {
              success: function(response){
                console.log("yay");
                $('.modal').modal('hide')
              },
              error: function(error){
                console.log("noo");
                console.log(error);
              }
            });
          }
      }
    });
}