$(document).ready(function(){
    $('#riderEventSelect').change(function(){
        $('#availableDrivers').empty();
        var Drivers = Parse.Object.extend('Driver');
        var query = Parse.Query(Drivers);
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
});