"use strict";
var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

$(document).ready(function(){
  $("#search").on('submit', function(event){
    event.preventDefault();
    buildData();
  });
   $(".button-collapse").sideNav();
   $('#location').focus();
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
      $('#shelters').empty();
      console.log(data);
      var i;
      var template = [];
      for (i=0; i<data.length; i++){
        template.push(
          '<div class="col s12 m6">' +
            '<div class="card horizontal">' +
              '<div class="card-stacked">' +
                '<div class="card-content">' +
                  '<h4>'+ data[i].name.$t + '</h4>'
        );
        if (data[i].city.$t) {
          template.push('<p class="text"> City: '+ data[i].city.$t + '</p>');
        } if (data[i].email.$t){
          template.push('<p class="text"> Email: '+ data[i].email.$t + '</p>');
        } if (data[i].phone.$t){
          template.push('<p class="text"> Phone: '+ data[i].phone.$t + '</p>');
        } if (data[i].id.$t){
          template.push('<p class="text"> Shelter ID: '+ data[i].id.$t + '</p>');
        }
        template.push(
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      }
      $('#shelters').append(template.join(''));
    }
