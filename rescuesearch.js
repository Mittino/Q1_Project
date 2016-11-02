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
        url:'http://api.petfinder.com/shelter.find',
        jsonp: "callback",
        dataType:"jsonp",
        data: data,
        type: 'get',
        success: function(data){
          var shelters = data.petfinder.shelters.shelter;
          buildResults(shelters);
        }
      });
    }

    function buildResults(data){
      console.log(data);
      var i;
      for (i=0; i<data.length; i++){

        $('#shelters').append(

          '<div class="col s12 m6">' +
          '<div class="card horizontal">' +
            '<div class="card-stacked">' +
              '<div class="card-content">' +
                '<h4>'+ data[i].name.$t + '</h4>' +
                '<p class="text"> City: '+ data[i].city.$t + '</p>' +
                '<p class="text"> Email: '+ data[i].email.$t + '</p>' +
                '<p class="text"> Phone: '+ data[i].phone.$t + '</p>' +
                '<p class="text"> Shelter ID: '+ data[i].id.$t + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' );
      }
    }
