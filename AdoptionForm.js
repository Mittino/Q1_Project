"use strict";
(function(){


  $(document).ready(function(){
    $('select').material_select();

    $('#adoptionForm').on('submit', function(event){
      event.preventDefault();
      submitApplication();
    });

  });


  function submitApplication(){
    var name = $('#name').val();
    console.log(name.length);
    if (name.length === 0){
      Materialize.toast('Please Enter Your Full Name', 4000);
    }
    else if ($("#phone").val().replace(/\D/g, '').length !== 10){
      Materialize.toast('Please Enter a Valid Phone Number', 4000);
    } else if ($("#dogname").val().length === 0){
      Materialize.toast('Please Enter a Valid Dog Name', 4000);
    }
    else if ($("#shelterId").val().length !== 5){
      Materialize.toast('Please Enter a Valid Shelter Id', 4000);
    }
    else Materialize.toast('Thank you for your application!', 4000);
  }

})();
