# Toggle a Tessel Relay module or Pin power On / Off
@ https://github.com/gdibble/tessel-toggle-power
@ https://www.npmjs.com/package/tessel-toggle-power

#### First set a var for your `pin` or `relay` then try this example:
```javascript
var togglePowerConfig = { use:'pin', pin:pin, pinNum:7 };
var togglePower = require('tessel-toggle-power').bind(togglePowerConfig);
togglePower();   // Toggle power on a pin or relay
togglePower(1);  // or togglePower(true)   // Manually set power On
togglePower(0);  // or togglePower(false)  // Manually set power Off
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

#### Example shell output from setting ^option `debug:true`

* From running `togglePower(1)` or `togglePower(true)`:
  ```
  
  togglePower:
  * Setting pin to 1
  * Pin set to 1    2016-05-23T04:17:26.259Z
  
  ```

* From running `togglePower(0)` or `togglePower(false)`:
  ```
  
  togglePower:
  * Setting pin to 0
  * Pin set to 0    2016-05-23T04:17:26.674Z
  
  ```

* From running `togglePower()`:
  ```

  togglePower:
  * Toggling relay
  * Relay toggled

  ```