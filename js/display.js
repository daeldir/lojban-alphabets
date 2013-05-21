/* Prepare text to be printed in HTML. 
 */
var format = function (text) {
  return '<p>'+text.replace(/\n/g, '</p>\n<p>')+'</p>';
};

/* Update a mode display by translating the text given as argument and putting
 * it in the HTML element associated with the mode.
 */
var update = function (mode, text) {
  $('#'+mode).html(format(to[mode](text)));
};

/* For each mode implemented, convert the text and display it in the
 * wanted element. 
 */
var updateModes = function () {
  for (var mode in to) update(mode, $('#input').prop('value'));
}

/* Create an element to display translated text in the given mode.
 */
var appendDisplay = function (mode) {
  $('#display').append($('<h2>'+mode+' Mode</h2>'))
               .append($('<div>', {id: mode}));
};

/* For each mode implemented, create an element to display the results.
 */
var prepareModes = function () {
  for (var mode in to) appendDisplay(mode);
}

/* Prepare the page and the events.
 */
$(function() {
  prepareModes();
  updateModes();
  $('#input').on('keyup', updateModes);
});

