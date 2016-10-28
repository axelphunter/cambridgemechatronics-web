var app = {
  init: function() {
    new WOW().init();
  },

  socialShare: {
    twitter: function(url) {
      window.open('https://twitter.com/home?status=' + url);
    },
    facebook: function(url) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + url);
    },
    googlePlus: function(url) {
      window.open('https://plus.google.com/share?url=' + url);
    },
    linkedin: function(url, title, text) {
      window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + text);
    },
    pinterest: function(url, image, text) {
      window.open('https://pinterest.com/pin/create/button/?url=' + image + '&media=' + url + '&description=' + text);
    },
    reddit: function(title, url) {
      window.open('http://www.reddit.com/submit?url=' + url + '&title=' + title);
    },
    email: function(title, url) {
      window.open('mailto:?&subject=' + title + '&body=' + title + ': ' + url);
    }
  }
};

app.init();
