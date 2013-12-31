<?php

function customError($errno, $errstr) {
	echo "The specified resource does not exist.";
	die;
}

//set custom error handler
//set_error_handler("customError");


$param = array();
$param["library"] = $_REQUEST["key1"];
$param["animation"] = $_REQUEST["key2"];
$param["loader"] = $_REQUEST["key3"];
$param["compression"] = $_REQUEST["key4"];

$filename = "loading-" . $param["library"] . "-" . $param["animation"] . "-" . $param["loader"] . "-" . $param["compression"] . ".js";
$cachedFile = "cache/" . $filename;
$cached = file_exists($cachedFile);

$code = "";

if ($cached) {
	$code = file_get_contents($cachedFile);
} else {
	// load a base to work with
	$code = file_get_contents("source/base.js");
	// pull in the require/AMD loader
	$code = str_replace("[[@code]]", file_get_contents("source/load-" . $param["loader"] . ".js"), $code);
	// pull in the source code for the most of the file
	$code = str_replace("[[@code]]", file_get_contents("source/source.js"), $code);
	// pull in the default plugin
	$code = str_replace("[[@plugin]]", file_get_contents("source/anim-" . $param["animation"] . ".js"), $code);
	// pull in the javscript library 
	$code = str_replace("[[@lib]]", file_get_contents("source/lib-" . $param["library"] . ".js"), $code);
	
	// if we have to minify,.. then send to online service for minification.
	if ($param["compression"] == "min") {
		$code = post_request("http://marijnhaverbeke.nl/uglifyjs", http_build_query(array("js_code" => $code)));
	}
	
	// update cache
	file_put_contents($cachedFile, $code, false);
}

// so that it downloads nicely in the download manager of the browser
header('Content-Disposition: attachment; filename="' . $filename . '"');
// utf-8 so that the browser doesn't warn about silly unsafe programs
header('Content-Type: application/javascript; charset=UTF-8');
// so the browser can time the download properly
header('Content-Length: ' . strlen($code));

echo $code;

function post_request($url, $post_fields) {
	$header = array(
		'User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
		'Content-Type: application/x-www-form-urlencoded',
		'Accept: */*',
		'Accept-Encoding: gzip,deflate,sdch',
		'Accept-Language: en-ZA,en;q=0.8,en-US;q=0.6',
		'Cookie: arp_scroll_position=0'
	);	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); 
	curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
	return curl_exec($ch);
}

?>

