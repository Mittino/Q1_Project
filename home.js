"use strict";
(function(){

  var apiKey = "7e3c2eb42f00b573ab85a0e4f1d4a9ca";

  $(document).ready(function(){
    $('.slider').slider({full_width: true});
    $('select').material_select();
    $('.modal-trigger').leanModal();
  });


  getResults();

  function getResults(data){
    var info = {
      format: "json",
      output: "full",
      key: apiKey,
      animal: "dog",
    };

    $.ajax({
      url:'http://api.petfinder.com/pet.getRandom',
      jsonp: "callback",
      dataType:"jsonp",
      data: info,
      type: 'get',
      success: function(data){
        console.log(data);
        buildFeaturedPet(data);
      }
    });
  }

  function buildFeaturedPet(data){
    var photos = data.petfinder.pet.media.photos.photo;
    var photo = photos[2].$t;

    if (photos[2].$t !== undefined){
      photo = photos[2].$t;
    } else {
      photo = "photounavailable.png";
      console.log(photo);
    }

    $('#featuredPet').append(

      '<div class="card medium">' +
        '<div class="card-image feature-image" style="background-image: url('+ photo + ')">'+

        '</div>' +
        '<a class="waves-effect waves-light btn modal-trigger valign" href="#modal1">' +
          '<p>' + data.petfinder.pet.name.$t + '</p>' +
        '</a>'+
          '<div id="modal1" class="modal">' +
            '<div class="modal-content">' +
              '<h4>' + data.petfinder.pet.name.$t + '</h4>' +
              '<p> Age: '+ data.petfinder.pet.age.$t + '</p>' +
              '<p> Size: '+ data.petfinder.pet.size.$t + '</p>' +
              '<p> Description: '+ data.petfinder.pet.description.$t + '</p>' +
              '<p> State: '+ data.petfinder.pet.contact.state.$t + '</p>' +
              '<p> Contact: '+ data.petfinder.pet.contact.email.$t + '</p>' +
              '<p> Shelter ID: '+ data.petfinder.pet.shelterId.$t + '</p>' +
              '<img src=' + photo + '>' +
            '</div>' +
          '</div>' +
      '</div>'
      );
      $('.modal-trigger').leanModal();
  }


})();
