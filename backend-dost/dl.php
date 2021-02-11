<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
$filename = $_POST['filename'];
$type = $_POST['filetype'];
$typecomplete = $_POST['typecomplete'];
$filedata=$_POST['data'];
header('Content-Description: File Transfer');
header('Content-Type: '+$typecomplete);
header('Content-Disposition: attachment; filename='.$filename.$type);
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . strlen($filedata));
ob_clean();
flush();
echo $filedata;
exit; 
?>