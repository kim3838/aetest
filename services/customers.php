<?php
require("dbconnection.php");
require_once('../app/Class/App.php');
$app = new App();

$query = "SELECT * FROM customers ORDER BY id DESC;";
$statement = $databaseHandler->prepare($query);
$statement->execute();
$result = $statement->fetchAll();

echo $app->successfulResponse($result);
die();