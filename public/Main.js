const {app, BrowserWindow} = require('electron')      
const exec = require('child_process').exec
function createWindow() {   
  win = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })


  win.maximize()
  win.loadURL("http://localhost:3000")

}      

app.on('ready', createWindow)
