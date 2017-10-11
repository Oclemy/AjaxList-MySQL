<?php
/**
 - Our requesthandler.php class.
 - Will handle incoming http get and post requests and call the appropriate methods based on the request.
 */
require_once("DBAdapter.php");
class RequestHandler
{
    /**
     *HANDLE INCOMING REQUEST
     */
    public function handleRequest()
    {
		
        if ($_POST['action'] == "save") {
            $dbAdapter = new DBAdapter();
            $title = $_POST['title'];
            $body = $_POST['body'];
            $dbAdapter->insert(array($title, $body));
        } else{
            $dbAdapter=new DBAdapter();
            $dbAdapter->select();
        }
    }
}
$requestHandler=new RequestHandler();
$requestHandler->handleRequest();
