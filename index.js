/**
 * Toggle a Tessel Relay module or Pin power On / Off
 *  @ https://github.com/gdibble/tessel-toggle-power
 *  @ https://www.npmjs.com/package/tessel-toggle-power
 *
 *  - First set a var for your `pin` or `relay` then try this example:
 *      var togglePowerConfig = { use:'pin', pin:pin, pinNum:7 };
 *      var togglePower = require('tessel-toggle-power').bind(togglePowerConfig);
 *      togglePower();   // Call it without an argument to toggle
 *      togglePower(1);  // or togglePower(true);   // Manually set power On
 *      togglePower(0);  // or togglePower(false);  // Manually set power Off
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

var togglePower = function togglePower(state) {
  var deflt = 'relay';  // Default for `use` setting

  this.state = state;
  this.toggleMode = state === undefined;

  if (!(this instanceof Object)) {
    onErr.call(this, 'config scope passed is not an object');
  }

  this.debug && !this.toggleMode ? // Debug Output
    console.log('\ntogglePower:\n* ' + (this.toggleMode ? 'Toggling ' : 'Setting ') + (this.use ? this.use : deflt) + (this.toggleMode ? '' : (' to ' + Number(!!this.state)))) :
    null;

  if (this.relay && (this.use === deflt || !this.use)) {
    // Control Relay
    this.toggleMode ?
      this.relay.toggle(this.relayChn, relayChangeCallback.bind(this)) : // Toggle relay
      this.relay[!!state ? 'turnOn' : 'turnOff'](this.relayChn, relayChangeCallback.bind(this)); // Manual mode

    this.debug ? // Debug Output
      console.log('* Relay ' + (this.toggleMode ? 'toggled' : ('set to ' + Number(!!state))), getDate()) :
      null;

  } else if (this.pin) {
    // Control Pin
    this.toggleMode ?
      this.pin.read(pinReadCallbackToToggle.bind(this)) : // Toggle pin
      this.pin.output(Number(!!state)); // Manual mode: state => Boolean => Number

    this.debug ? // Debug Output
      console.log('* Pin ' + (this.toggleMode ? 'toggled' : ('set to ' + Number(!!state))), getDate()) :
      null;

  } else {
    // Fail
    onErr.call(this, 'neither relay or pin defined');
  }

  return;
};


// Relay turnOn/turnOff Callback
var relayChangeCallback = function relayChangeCallback(error) {
  error ? onErr.call(this, 'relay change' + error) : null;
};


// Pin Read Callback which performs toggling mechanism in pin-mode
// * when 0 => turn On, when 1 => turn Off
var pinReadCallbackToToggle = function pinReadCallbackToToggle(error, value) {
  var inverted                  = value ? 0 : 1; // Invert value
  var stateBoolean              = !!this.state;
  var valueBoolean              = !!value;
  var toggleModeAndValuesAlike  = this.toggleMode && stateBoolean === valueBoolean;
  var toggleModeAndValuesDiffer = this.toggleMode && stateBoolean !== valueBoolean;

  this.debug ? console.log('\npin.read()  =>', value) : null; // Debug Output

  if (!this.toggleMode || toggleModeAndValuesDiffer) {
    this.pin.output(inverted); // Set new value
    this.debug ? console.log('\npin set     =>', inverted) : null; // Debug Output
  } else if (this.debug && toggleModeAndValuesAlike) {
    console.log('not setting', Number(stateBoolean), 'to the same value', Number(valueBoolean)); // Debug Output
  }

  return;
};


// General error output
var onErr = function onErr(msg) {
  console.log('\n\ntessel-toggle-power error: ', msg);
  console.log('\n  config:\n', this);
  console.log('\n  ' + getDate(), '\n');
  return new Error(msg);
};


// Gets an ISO formattted date
var getDate = function getDate() { return '   ' + new Date().toISOString(); };


// Export fn
module.exports = togglePower;
