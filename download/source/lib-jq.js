	 
	/* This particular library depends on JQuery. */
	library = {
		/* Return a single named style from an element.
		 */
		getStyle: function(el, styleProp) {
			return el.css(styleProp);
		},
		
		/* Set a single named style on an alement.
		 */
		setStyle: function(el, style, value) {
			el.css(style, value);
		},

		/* Set a set of named styles on an element.
		 */
		setStyles: function(el, styles) {
			el.css(styles);
		},
		
		/* create a DOM element.
		 */
		createElement: function(tag) {
			return $('<div>');
		},
		
		/* create a DOM element.
		 */
		append: function(parent, child) {
			return parent.append(child);
		},
		
		/* remove a DOM element from a parent.
		 */
		remove: function(parent, child) {
			child.remove(); return parent;
		},
		
		/* Will try to use the native JS indexOf if it exists, or it will use a substitute. (for IE8 and down)
		 */
		indexOf: function(array, needle) {
			return $.inArray(needle, array);
		},

		/* add a click event to an element.
		 */
		attachEvent: function(event, element, handler) {
			element.bind(event, handler);
			return element;
		}
		
	},
