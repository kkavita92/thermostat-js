$( document ).ready(function() {
  var thermostat = new Thermostat();
  var city;

  $('#search-city').on('change paster', function(){
    city = $('#search-city').val();
    displayWeather(city);
  });

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
    var token = '&appid=a012ce56b3fea36ffd408256d4eeb21a';
    var units = '&units=metric';
    $.get(url + city + token + units, function(data) {
      $('#local-temperature').text(data.main.temp + '℃');
      $('#local-weather-icon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
      $('#local-weather-description').text(data.weather[0].description);
    });
  }

  function updateTemperature() {
    $('#temperature>p').text(thermostat.temperature());
    $('#temperature>p').attr('class', thermostat.currentEnergyUsage());
  }

  function updatePowerSaving() {
    switch(thermostat.isPowerSaving()) {
      case true:
        return 'on';
      case false:
        return 'off';
    }
  }

  function updateEnergyUsage() {
    $('#energy > p').text(thermostat.currentEnergyUsage());
  }

  function updateThermometer() {
    $('#temperature > p').css("width", thermostat.temperature() + '%');
  }

  updateTemperature();

  $('#temp-up').on('click', function(){
    thermostat.increaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#temp-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#temp-reset').on('click', function() {
    thermostat.resetTemperature();
    updateTemperature();
    updateThermometer();
    updateEnergyUsage();
  });

  $('#toggle-power-saving').on('click', function() {
    thermostat.togglePowerSaving();
    updateTemperature();
    $('#toggle-power-saving > i').attr('class', 'fa fa-toggle-' + updatePowerSaving());
  });
});
