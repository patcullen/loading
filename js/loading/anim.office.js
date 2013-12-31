/*	A plugin module for loading.js
 *	
 *	loading.js plugins should not use any external JS library commands if possible.
 *		DOM manipulation should be brovided by base loading.js class. (unless you are
 *		designing a highly specific animation just for your web app ;)
 *	
 *	This animation provides a floating sideway loading effect similar to that seen 
 *		in office apps like Outlook.
 * 
 */
(function(window){

var module = (function(){

	constructor = function(lib) {
		return {
			start: function(el, op) {
				var 
					ops = op ? op : {},
					// setup elements
					fade = lib.createElement('div'),
					spin = lib.createElement('div'),
					// init vars for animation
					interval = null,
					xOffset = 50,
					// function that animates the bar
					animator = function() {
						xOffset += (0.013 * parseInt(lib.getStyle(spin, 'width')));
						lib.setStyle(spin, 'backgroundPosition', xOffset + 'px 0px');
					},
					// setup a stop function
					stop = function() {
						lib.remove(fade, spin);
						lib.remove(el, fade);
						if (interval) clearInterval(interval);
					};
				
				// setup the element so that child eleemtns can be positioned absolutely
				if (lib.getStyle(el, 'position') != 'absolute')
					lib.setStyle(el, 'position', 'relative');
				
				// setup styles of semi-opaque cover
				lib.setStyles(fade, {
					'position': 'absolute',
					'top': '0px',
					'left': '0px',
					'width': '100%',
					'height': '100%',
					'backgroundColor': 'rgba(255,255,255,0.3)',
					'z-index': 10000,
					'margin': '0px',
					'padding': '0px',
					'cursor': ops.cursor
				});
				
				// setup styles of spinner
				lib.setStyles(spin, {
					'position': 'absolute',
					'width': '100%',
					'height': '3px',
					'bottom': '0px',
					'background': 'url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAABCAIAAAAU3Xa1AAAAqElEQVQoz4WSwQ0CMQwEZ236b45CaODs5XG5XAJCfCInGo3tVVSvp5RWoBSBEs1zPFqhSJQmpESJhI3LtFx245YPu3HhZhY0LntiNXlccJN2yX0xbR9s2NBeWLE4V2Bv1/Jhmt56fWLnFv3pGe3oZfJ9uzkVpW6zT3WHwJJqatRX7OeVPXaFNdK2QiQRcAOL6oHinyqlPLGfKoLYp+LrMyhMKhbVDkzVG9mM4r0kg07EAAAAAElFTkSuQmCC)',
					// simply stretch the above smallish base64 encoded gradient over an element,.. smaller than using CSS3 gradients and then including all the traditional verbose compatability scripts written for every browser. 
					'backgroundSize': '100% 100%' // http://caniuse.com/#feat=background-img-opts
				});
				
				if (!ops.allowClick)
					lib.attachEvent('click', fade, function(e) {
						e.stopPropagation();
						e.preventDefault();
						return false;
					});

				// add the spinner to the cover, and the cover to the element
				lib.append(fade, spin);
				lib.append(el, fade);
				
				// setup and start the animation
				interval = setInterval(animator, 23);
				
				// return stop function
				return {
					stop: stop
				};
			}
		};
	};
	
	// use the constructor defined above to wrap the logic of setting up this module. return the result of constructor()
	return constructor;
	
});

/* These style of these ifs below were learned from JQueries compensation for detecting RequireJS
 *
 * So if RequireJS is being used, the module will be made available through the usual callback
 *		that RequireJS provides.
 *
 * If RequireJS is not detected, a global variable called 'loading' will be created.
 *
 */
if (window['define'] !== undefined) {
	define(module);
} else {
	window['loading'].plugin('throb', module);
}


if (typeof define === 'function' && define.amd) {
	define('loading.anim.throb', [], module);
} else {
	window.loader.plugin('throb', module);
}

})( window );
