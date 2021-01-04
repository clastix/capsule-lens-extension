PATH := node_modules/.bin:$(PATH)

build: node_modules
	webpack --config webpack.config.js --mode=production

dev: node_modules
	webpack --config webpack.config.js --mode=development --watch

install:
	ln -s "$(PWD)" "${HOME}/.k8slens/extensions/capsule"

node_modules: package.json
	npm install && touch $@