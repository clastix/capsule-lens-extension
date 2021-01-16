PATH := node_modules/.bin:$(PATH)

build: node_modules
	webpack --config webpack.config.js --mode=production

dev: node_modules
	webpack --config webpack.config.js --mode=development --watch

lint: node_modules
	eslint --report-unused-disable-directives src

lint-fix: node_modules
	eslint --report-unused-disable-directives --fix src

install:
	ln -sT "$(PWD)" "${HOME}/.k8slens/extensions/capsule"

node_modules: package.json
	npm install && touch $@