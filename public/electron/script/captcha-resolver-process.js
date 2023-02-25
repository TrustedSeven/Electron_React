const { BrowserWindow, session, BrowserView } = require("electron");
const path = require("path");

class CaptchaResolverProcess {
  constructor(
    captchaSite,
    captchaID,
    captchaTitle,
    captchaProxy,
    captchaSolver,
    parentWindow
  ) {
    this.site = captchaSite;
    this.solver = captchaSolver;
    this.id = captchaID;
    this.proxy = captchaProxy;
    this.win = null;
    this.status = "";
    this.isLaunched = true;
    this.parentWindow = parentWindow;
    this.title = captchaTitle;
    this.createCaptchaWindow();
  }

  createCaptchaWindow() {
    this.win = new BrowserWindow({
      width: 400,
      height: 485,
      minWidth: 400,
      minHeight: 485,
      resizable: true,
      fullscreenable: false,
      title: this.title,
      icon: path.resolve(__dirname, "logo.svg"),
      show: false,
      transparent: true,
      frame: false,
      parent: this.parentWindow,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    this.view = new BrowserView({
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        contextIsolation: false,
        session,
        partition: `persist:task_id_${this.id}`,
        images: this.images,
      },
    });
    this.view.setBounds({
      x: 0,
      y: 60,
      width: 336,
      height: 485 + 60,
    });
    this.view.setAutoResize({ width: true, height: true });
    this.win.loadURL(`file://${path.join(__dirname, "../captcha.html")}`);
  }

  minimizeChild() {
    this.win.minimize();
  }

  closeChild() {
    this.win.hide();
    this.isLaunched = false;
  }

  open() {
    this.win.show();
    this.isLaunched = true;
  }
  sendMessage(channel, msg, color) {
    this.parentWindow.webContents.send(channel, msg, color);
  }

  destroyWindow() {
    this.win.destroy();
  }
}

module.exports = CaptchaResolverProcess;
