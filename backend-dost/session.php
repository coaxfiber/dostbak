<?php

session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
header('Content-Type: application/json');

switch ($_GET["action"])
    { 
      case "2":
        $_SESSION['uname']="set";
         $app_list = array(
                    "username" => null
                    );
        break;

      case "1":
         $app_list = array(
                    "username" => $_SESSION['uname']
                    );
        break;
    }


exit(json_encode($app_list));

?>