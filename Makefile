install:	
	make install-deps
	make install-types

install-deps:
	npm install

install-types:
	npm run flow-typed install
	
start:
	npm run nodemon -- --exec npm run babel-node -- server/bin/slack.js

build:
	rm -rf dist
	npm run build
	
lint:
	npm run eslint
	
check-types:
	npm run flow

test:
	npm test
