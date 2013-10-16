$(function(){

  var displayChats = function(dataArray){
    var $chats = $('#chats');
    $('#chats').html('');
    var roomname = $('#roomField').val();
    var messages = dataArray;
    if(roomname !== ''){
      for( var j = 0; j < messages.length; j++ ){
        var result = messages[j];
        if(result.roomname === roomname){
          return { text: result.text, username: result.username, roomname: result.roomname };
        }
      }
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
      var $newHTML = $('<div>').addClass('msg').text(message);
      $newHTML.prepend($userHTML.append("<br>"));
      $chats.append($newHTML.append("<hr>"));
    }
  };

  var getChats = function(){
    var roomName = $('#roomField').val();
    $.ajax({
      url: 'http://127.0.0.1:8081/index.html/classes/'+roomName,
      type: 'GET',
      contentType: 'application/json',
      success: function(data){
        displayChats(data);
        console.log("chatterbox: Messages received", data);
      },
      error: function(data){
        console.log("ERROR: ", data);
      }
    });
  };

  var usernameIndex = window.location.href.indexOf("username=");
  var username = window.location.href.slice(usernameIndex + 9);

  $('#submitButton').on('click', function(){
    var messageRoom = $('#roomField').val();
    var messageText = $('#textField').val();
    var message = { 'username': username, 'text': messageText, 'roomname': messageRoom };
    $('#textField').val('');
    $.ajax({
      url: 'http://127.0.0.1:8081/index.html/classes/'+messageRoom,
      type: 'POST',
      data: JSON.stringify(message),
      dataType: 'json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
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
