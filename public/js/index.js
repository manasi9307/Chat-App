var socket = io();
socket.on('connect', function () {
  console.log('Connected to the Server');

// socket.emit('createEmail',{
//   to:"erik@example.com",
//   text:"Hey erik"
// });

// socket.emit('createMessage',{
//   to:'Server',
//   text:'hello from chrome'
// });
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#render-message').append(li);
});

// socket.on('newEmail', function (email) {
//   console.log('New Email', email);
// });
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi, there'
// }, function(data) {
//   console.log(data);
// });


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault(); //prevents default page behaviour
  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  }, function() {

  });

});


var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported');
  }
 navigator.geolocation.getCurrentPosition( function (position) {
 socket.emit('createLocationMessage', {
   latitude:position.coords.latitude,
   longitude:position.coords.longitude
 });
 }, function() {
   alert('Unable to fetch the position');
 });

});
