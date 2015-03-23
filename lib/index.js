"use strict";

var path = require('path'),
	fs = require('fs'),
	pls = 'Please specify ',
	wereChanged = 0,
	_path = null,
	_old = null,
	_new = null;

function rename(currentCallPath, oldStr, newStr){

	_path = currentCallPath;

	if(!_old && oldStr){
		_old = oldStr;
	}

	if(!_new && newStr){
		_new = newStr;
	}

	if(!_path){
		console.log(pls + 'path.');
		return;
	}

	if(!_old){
		console.log(pls + 'string to change.');
		return;
	}

	if(!_new){
		console.log(pls + 'new string.');
		return;
	}

	var currentDirPath = path.normalize(_path);

	fs.readdir(currentDirPath, function(err, filesNames){

		if(err){
			console.log(pls + 'path properly, %s can\'t be found.', currentDirPath);
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

	return false;

};

function renameFile(p){

	if(~p.indexOf(_old)) {

		var re = new RegExp(_old, 'g'),
			newName = p.replace(re, _new);

		fs.rename(p, newName, function(err){

			if(err){
				console.log(err);
				return;
			}

			wereChanged = 1;

			console.log('%s renamed to %s', p, newName);

		});

	}

};

module.exports = {
	rename:rename
};
