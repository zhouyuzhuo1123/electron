'use strict';
var electron = require('electron');
var { app } = electron;
var { BrowserWindow } = electron;
var path = require('path')
var mainWindow = null;


// grunt 打包是 安装 更新 卸载是 生成桌面快捷方式
var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }
  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }
    // 安装
  function install() {
    var cp = require('child_process');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
   // 卸载
   function uninstall() {
    var cp = require('child_process');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};
if (handleStartupEvent()) {
  return;
}
app.on('ready', function() {
    mainWindow  = new BrowserWindow({width: 500, height: 960})
    mainWindow.loadURL('file://' + __dirname + './index.html');
});







