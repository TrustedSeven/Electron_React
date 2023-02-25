const ipcRenderer = window.require("electron").ipcRenderer;
const closeBtn = document.getElementById("modal-close");
const minimizeBtn = document.getElementById("modal-minimize");
const captchaSite = document.getElementById("captcha-site");
const captchaTitle = document.getElementById("captcha-title");
const captchaProxy = document.getElementById("captcha-proxy");
let storage;

closeBtn.addEventListener("click", function (e) {
  ipcRenderer.send("child-close-win", storage[0]);
});

minimizeBtn.addEventListener("click", function (e) {
  ipcRenderer.send("child-minimize-win", storage[0]);
});

ipcRenderer.on("solver", (event, data) => {
  storage = data;
  captchaSite.innerText = storage[2];
  captchaTitle.innerText = storage[3];
  captchaProxy.innerText = storage[1];
});
