var app = {
  init: function() {
    new WOW().init();

    var percentage = document.querySelector('.js_percentage');

    lory(percentage, {infinite: 1});
  }
};

app.init();
