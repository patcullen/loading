var module = (function(){

[[@code]]

})();


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
	window['loading'] = module;
}

if (typeof define === 'function' && define.amd) {
	define('loading', [], module);
} else {
	window.loader = module;
}