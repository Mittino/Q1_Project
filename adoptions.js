"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

$(document).ready(function(){

  $("#search").on('submit', function(event){
    event.preventDefault();
    console.log('hello');
    getResults();
  });

  $('select').material_select();


});


function getResults(){

  var data = {
    format: "json",
    output: "full",
    key: apiKey,
    animal: "dog",
  };

  var searchInput = $('#location').val();
  var zipCode = searchInput.replace(/\D/g, '');
  console.log(zipCode);
  if (zipCode.length < 5 || zipCode.length > 5){
    console.log('enter complete zip code');
  } else if (zipCode.length === 5){
    data.location = zipCode;
  }

  console.log(data);

  // $.ajax({
  //   url:'http://api.petfinder.com/pet.find' + searchLocation,
  //   jsonp: "callback",
  //   dataType:"jsonp",
  //   data: data,
  //   type: 'get',
  //   success: function(data){
  //     console.log(data);
  //   }
  // });
}
