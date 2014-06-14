
BROWSERS="ie6..11"
BINS=node_modules/.bin
URL=http://localhost:3000/test
P=$(BINS)/mocha-phantom
DUO=$(BINS)/duo
S=$(BINS)/serve
G=$(BINS)/gravy

build: node_modules index.js test/test.js
	@$(DUO) test/test.js build/build.js --development

test: server build
	@open $(URL)

test-phantom: server build
	@$(P) $(URL)

test-sauce: server build
	@BROWSERS=$(BROWSERS) $(G) \
		--url $(URL)

node_modules: package.json
	@npm install

server: kill
	@$(S) . &> /dev/null & echo $$! > test/pid
	@node test/server &> /dev/null & echo $$! > test/server-pid
	@sleep 1

kill:
	@-test -e test/pid && kill `cat test/pid`
	@-test -e test/server-pid && kill `cat test/server-pid`
	@rm -f test/pid test/server-pid

clean: kill
	rm -rf components build

.PHONY: clean test test-phantom test-sauce

