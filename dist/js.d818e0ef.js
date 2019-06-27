// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/index.js":[function(require,module,exports) {
var form = document.querySelector('form');
var formDate = document.querySelector('#formDate');
var formName = document.querySelector('#formName');
var formStartTime = document.querySelector('#formStartTime');
var formEndTime = document.querySelector('#formEndTime');

formStartTime.oninput = function () {
  return formEndTime.value = '';
};

var filter_select_el = document.querySelector('.custom-select');
var items_el = document.querySelector('#eventsContainer');

filter_select_el.onchange = function () {
  var items = items_el.getElementsByClassName('col-md-4');

  for (var i = 0; i < items.length; i++) {
    if (items[i].classList.contains(this.value)) {
      items[i].style.display = 'block';
    } else {
      items[i].style.display = 'none';
    }
  }
};

form.onsubmit = function (e) {
  e.preventDefault();

  if (formStartTime.value > formEndTime.value || formStartTime.value == formEndTime.value) {
    alert('incorrect time');
    return;
  }

  var dates = document.querySelectorAll('.date');
  dates.forEach(function (el) {
    if (formDate.value == el.innerHTML) {
      var containerEvents = $(el).next()[0];
      var checkTime = $(containerEvents).find('.event');
      checkTime.each(function (el1) {
        if ($(checkTime[el1]).find('.prevtime').html() == formStartTime.value) {
          throw alert('Time has been declarated');
        }
      });
      checkTime.each(function (el2) {
        if ($(checkTime[el2]).find('.endtime').html() == formEndTime.value) {
          throw alert('Time has been declarated');
        }
      });
      var event = document.createElement('div');
      event.classList.add('event');
      containerEvents.appendChild(event);
      createElementFunc(event, checkTime, containerEvents);
    }
  });

  var createElementCol = function createElementCol() {
    var eventContainer = document.querySelector('#eventsContainer');
    var colMd4 = document.createElement('div');
    colMd4.classList.add('col-md-4');
    colMd4.classList.add(formDate.value);
    eventContainer.appendChild(colMd4);
    filter_select_el.innerHTML += "<option value=".concat(formDate.value, ">").concat(formDate.value, "</option>");
    var eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    colMd4.appendChild(eventCard);
    var date = document.createElement('div');
    date.classList.add('date');
    date.innerHTML = formDate.value;
    eventCard.appendChild(date);
    var containerEvents = document.createElement('div');
    containerEvents.classList.add('container-events');
    eventCard.appendChild(containerEvents);
    var checkTime = $(containerEvents).find('.event');
    var event = document.createElement('div');
    event.classList.add('event');
    containerEvents.appendChild(event);
    createElementFunc(event, checkTime, containerEvents, colMd4, date);
  };

  var counter = 0;
  if (dates.length == 0) createElementCol();
  dates.forEach(function (el) {
    if (formDate.value != el.innerHTML) {
      counter++;
    }

    if (dates.length == counter) {
      createElementCol();
    }
  });
};

var createElementFunc = function createElementFunc(event, checkTime, containerEvents, colMd4, date) {
  var name = document.createElement('div');
  name.innerHTML = document.querySelector('#formName').value;
  name.classList.add('name');
  event.appendChild(name);
  var prevtime = document.createElement('div');
  prevtime.innerHTML = document.querySelector('#formStartTime').value;
  prevtime.classList.add('prevtime');
  event.appendChild(prevtime);
  var endtime = document.createElement('div');
  endtime.innerHTML = document.querySelector('#formEndTime').value;
  endtime.classList.add('endtime');
  event.appendChild(endtime);
  var edit = document.createElement('div');
  edit.innerHTML = '<i class="far fa-edit">';
  edit.style.cursor = 'pointer';

  edit.onclick = function () {
    var changePrevTime = document.createElement('input');
    changePrevTime.setAttribute('required', true);
    changePrevTime.type = 'time';
    changePrevTime.style.width = '90px';
    var changeNextTime = document.createElement('input');
    changeNextTime.setAttribute('required', true);
    changeNextTime.type = 'time';
    changeNextTime.style.width = '90px';
    prevtime.replaceWith(changePrevTime);
    endtime.replaceWith(changeNextTime);
    var ok = document.createElement('div');
    ok.innerHTML = '<i class="fas fa-check">';
    ok.style.cursor = 'pointer';
    edit.replaceWith(ok);

    ok.onclick = function () {
      if (changeNextTime.value == '' || changePrevTime.value == '') {
        return;
      }

      if (changePrevTime.value > changeNextTime.value || changePrevTime.value == changeNextTime.value) {
        alert('incorrect time');
        return;
      }

      checkTime.each(function (el1) {
        if ($(checkTime[el1]).find('.prevtime').html() == changePrevTime.value) {
          throw alert('Time has been declarated');
        }
      });
      checkTime.each(function (el2) {
        if ($(checkTime[el2]).find('.endtime').html() == changeNextTime.value) {
          throw alert('Time has been declarated');
        }
      });
      changePrevTime.replaceWith(prevtime);
      changeNextTime.replaceWith(endtime);
      prevtime.innerHTML = changePrevTime.value;
      endtime.innerHTML = changeNextTime.value;
      edit.innerHTML = '<i class="far fa-edit">';
      ok.replaceWith(edit);
    };
  };

  event.appendChild(edit);
  var deleted = document.createElement('div');
  deleted.innerHTML = '<i class="fas fa-times">';
  deleted.style.cursor = 'pointer';

  deleted.onclick = function () {
    var datee = $(event).parent().prev()[0];
    var colMd44 = $(datee).parent().parent()[0];
    console.log(datee);
    console.log(colMd44);
    event.remove();

    if ($(containerEvents).children().length == 0) {
      $("[value = \"".concat(datee.innerHTML, "\"]")).remove();
      colMd44.remove();
    }
  };

  event.appendChild(deleted);
};
},{}],"C:/Users/Megallladon/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "4100" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Megallladon/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.js.map