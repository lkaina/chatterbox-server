$(function(){

  var displayChats = function(dataObject){

    // each message instantiated as BB model, call render
    //   - var chat = new Chat({dataObject[0]});
    //   - var cv = new ChatView({model: chat}).render();
    //   - put models into BB collection
    //   - add collection view, render collection which renders each model view in turn
    var $chats = $('#chats');
    $('#chats').html('');
    var roomname = $('#roomField').val();
    var messages = dataObject.results;
    if(roomname !== ''){
      messages = _.filter(dataObject.results, function(result){
        console.log(result.roomname);
        if(result.roomname === roomname){
          return { text: result.text, username: result.username, roomname: result.roomname };
        }
      });
    }
    var len = messages.length;
    len = (len > 8) ? 8 : len;

    for( var i = 0; i < len; i++ ){
      var username = JSON.stringify(messages[i].username);
      if( username ){
        username = username.slice(1, -1);
      }
      var $userHTML = $('<span>').addClass(username).text(username);
      var message = JSON.stringify(messages[i].text);
      roomname = JSON.stringify(messages[i].roomname);
      // var $newHTML = $('<div>').addClass('msg').text("says " + message + " in " + roomname);
      var $newHTML = $('<div>').addClass('msg').text(message);
      $newHTML.prepend($userHTML.append("<br>"));
      $chats.append($newHTML.append("<hr>"));
    }
  };

  var getChats = function(){
    $.ajax({
      url: 'http://127.0.0.1:8081/classes/chatterbox',
      type: 'GET',
      dataType: 'jsonp',
      contentType: 'application/jsonp',
      data: {
        order: '-createdAt'
      },
      success: function(data){
        displayChats(data);
        console.log("chatterbox: Messages received");
      },
      error: function(data){
        console.log("ERROR: ", data);
      }
    });
  };

  var usernameIndex = window.location.href.indexOf("username=");
  var username = window.location.href.slice(usernameIndex + 10);

  $('#submitButton').on('click', function(){
    var messageRoom = $('#roomField').val();
    var messageText = $('#textField').val();
    var message = { 'username': username, 'text': messageText, 'roomname': messageRoom };
    $('#textField').val('');
    $.ajax({
      url: 'http://127.0.0.1:8081/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/jsonp',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  });

  $('#refreshButton').on('click',function(){
    getChats();
  });

  $('#chats').on('click', 'span', function(){
    var username = "." + $(this).text();
    $(username).toggleClass('friend');
  });
});
