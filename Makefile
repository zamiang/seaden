BIN = node_modules/.bin
CDN_DOMAIN_production = TODO
CDN_DOMAIN_staging = TODO

test: assets-fast
	$(BIN)/mocha $(shell find test -name '*.js' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find components/*/test -name '*.js' -not -path 'test/helpers/*')
	$(BIN)/mocha $(shell find apps/*/test -name '*.js' -not -path 'test/helpers/*')

assets-fast:
	$(foreach file, $(shell find assets -name '*.coffee' | cut -d '.' -f 1), \
		$(BIN)/browserify --fast $(file).js -t jadeify -u config.js > public/$(file).js; \
	)
	$(BIN)/stylus assets -o public/assets

# Start the server
s:
	$(BIN)/node index.js
