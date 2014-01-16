/*	A plugin module for loading.js
 *	
 *	loading.js plugins should not use any external JS library commands if possible.
 *		DOM manipulation should be brovided by base loading.js class. (unless you are
 *		designing a highly specific animation just for your web app ;)
 *	
 *	This animation provides an animation similar to one that would be found on FB.
 * 
 */
(function(window){

var module = (function(){

	var $, download,
		dimension = []
		ready = false;
	
	// { name: 'st', label: 'Something Nice', option: [{ name: 'appl', label: 'Apples'}], renderFunction: <optional function definition> }
	function addDimension(d) {
		dimension.push(d);
	}
	
	function render(container) {
		if (!ready) return setTimeout(function() { render(container); }, 50);
		
		var el = $('<div class="loading build"></div>');
		
		$.each(dimension, function(j, d) {
			var dimElement;
			el.append(
				dimElement = $('<div id="rad'+d.name+'" class="'+d.name+' optionPane"><div>'+d.label+'</div></div>')
			);
			$.each(d.option, function(i, n) {
				var x = $('<label for="rad'+d.name+'_'+n.name+'"><input type="radio" id="rad'+d.name+'_'+n.name+'" name="rad'+d.name+'" value="'+n.name+'" /><span>'+n.label+'</span></label>');
				dimElement.append(x);
				x.click(updateDownloadButton);
				if (d.perOption) d.perOption(i, n, x);
			});
		});
		
		download = $('<a href="javascript:false" class="disabled"><div>下載</div><span></span></a>');
		
		el.append($('<div class="optionPane"><div></div></div>'), download);
		
		container.append(el);
	};
	
	function updateDownloadButton() {
		var choice = '', value, error = false;
		$.each(dimension, function(j, d) {
			value = $('.loading.build input[name=rad'+d.name+']:checked').val();
			if (typeof value == 'undefined') 
				error = true;
			else 
				choice += (choice == '' ? '' : '-') + value;
		});
		
		if (error) {
			download.addClass('disabled');
		} else {
			choice = 'loading-'+choice+'.js';
			$('.loading.build a span').text(choice);
			download.removeClass('disabled');
			download.attr('href', 'download/' +  choice);
		}
	};
	
	constructor = function(lib) {
		require(['jquery', 'loading/loading'], function(jquery, loading) {
			$ = jquery;

			var buildSchema = {
				label: 'Loading Build',
				dimension: [
					{ 
						name: 'lib', label: 'Javascript Library',
						option: [
							{ name: 'jq', label: 'JQuery' },
							{ name: 'mt', label: 'Mootools' },
							{ name: 'xx', label: '不用' }
						]
					},
					{ 
						name: 'anim', label: '動畫',
						option: [
							{ name: 'fb', label: '&nbsp;' },
							{ name: 'office', label: '&nbsp;' },
							{ name: 'spin', label: '&nbsp;' }
						],
						perOption: function(i, option, el) {
							require(['loading/anim.'+option.name], function(a) {
								loading.plugin(option.name, a);
								loading.start(el, {
									plugin: option.name,
									allowClick: true,
									cursor: 'pointer'
								});
							});
						}
					},
					{ 
						name: 'load', label: '異步載入 (AMD)',
						option: [
							{ name: 'r', label: 'RequireJS' },
							{ name: 's', label: 'SeaJS' },
							{ name: 'x', label: 'none' }
						]
					},
					{ 
						name: 'min', label: '压缩',
						option: [
							{ name: 'min', label: '壓縮的', selected: true },
							{ name: 'dev', label: '未壓縮' }
						]
					}
				]
			};
			$.each(buildSchema.dimension, function(i, d) {
				addDimension(d);
			});
			
			ready = true;
		});
		// we return an api instantaneously so that the calling code can continue syncronously 
		return {
			render: render
		};
	};
	
	// use the constructor defined above to wrap the logic of setting up this module. return the result of constructor()
	return constructor;
	
})();

if (window['define'] !== undefined) {
	define(module);
}


if (typeof define === 'function' && define.amd) {
	define('loading.build', [], module);
}

})( window );
