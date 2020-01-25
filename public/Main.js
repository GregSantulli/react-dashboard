const {app, BrowserWindow} = require('electron')      
const exec = require('child_process').exec
function createWindow() {   
  win = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })


  win.maximize()
  win.loadURL("http://localhost:3000")
  win.setMenu(null)
  win.show()

}      

app.on('ready', createWindow)
