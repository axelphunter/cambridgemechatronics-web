var app = {
  init: function() {
    new WOW().init();
  },

  socialShare: {
    twitter(url) {
      window.open('https://twitter.com/home?status=' + url);
    },
    facebook(url) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + url);
    },
    googlePlus(url) {
      window.open('https://plus.google.com/share?url=' + url);
    },
    linkedin(url, title, text) {
      window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + text);
    },
    pinterest(url, image, text) {
      window.open('https://pinterest.com/pin/create/button/?url=' + image + '&media=' + url + '&description=' + text);
    },
    reddit(title, url) {
      window.open('http://www.reddit.com/submit?url=' + url + '&title=' + title);
    },
    email(title, url) {
      window.open('mailto:?&subject=' + title + '&body=' + title + ': ' + url);
    }
  }
};

app.init();
