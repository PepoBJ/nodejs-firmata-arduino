# Controlar arduino via web con firmatra y nodejs

Este es un ejemplo sencillo de como controlar arduino con nodejs mediante el protocola firmata.
Este ejemplo nos permite controlar el prendido y apagado de 3 leds, como también la itinerancia de estos. 

[![Linux Build][travis-image]]
[![Windows Build][appveyor-image]]

## Instalación

La instalación se hace directamente desde npm.

```bash
$ npm npm install
```

## Dependencias

* Express
* Johnny Five
* Socket.io

## Probar

```bash
$ node app.js
```

## Licencia

[MIT](LICENSE)

[travis-image]: https://img.shields.io/travis/expressjs/express/master.svg?label=linux
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/express/master.svg?label=windows