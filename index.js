/**
 * Toggle a Tessel Relay module or Pin power On / Off
 *  @ https://github.com/gdibble/tessel-toggle-power
 *  @ https://www.npmjs.com/package/tessel-toggle-power
 *
 *  - First set a var for your `pin` or `relay` then try this example:
 *      var togglePowerConfig = { use:'pin', pin:pin, pinNum:7 };
 *      var togglePower = require('tessel-toggle-power').bind(togglePowerConfig);
 *      togglePower();  // call it
 *
 *  - togglePowerConfig Options which get bound to fn as shown above^
 *    {
 *      use:      'relay', // pass: 'relay' or 'pin', defaults to 'relay'
 *      pin:      pin,     // pass defined pin or relay, which ever you want used
 *      relay:    relay,   // ^
 *      relayChn: 1,       // pass: 1 or 2
 *      debug:    false    // pass: true or false
 *    }
 */

var togglePower = function togglePower() {
  var onErr = function onErr(msg) {
    console.log('\n\ntessel-toggle-power error: ', msg);
    console.log('\n  config:\n', this);
    console.log('\n  ' + getDate(), '\n');
    return new Error(msg);
  }.bind(this);

  if (!(this instanceof Object)) {
    onErr('config scope passed is not an object');
  }

  if (this.relay && (this.use === 'relay' || !this.use)) {
    this.relay.toggle(this.relayChn);
    this.debug ? console.log('\nRelay toggled', getDate()) : null;
  } else if (this.pin) {
    this.pin.read(pinReadCallbackToToggle.bind(this));
    this.debug ? console.log('\nPin toggled', getDate()) : null;
  } else {
    onErr('neither relay or pin defined');
  }

  return;
};

// Pin Read Callback which performs toggling mechanism in pin-mode
// * when 0 => turn On, when 1 => turn Off
var pinReadCallbackToToggle = function pinReadCallbackToToggle(error, value) {
  var turnOff = function turnOff() {
    this.pin.output(0);
  };
  // print the pin value to the console
  console.log('\npin.read():', value);
  if (value) {
    console.log('\nNow toggling...\n');
    setTimeout(turnOff.bind(this), 750);
  } else {
    this.pin.output(1); //turn On
  }
};

// Gets an ISO formattted date
var getDate = function getDate() { return new Date().toISOString(); };

// Export module
module.exports = togglePower;
