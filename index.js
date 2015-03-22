"use strict";

var args = require('minimist')(process.argv.slice(2)),
	path = require('path'),
	fs = require('fs'),
	pls = 'Please specify ',
	rename = function(currentCallPath){

		var currentDirPath = path.normalize(currentCallPath || args.path);

		fs.readdir(currentDirPath, function(err, filesNames){

			if(err){
				console.log(pls + 'path properly, %s can\'t be found.', path);
				return;
			}

			filesNames.forEach(function(name){

				var currentFilePath = path.normalize(currentDirPath + '/' + name);

				fs.lstat(currentFilePath, function(err, state){

					if(err){
						console.log(err);
						return;
					}

					if(state.isDirectory()){
						rename(currentFilePath);
					} else {
						renameFile(currentFilePath);
					}

				});

			});

		});

	},
	renameFile = function(p){

		if(~p.indexOf(args.old)) {

			var re = new RegExp(args.old, 'g'),
				newName = p.replace(re, args.new);

			fs.rename(p, newName, function(err){

				if(err){
					console.log(err);
					return;
				}

				console.log('%s renamed to %s', p, newName);

			});

		}

	};

if(!args.path){
	console.log(pls + 'path.');
	return;
}

if(!args.old){
	console.log(pls + 'string to change.');
	return;
}

if(!args.new){
	console.log(pls + 'new string.');
	return;
}

rename(args.path);
