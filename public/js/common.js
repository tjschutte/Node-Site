/**
 * Created by Tom on 1/29/2017.
 */

window.onload = function date() {
  var element = document.getElementById('YEAR');
  var d = new Date();
  element.innerText = "Page created using Bootstrap 3 - Copyright " + d.getFullYear() + " - Tom Schutte"
};