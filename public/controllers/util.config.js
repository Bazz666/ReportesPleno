function messageNotification(title, mensaje, level){
    new PNotify({
        title: title,
        text: mensaje,
        type: level,
        styling: 'bootstrap3',
        width: '400px',
        delay: 4000
      });
}

/** */
//Función que permite solo Números
function isNumberKey(evt) {
  // var charCode = (evt.which) ? evt.which : event.keyCode
  // if (charCode != 45 && charCode > 31 && (charCode <= 48 || charCode > 57))
  //   return false;

  // return true;
  var t = (evt.which) ? evt.which : event.keyCode;
  return !(t > 31 && (t < 48 || t > 57));
}