'use strict';

var app = {

  init: function init() {
    app.menu();
  },

  menu: function menu() {
    document.getElementById('nav').onclick = function () {
      this.classList.toggle('open');
    };
  }

};

app.init();