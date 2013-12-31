	 
	/* This particular library depends on MooTools. */
	library = {
		/* Return a single named style from an element.
		 */
		getStyle: function(el, styleProp) {
			return el.getStyle(styleProp);
		},
		
		/* Set a single named style on an alement.
		 */
		setStyle: function(el, style, value) {
			el.setStyle(style, value);
		},

		/* Set a set of named styles on an element.
		 */
		setStyles: function(el, styles) {
			el.setStyles(styles);
		},
		
		/* create a DOM element.
		 */
		createElement: function(tag) {
			return new Element('div');
		},
		
		/* create a DOM element.
		 */
		append: function(parent, child) {
			return parent.grab(child);
		},
		
		/* remove a DOM element from a parent.
		 */
		remove: function(parent, child) {
			return child.dispose();
		},
		
		/* Will try to use the native JS indexOf if it exists, or it will use a substitute. (for IE8 and down)
		 */
		indexOf: function(array, needle) {
			return array.indexOf(needle);
		},

		/* add a click event to an element.
		 */
		attachEvent: function(event, element, handler) {
			element.addEvent(event, handler);
			return element;
		}
		
		
	},
