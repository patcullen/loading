		return {
			start: function(el, ops) {
				var 
					// setup elements
					fade = lib.createElement('div'),
					spin = lib.createElement('div'),
					// setup a stop function
					stop = function() {
						lib.remove(fade, spin);
						lib.remove(el, fade);
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
				
				// setup styles of spinner container
				lib.setStyles(spin, {
					'position': 'absolute',
					'width': '100%',
					'height': '100%',
					'background': 'center center no-repeat',
					'background-image': 'url(data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==)'
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
				
				// return stop function
				return {
					stop: stop
				};
			}
		};
