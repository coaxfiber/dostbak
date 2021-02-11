<?php


include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

  $stmt = $db->prepare("exec spResearchDocument_Select
    @Research_id = ".$_GET['data'].",
    @type = 0");  
  $stmt->execute();
  $app_list = array(
              "id" => null);
  $app_list = array(
               0 => $app_list);
  $x=0;
if($row = $stmt ->fetch()){


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

header('Content-Type: application/json');

header("Content-type:application/pdf");

// It will be called downloaded.pdf
echo base64_decode($row[3]);
}
else{
  echo "empty";
}

?>