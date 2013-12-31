	 
	/* This particular library depends on no external JS library. */
	library = {
		/* Return a single named style from an element.
		 *
		 * Thank you Christian C. Salvadó... From: https://gist.github.com/cms/369133
		 */
		getStyle: function(el, styleProp) {
			var value, defaultView = el.ownerDocument.defaultView;
			// W3C standard way:
			if (defaultView && defaultView.getComputedStyle) {
				// sanitize property name to css notation (hypen separated words eg. font-Size)
				styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
				return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
			} else if (el.currentStyle) { // IE
				// sanitize property name to camelCase
				styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
					return letter.toUpperCase();
				});
				value = el.currentStyle[styleProp];
				// convert other units to pixels on IE
				if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
					return (function(value) {
						var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
						el.runtimeStyle.left = el.currentStyle.left;
						el.style.left = value || 0;
						value = el.style.pixelLeft + 'px';
						el.style.left = oldLeft;
						el.runtimeStyle.left = oldRsLeft;
						return value;
					})(value);
				}
				return value;
			}
		},
		
		/* Set a single named style on an alement.
		 */
		setStyle: function(el, style, value) {
			try {
				el.style[style] = value;
			} catch (e) {
				// IE throws errors on invalid property values
			}
		},

		/* Set a set of named styles on an element.
		 */
		setStyles: function(el, styles) {
			for (var key in styles)
				if (styles.hasOwnProperty(key))
					library.setStyle(el, key, styles[key]);
		},
		
		/* create a DOM element.
		 */
		createElement: function(tag) {
			return document.createElement('div');
		},
		
		/* create a DOM element.
		 */
		append: function(parent, child) {
			return parent.appendChild(child);
		},
		
		/* remove a DOM element from a parent.
		 */
		remove: function(parent, child) {
			return parent.removeChild(child);
		},
		
		/* Will try to use the native JS indexOf if it exists, or it will use a substitute. (for IE8 and down)
		 */
		indexOf: function(array, needle) {
			if(typeof Array.prototype.indexOf === 'function') {
				return array.indexOf(needle);
			} else {
				var i = -1, index = -1;
				for(i = 0; i < array.length; i++) {
					if(array[i] === needle) {
						index = i;
						break;
					}
				}
				return index;
			}
		},

		/* add a click event to an element.
		 */
		attachEvent: function(event, element, handler) {
			element['on'+event] = handler;
			return element;
		}
		
		
	},
