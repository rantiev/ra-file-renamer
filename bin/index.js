#!/usr/bin/env node

var renamer = require('../lib/index.js'),
	args = args = require('minimist')(process.argv.slice(2));

renamer.rename(args.path, args.old, args.new);