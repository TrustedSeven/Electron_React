const { ipcMain } = require("electron");
const captchaProcess = require("./captcha-resolver-process");

class CaptchaResolverManager {
  constructor() {
    this.tasks = {};
    this.captchaInstance = {};
    this.initListener();
  }

  initListener() {
    ipcMain.on("child-close-win", (_, id) => {
      this.captchaInstance[id].closeChild();
    });
    ipcMain.on("child-minimize-win", (_, id) => {
      this.captchaInstance[id].minimizeChild();
    });
  }

  addtask(task) {
    this.tasks[task.id] = task;
  }

  createAllInstance = (parent) => {
    if (Object.keys(this.tasks).length > 0) {
      Object.keys(this.tasks).forEach((id) => {
        let data = this.tasks[id];
        let valid = this.checkValidation(data);
        if (typeof valid === "boolean" && valid === true) {
          this.captchaInstance[data.id] = new captchaProcess(
            data["captchaSite"],
            data["id"],
            data["captchaTitle"],
            data["captchaProxy"],
            data["captchaSolver"],
            parent
          );
        }
      });
    }
  };

  deleteAllInstance() {
    if (Object.keys(this.captchaInstance).length > 0) {
      Object.keys(this.captchaInstance).forEach((instance) => {
        this.captchaInstance[instance]?.destroyWindow();
      });
    }
  }

  deleteWindow(id, win) {
    if (id in this.captchaInstance && win !== undefined) {
      this.captchaInstance[id].destroyWindow();
      win.webContents.send("error", "Resolver Deleted !!");
    }
  }

  openWindow(data, win) {
    if (Object.keys(this.captchaInstance).length > 0) {
      if (
        this.captchaInstance[data.id] !== undefined &&
        win !== undefined &&
        win !== null
      ) {
        this.createNewcaptcha(data, win);
        this.captchaInstance[data.id].win.webContents.send("solver", [
          this.captchaInstance[data.id].id,
          this.captchaInstance[data.id].proxy,
          this.captchaInstance[data.id].site,
          this.captchaInstance[data.id].title,
        ]);
        this.captchaInstance[data.id].open();
      } else {
        if (
          data.id in this.captchaInstance &&
          win !== undefined &&
          win !== null
        ) {
        } else {
          let valid = this.checkValidation(data);
          if (valid === true && typeof valid === "boolean") {
            this.createNewcaptcha(data, win);
          } else {
            win.webContents.send("error", valid);
          }
        }
      }
    } else {
      let valid = this.checkValidation(data);
      if (valid === true && typeof valid === "boolean") {
        this.createNewcaptcha(data, win);
      } else {
        if (win !== null && win !== undefined) {
          win.webContents.send("error", valid);
        }
      }
    }
  }

  checkValidation = (data) => {
    const ProxyFormat = /\w+.\w+.\w+.\w+:\d{4,}:?\w*:?\w*/;
    const localFormat = /(local|localhost)$/i;
    let valid = false;
    if (data === undefined) {
      return "Invalid captcha!!";
    }
    const { captchaSolver, captchaSite, captchaProxy } = data;
    if (captchaSite.length > 0) {
      valid = true;
    } else return "Invalid Site !!";
    if (captchaSolver.length > 0) {
      valid = true;
    } else return "Invalid solver method !!";
    if (localFormat.test(captchaProxy)) {
      valid = true;
    } else {
      if (ProxyFormat.test(captchaProxy)) {
        valid = true;
      } else return "Invalid proxy !!";
    }
    return valid;
  };

  createNewcaptcha(data, win) {
    if (
      data["id"] in this.captchaInstance &&
      this.captchaInstance[data["id"]].isLaunched === true
    ) {
      win.webContents.send("error", "Already open!!");
    } else {
      this.captchaInstance[data.id] = new captchaProcess(
        data["captchaSite"],
        data["id"],
        data["captchaTitle"],
        data["captchaProxy"],
        data["captchaSolver"],
        win
      );
      setTimeout(() => {
        console.log("Opening Resolver ...");
        this.captchaInstance[data.id].win.webContents.send("solver", [
          this.captchaInstance[data.id].id,
          this.captchaInstance[data.id].proxy,
          this.captchaInstance[data.id].site,
          this.captchaInstance[data.id].title,
        ]);
        this.captchaInstance[data.id].open();
      }, 500);
    }
  }
}

module.exports = new CaptchaResolverManager();
