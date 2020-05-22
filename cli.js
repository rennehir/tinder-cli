#!/usr/bin/env node
"use strict";
const React = require("react");
const importJsx = require("import-jsx");
const { render } = require("ink");
const meow = require("meow");

const ui = importJsx("./ui");

const cli = meow(`
	Usage
    $ tinder-cli

	Options
		--name  Your name

	Examples
    $ tinder-cli --name=Jane
    Hello, Jane
`);

render(React.createElement(ui, cli.flags));
