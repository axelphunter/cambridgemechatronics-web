var app = {
  init: function() {
    if (window.location.hash) {
      var i = 0;
      var hash = window.location.hash;
      hash = hash.replace('#', '');
      var el = document.getElementById(hash);
      var offsetTop = el.offsetTop;
      setTimeout(function() {
        window.scrollTo(0, offsetTop - 100);
        pageScroll(offsetTop);
      }, 1);
    }

    new WOW().init();

    var textToggle = document.querySelectorAll('.toggle-text');
    console.log(textToggle);
    if (textToggle.length > 0) {
      []
        .forEach
        .call(textToggle, function(toggle) {
          // do whatever
          toggle.onclick = function() {
            if (toggle.classList.contains('active')) {
              this
                .parentNode
                .querySelector('.text')
                .classList
                .remove('active');
              this.textContent = 'Read More +';
              this
                .classList
                .remove('active');
              return;
            }
            this
              .parentNode
              .querySelector('.text')
              .classList
              .add('active');
            this.textContent = 'Close x';
            this
              .classList
              .add('active');
          };
        });
    }

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
nit();
