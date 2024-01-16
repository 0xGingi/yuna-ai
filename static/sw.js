'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["yuna.html", "/css/index.css", "fonts/kawai-font.woff", "/js/index.js", "img/yuna-ai.png", "img/yuna-full.png", "img/yuna-girl-head.png"]);

toolbox.router.get('/images/*', toolbox.cacheFirst);
toolbox.router.get('/*', toolbox.networkFirst, {
    networkTimeoutSeconds: 1
});