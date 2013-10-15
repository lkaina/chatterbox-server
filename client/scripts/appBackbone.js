/*

*Friending functionality not yet addressed.

Chat View = Backbone view to show individual message (and its relevant info such as username, text, roomname, and createdAt).

App View = Backbone view to show multiple message views. App view will also trigger events when user submits a new message or user enters a room name.

Chat Model = Backbone model containing individual message data.

Chat Collection = Backbone collection containing multiple message models. Chat collection will trigger event after fetching data from server. The event will tell App View to update.

*/

$(function(){

  var ChatRouter = Backbone.Router.extend({
    routes: {
      "rooms/:roomname": "enterRoom",
      "users/:username": "sortUser"
    }
  });

  var chatRouter = new ChatRouter();
  Backbone.history.start();

  chatRouter.on('route:enterRoom', function(roomname){
    appView.showRoom(roomname);
  });
  chatRouter.on('route:sortUser', function(username){
    appView.friendsRoom(username);
  });

  var Chat = Backbone.Model.extend({
    url: 'http://127.0.0.1:8081/1/classes/chatterbox'
  });

  var ChatCollection = Backbone.Collection.extend({
    url: 'http://127.0.0.1:8081/1/classes/chatterbox',
    model: Chat,

    parse: function(response){
      return response.results;
    },

    initialize: function(){
      this.refreshData();
    },

    refreshData: function(){
      this.fetch({
        data: {
          order: '-createdAt'
        }
      });
    },

    saveMsg: function(msg){
      var usernameIndex = window.location.href.indexOf("username=");
      var username = window.location.href.slice(usernameIndex + 9);
      msg = new Chat({ username: username, text: msg, room: 'HR' });
      msg.save();
    }
  });

  var ChatView = Backbone.View.extend({

    render: function(){
      var username = this.model.escape('username') || 'anonymous';
      var text = this.model.escape('text');
      $(this.el).addClass("msg").html('<span class="' + username + '">' + username + '</span><br>' + text + '<hr>');
      return this;
    }
  });

  var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click #submitButton': 'sendChat',
      'click #refreshButton': 'refreshApp',
      'click span': 'friendsOn'
    },

    initialize: function(){
      this.collection = new ChatCollection();
      this.collection.on("add", this.appendChat);
      this.render();
    },

    render: function(){
      var self = this;
      _(this.collection.models).each(function(chat){
        self.appendChat(chat);
      }, this);       // Maybe we don't need 'this' here...
    },

    sendChat: function(){
      this.collection.saveMsg($('#textField').val());
      $('#textField').val('');
      this.refreshApp();
    },

    appendChat: function(chat){
      var chatView = new ChatView({
        model: chat
      });
      $('#chats').append(chatView.render().el);
    },

    refreshApp: function(){
      $('#chats').html('');
      this.collection.refreshData();
    },

    friendsOn: function(event){
      var username = $(event.target)[0].className;
      $('.' + username).toggleClass('friend');
    },

    friendsRoom: function(friendName){
      $('.' + friendName).toggleClass('friend');
    },

    showRoom: function(roomname){
      console.log(this.collection);
    }
  });

  var appView = new AppView();

});
