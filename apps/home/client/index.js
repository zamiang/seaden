module.exports = class HomeView {

  constructor(options) {
    this.log(options);
  }

  static create(options) {
    return new HomeView(options);
  }

  log(text) {
    console.log(text);
  }

};
