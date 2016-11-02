"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

$(document).ready(function(){
  $("#search").on('submit', function(event){
    event.preventDefault();
    buildData();
  });
});


  function buildData(){

    var data = {
      format: "json",
      output: "full",
      key: apiKey,
    };

    var searchInput = $('#location').val();
    var zipCode = searchInput.replace(/\D/g, ''); //Note: zip code is required

    if (zipCode.length === 5){
      data.location = zipCode;
    } else {
      console.log('enter complete zip code');
      Materialize.toast('Please enter a valid zip code', 4000);
      return;
    }
    getResults(data);
  }


    function getResults(data){
      $.ajax({
        url:'http://api.petfinder.com/pet.find',
        jsonp: "callback",
        dataType:"jsonp",
        data: data,
        type: 'get',
        success: function(data){
          console.log('success');
        }
      });
    }
  
