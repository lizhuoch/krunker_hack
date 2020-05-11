// ==UserScript==
// @name         Krunker NameTags
// @namespace    https://skidlamer.github.io/
// @version      0.1
// @description  self leak
// @author       SkidLamer
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    let initialize = function(data) {
        let regex = /if\(!\w+\['(\w+)']\)continue/;
        let result = regex.exec(data);
        if (result) {
            const inView = result[1];
            const push = Array.prototype.push;
            Array.prototype.push = function(...args) {
                push.apply(this, args);
                if (args[0] instanceof Object && args[0].isPlayer) {
                    Object.defineProperty(args[0], inView, {value: true, configurable: false});
                }
            }
        }
    }
    const decode = window.TextDecoder.prototype.decode;
    window.TextDecoder.prototype.decode = function(...args) {
        let data = decode.apply(this, args);
        if (data.length > 1050000) {
            initialize(data);
        }
        return data;
    }
})();
