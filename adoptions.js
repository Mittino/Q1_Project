"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

$(document).ready(function(){

  $("#search").on('submit', function(event){
    event.preventDefault();
    buildData();
  });

  $('select').material_select();


});



function buildData(){

  var data = {
    format: "json",
    output: "full",
    key: apiKey,
    animal: "dog",
  };

  var searchInput = $('#location').val();
  var zipCode = searchInput.replace(/\D/g, '');

  if (zipCode.length === 5){
    data.location = zipCode;
  } else {
    console.log('enter complete zip code');
    //TODO: create Toast Msg for incomplete zip code
    return;
  }

  var size = $('#size').val();
  console.log(size);
  if(!_.isNil(size)){
    data.size = size;
  }


  console.log(data);
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
      console.log(data);
    }
  });
}
