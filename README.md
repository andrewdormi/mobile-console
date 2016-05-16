## mobile-console
>Simple console for debugging on mobile device

![mobile-console](screenshot.png)

### Install
**Using npm**
> npm install mobile-console

###Overview
[Demo](http://andrewdormi.github.io/mobile-console/).

### Usage
Simple html including:
```html
  <script src="./node_modules/mobile-console/index.min.js" type="text/javascript"></script>
```
```js
  mobileConsole.init();
```

Require style:
```js
var mobileConsole = require('mobile-console');
```

With AMD:
```js
define(['mobile-console'], function(mobileConsole))
```