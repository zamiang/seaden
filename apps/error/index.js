//
// Error pages
//

routes = require('./routes.js');

this.helpers((req, res, next) => {
  routes.backboneErrorHelper(req, res, next);
});

// Awkward b/c we can't have root apps use sub-apps error handlers.
// See this thread: https://github.com/visionmedia/express/issues/1522
this.handlers((app, options) => {
  routes.template = options.template;
  app.use(routes.pageNotFound);
  app.use(routes.internalError);
});
