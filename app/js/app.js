var app = {
  init: function() {
    document
      .querySelector('.hamburger')
      .onclick = function() {
      this
        .classList
        .toggle('is-active');
      var sitenavigation = document.querySelector('.sitenavigation');
      if (sitenavigation.classList.contains('fadeInRight')) {
        sitenavigation
          .classList
          .remove('fadeInRight');
        sitenavigation
          .classList
          .add('fadeOutRight');
        window.setTimeout(function() {
          sitenavigation
            .classList
            .remove('active');
        }, 500);
        return;
      }
      sitenavigation
        .classList
        .add('active')
      sitenavigation
        .classList
        .remove('fadeOutRight');
      sitenavigation
        .classList
        .add('fadeInRight')
    }

    if (window.location.hash) {
      var i = 0;
      var hash = window.location.hash;
      hash = hash.replace('#', '');
      var el = document.getElementById(hash);
      var offsetTop = el.offsetTop;
      setTimeout(function() {
        window.scrollTo(0, offsetTop - 100);
      }, 1);
    }

    if (document.querySelector('.news-item')) {
      var newsItems = document.querySelectorAll('.news-item'),
        loadMoreBtn = document.querySelector('#load-more-articles');
      if (!loadMoreBtn) {
        return;
      }
      var maxItems = 9,
        hiddenClass = 'visually-hidden';
      []
        .forEach
        .call(newsItems, function(item, idx) {
          if (idx > maxItems - 1) {
            item
              .classList
              .add(hiddenClass);
          }
        });

      loadMoreBtn.addEventListener('click', function() {

        []
          .forEach
          .call(document.querySelectorAll('.' + hiddenClass), function(item, idx) {
            if (idx < maxItems) {
              item
                .classList
                .remove(hiddenClass);
            }

            if (document.querySelectorAll('.' + hiddenClass).length === 0) {
              loadMoreBtn.style.display = 'none';
            }

          });

      });
    }

    new WOW().init();

    var textToggle = document.querySelectorAll('.toggle-text');
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
    if (document.querySelector('.js_percentage')) {
      var percentage = document.querySelector('.js_percentage');

      lory(percentage, {infinite: 1});
    }
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
