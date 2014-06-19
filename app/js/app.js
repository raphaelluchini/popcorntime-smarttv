var applicationRoot = './';

    
// Global App skeleton for backbone
var App = {
  Controller: {},
  View: {},
  Model: {},
  Page: {},
  Scrapers: {},
  Providers: {},
  Localization: {},
  CR:{}
};


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

//console.log = function(st) {console.log(st)};
console.time = console.timeEnd = function() {};
console.logger = {};
console.logger.log = function(st) {console.log(st)};
console.logger.debug = console.logger.log;
console.logger.info = console.logger.log;
console.logger.warn = console.logger.log;
console.logger.error = console.logger.log;
// // Not debugging, hide all messages!
// if (!isDebug) {
//     console.log = function() {};
//     console.time = console.timeEnd = function() {};
//     console.logger = {};
//     console.logger.log = function() {};
//     console.logger.debug = console.logger.log;
//     console.logger.info = console.logger.log;
//     console.logger.warn = console.logger.log;
//     console.logger.error = console.logger.log;
// } else {
//     // Developer Menu building
//     var menubar = new gui.Menu({ type: 'menubar' }),
//         developerSubmenu = new gui.Menu(),
//         developerItem = new gui.MenuItem({
//            label: 'Developer',
//            submenu: developerSubmenu
//         }),
//         debugItem = new gui.MenuItem({
//             label: 'Show developer tools',
//             click: function () {
//                 win.showDevTools();
//             }
//         });
//     menubar.append(developerItem);
//     developerSubmenu.append(debugItem);
//     win.menu = menubar;

//     // Developer Shortcuts
//     document.addEventListener('keydown', function(event){
//         // F12 Opens DevTools
//         if( event.keyCode == 123 ) { win.showDevTools(); }
//         // F11 Reloads
//         if( event.keyCode == 122 ) { win.reloadIgnoringCache(); }
//     });

//     // Special Debug Console Calls!
//     console.logger = {};
//     console.logger.log = console.log.bind(console);
//     console.logger.debug = function() {
//         var params = Array.prototype.slice.call(arguments, 1);
//         params.unshift('%c[%cDEBUG%c] ' + arguments[0], 'color: black;', 'color: #00eb76;', 'color: black;');
//         console.debug.apply(console, params);
//     }
//     console.logger.info = function() {
//         var params = Array.prototype.slice.call(arguments, 1);
//         params.unshift('[%cINFO%c] ' + arguments[0], 'color: blue;', 'color: black;');
//         console.info.apply(console, params);
//     }
//     console.logger.warn = function() {
//         var params = Array.prototype.slice.call(arguments, 1);
//         params.unshift('[%cWARNING%c] ' + arguments[0], 'color: #ffc000;', 'color: black;');
//         console.warn.apply(console, params);
//     }
//     console.logger.error = function() {
//         var params = Array.prototype.slice.call(arguments, 1);
//         params.unshift('%c[%cERROR%c] ' + arguments[0], 'color: black;', 'color: #ff1500;', 'color: black;');
//         console.error.apply(console, params);
//     }
// }





// // Show the disclaimer if the user hasn't accepted it yet.
// if( ! Settings.get('disclaimerAccepted') ) {
//     $('.popcorn-disclaimer').removeClass('hidden');

//     $('.popcorn-disclaimer .btn.confirmation.continue').click(function(event){
//         event.preventDefault();
//         Settings.set('disclaimerAccepted', 1);
//         $('.popcorn-disclaimer').addClass('hidden');
//     });
//     $('.popcorn-disclaimer .btn.confirmation.quit').click(function(event){
//         event.preventDefault();

//         // We need to give the tracker some time to send the event
//         // Also, prevent multiple clicks
//         if( $('.popcorn-disclaimer').hasClass('quitting') ){ return; }
//         $('.popcorn-disclaimer').addClass('quitting');

//         setTimeout(function(){
//             gui.App.quit();
//         }, 2000);
//     });
// }


// /**
//  * Show 404 page on uncaughtException
//  */
// process.on('uncaughtException', function(err) {
//     if (console && console.logger) {
//         console.logger.error(err);
//     }
// });



// // TODO: I have no idea what this is
// App.throttle = function(handler, time) {
//   var throttle;
//   time = time || 300;
//   return function() {
//     var args = arguments,
//       context = this;
//     clearTimeout(throttle);
//     throttle = setTimeout(function() {
//       handler.apply(context, args);
//     }, time);
//   };
// };
