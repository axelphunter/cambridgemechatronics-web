var app = {
  init: function() {
    new WOW().init();

    var percentage = document.querySelector('.js_percentage');

    lory(percentage, {infinite: 1});

    if (document.querySelector('.js_next')) {
      window
        .setInterval(function() {
          document
            .querySelector('.js_next')
            .click();
        }, 5000);
    }
  }
};

app.init();
