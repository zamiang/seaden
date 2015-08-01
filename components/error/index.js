//
// Error pages
//

let routes = require('./routes.js');

// Awkward b/c we can't have root apps use sub-apps error handlers.
// See this thread: https://github.com/visionmedia/express/issues/1522
module.exports = (app, template) => {
  routes.template = template;
  app.use(routes.pageNotFound);
  app.use(routes.internalError);
};
