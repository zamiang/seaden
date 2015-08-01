_ = require('underscore');

module.exports = class PostsView {

  constructor(options) {
    this.log(options);
  }

  static create(options) {
    return new PostsView(options);
  }

  log(text) {
    console.log(text);
  }

};
