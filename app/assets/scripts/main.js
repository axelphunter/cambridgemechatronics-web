var app = {

  init: function() {
    app.menu();

  },

  menu: function() {
    document.getElementById('nav')
      .onclick = function() {
        this.classList.toggle('open');
      };
  }

};

app.init();
