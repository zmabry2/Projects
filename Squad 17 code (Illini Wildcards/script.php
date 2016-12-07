<?php
	// requires php5
	$files = glob("submissions/*.*");
  	$count = $max - count($files);
  	$s = sprintf('%08d', $count);
	define('UPLOAD_DIR', 'submissions/');
	$baseFromJavascript = $_POST['imgBase64'];
	// We need to remove the "data:image/png;base64,"
	$base_to_php = explode(',', $baseFromJavascript);
	// the 2nd item in the base_to_php array contains the content of the image
	$data = base64_decode($base_to_php[1]);
	// here you can detect if type is png or jpg if you want
	$filepath = "submissions/image".$s.".png"; // or image.jpg
	// Save the image in a defined path
	file_put_contents($filepath,$data);
?>