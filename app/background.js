module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main/background.js":
/*!****************************!*\
  !*** ./main/background.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./main/helpers/index.js");




const isProd = "development" === 'production'

if (!isProd) {
  Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["enableHotReload"])()

  const userDataPath = electron__WEBPACK_IMPORTED_MODULE_1__["app"].getPath('userData')
  electron__WEBPACK_IMPORTED_MODULE_1__["app"].setPath('userData', `${userDataPath} (development)`)
}

electron__WEBPACK_IMPORTED_MODULE_1__["app"].on('ready', () => {
  const mainWindow = new electron__WEBPACK_IMPORTED_MODULE_1__["BrowserWindow"]({
    width: 800,
    height: 500,
    resizable: false,
    maximizable: false
  });

  if (isProd) {
    const homeFile = Object(path__WEBPACK_IMPORTED_MODULE_0__["join"])(electron__WEBPACK_IMPORTED_MODULE_1__["app"].getAppPath(), 'app/home/index.html')
    mainWindow.loadFile(homeFile)
  } else {
    const homeUrl = 'http://localhost:8888/home'
    mainWindow.loadURL(homeUrl)
    mainWindow.webContents.openDevTools()
  }
})

electron__WEBPACK_IMPORTED_MODULE_1__["app"].on('window-all-closed', () => {
  electron__WEBPACK_IMPORTED_MODULE_1__["app"].quit()
})


/***/ }),

/***/ "./main/helpers/create-window.js":
/*!***************************************!*\
  !*** ./main/helpers/create-window.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createWindow; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");
/* harmony import */ var fs_jetpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_jetpack__WEBPACK_IMPORTED_MODULE_1__);



function createWindow(name, options) {
  const userDataDir = fs_jetpack__WEBPACK_IMPORTED_MODULE_1__["cwd"](electron__WEBPACK_IMPORTED_MODULE_0__["app"].getPath('userData'))
  const stateStoreFile = `window-state-${name}.json`
  const defaultSize = {
    width: options.width,
    height: options.height
  }

  let state = {}
  let win

  const restore = () => {
    let restoredState = {}
    try {
      restoredState = userDataDir.read(stateStoreFile, 'json')
    } catch (err) {
      // For some reason json can't be read (might be corrupted).
      // No worries, we have defaults.
    }
    return Object.assign({}, defaultSize, restoredState)
  }

  const getCurrentPosition = () => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1]
    }
  }

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  const resetToDefaults = () => {
    const { screen } = __webpack_require__(/*! electron */ "electron")
    const bounds = screen.getPrimaryDisplay().bounds
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
    })
  }

  const ensureVisibleOnSomeDisplay = windowState => {
    const { screen } = __webpack_require__(/*! electron */ "electron")
    const visible = screen.getAllDisplays().some(display => {
      return windowWithinBounds(windowState, display.bounds)
    })
    if (!visible) {
      // Window is partially or fully not visible now.
      // Reset it to safe defaults.
      return resetToDefaults()
    }
    return windowState
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    userDataDir.write(stateStoreFile, state, { atomic: true })
  }

  state = ensureVisibleOnSomeDisplay(restore())

  win = new electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"]({...options, ...state})

  win.on('close', saveState)

  return win
}


/***/ }),

/***/ "./main/helpers/enable-hot-reload.js":
/*!*******************************************!*\
  !*** ./main/helpers/enable-hot-reload.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return enableHotReload; });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);




function enableHotReload() {
  Object(fs__WEBPACK_IMPORTED_MODULE_0__["watchFile"])(Object(path__WEBPACK_IMPORTED_MODULE_1__["join"])(process.cwd(), 'app/background.js'), () => {
    electron__WEBPACK_IMPORTED_MODULE_2__["app"].relaunch()
    electron__WEBPACK_IMPORTED_MODULE_2__["app"].exit(0)
  })
}


/***/ }),

/***/ "./main/helpers/index.js":
/*!*******************************!*\
  !*** ./main/helpers/index.js ***!
  \*******************************/
/*! exports provided: createWindow, enableHotReload, ipc, resolveWithIpc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-window */ "./main/helpers/create-window.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createWindow", function() { return _create_window__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _enable_hot_reload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enable-hot-reload */ "./main/helpers/enable-hot-reload.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enableHotReload", function() { return _enable_hot_reload__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ipc */ "./main/helpers/ipc.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ipc", function() { return _ipc__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _resolveWithIpc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./resolveWithIpc */ "./main/helpers/resolveWithIpc.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolveWithIpc", function() { return _resolveWithIpc__WEBPACK_IMPORTED_MODULE_3__["default"]; });









/***/ }),

/***/ "./main/helpers/ipc.js":
/*!*****************************!*\
  !*** ./main/helpers/ipc.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ipc; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);


const getResponseChannels = channel => ({
  sendChannel: `%nextron-send-channel-${channel}`,
  dataChannel: `%nextron-response-data-channel-${channel}`,
  errorChannel: `%nextron-response-error-channel-${channel}`
})

const getRendererResponseChannels = (windowId, channel) => ({
  sendChannel: `%nextron-send-channel-${windowId}-${channel}`,
  dataChannel: `%nextron-response-data-channel-${windowId}-${channel}`,
  errorChannel: `%nextron-response-error-channel-${windowId}-${channel}`
})

class ipc {
  static callRenderer(window, channel, data) {
    return new Promise((resolve, reject) => {
      const { sendChannel, dataChannel, errorChannel } = getRendererResponseChannels(window.id, channel)

      const cleanup = () => {
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].removeAllListeners(dataChannel)
        electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].removeAllListeners(errorChannel)
      }

      electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(dataChannel, (event, result) => {
        cleanup()
        resolve(result)
      })

      electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(errorChannel, (event, error) => {
        cleanup()
        reject(error)
      })

      if (window.webContents) {
        window.webContents.send(sendChannel, data)
      }
    })
  }

  static answerRenderer(channel, callback) {
    const { sendChannel, dataChannel, errorChannel } = getResponseChannels(channel)

    electron__WEBPACK_IMPORTED_MODULE_0__["ipcMain"].on(sendChannel, async (event, data) => {
      const window = electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].fromWebContents(event.sender)

      const send = (channel, data) => {
        if (!(window && window.isDestroyed())) {
          event.sender.send(channel, data)
        }
      }

      try {
        send(dataChannel, await callback(data, window))
      } catch (error) {
        send(errorChannel, error)
      }
    })
  }

  static sendToRenderers(channel, data) {
    for (const window of electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getAllWindows()) {
      if (window.webContents) {
        window.webContents.send(channel, data)
      }
    }
  }
}


/***/ }),

/***/ "./main/helpers/resolveWithIpc.js":
/*!****************************************!*\
  !*** ./main/helpers/resolveWithIpc.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resolveWithIpc; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);



function resolveWithIpc() {
  const isProd = "development" === 'production'

  electron__WEBPACK_IMPORTED_MODULE_1__["ipcMain"].on('resolve', (event, pathname) => {
    let resolved
    if (isProd) {
      const isAssets = /\.(png|jpe?g|gif|svg|js|css)(\?.*)?$/.test(pathname)
      resolved = Object(path__WEBPACK_IMPORTED_MODULE_0__["join"])(electron__WEBPACK_IMPORTED_MODULE_1__["app"].getAppPath(), isAssets ? `app/${pathname}` : `app/${pathname}/index.html`)
    } else {
      resolved = `http://localhost:8888/${pathname}`
    }
    event.returnValue = resolved
  })

  electron__WEBPACK_IMPORTED_MODULE_1__["ipcMain"].on('load', (event, resolved) => {
    const win = electron__WEBPACK_IMPORTED_MODULE_1__["BrowserWindow"].fromWebContents(event.sender)
    if (!(win && win.isDestroyed())) {
      if (isProd) {
        win.loadFile(resolved)
      } else {
        win.loadURL(resolved)
      }
    }
  })
}


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-jetpack":
/*!*****************************!*\
  !*** external "fs-jetpack" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-jetpack");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=background.js.map