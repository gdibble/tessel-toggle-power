# Toggle a Tessel Relay module or Pin power On / Off
@ https://github.com/gdibble/tessel-toggle-power
@ https://www.npmjs.com/package/tessel-toggle-power

#### First set a var for your `pin` or `relay` then try this example:
```javascript
var togglePowerConfig = { use:'pin', pin:pin, pinNum:7 };
var togglePower = require('tessel-toggle-power').bind(togglePowerConfig);
togglePower();  // call it
```

#### togglePowerConfig Options which get bound to fn as shown above^
```javascript
{
  use:      'relay', // pass: 'relay' or 'pin', defaults to 'relay'
  pin:      pin,     // pass defined pin or relay, which ever you want used
  relay:    relay,   // ^
  relayChn: 1,       // pass: 1 or 2
  debug:    false    // pass: true or false
}
```