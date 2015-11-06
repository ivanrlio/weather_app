$(function(){

  //api key: a7dd409139394fb2

  $('#searchWeather').on('click', function(){
    var query = $('#queryCity').val();
    $.ajax({
      url: "http://autocomplete.wunderground.com/aq?query=" + query,
      dataType: 'jsonp',
      jsonp: 'cb',
      success: function(parsed_json){
        $('#displayCityQuery li').remove();
        var cities = [parsed_json][0]["RESULTS"];
        cities.forEach(function(city){
          $('<li>')
            .append($('<button>')
              .data('id', city.l)
              .addClass('queryButtons')
              .text(city.name))
          .appendTo('#displayCityQuery');

        });
      }
    });   
  });

  $('#displayCityQuery').on('click', 'button.queryButtons', function(){
    var uniqQuery = $(this).data('id');
    $.ajax({
      url: "http://api.wunderground.com/api/a7dd409139394fb2/forecast" + uniqQuery + ".json",
      jsonp: 'cb',
      success: function(parsed_json){
        $('#weatherOfCity p').remove();
        var conditions = parsed_json['forecast']['simpleforecast']['forecastday'];
        $('<p>')
          .addClass('theWeatherOfCity')
          .text(conditions[0].high.celsius)
          .appendTo('#weatherOfCity');
      }
    });
  });


});

