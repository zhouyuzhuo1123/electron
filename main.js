'use strict';
var electron = require('electron');
var { app } = electron;
var { BrowserWindow } = electron;
var path = require('path')
var mainWindow = null;


app.on('ready', function() {
    mainWindow  = new BrowserWindow({width: 500, height: 960})
    mainWindow.loadURL('file://' + __dirname + './index.html');
});







