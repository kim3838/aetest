<?php
error_reporting(0);
require_once('../app/Class/App.php');
$app = new App();

try {
    $hostname = '127.0.0.1';
    $username = "root";
    $password = "";
    $database = "dummy";
    $databaseHandler=new PDO("mysql:host=$hostname;dbname=$database","root","");
    $databaseHandler->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);
} catch (PDOException $e) {
    echo $app->serverErrorResponse([$e->getMessage()]);
    die();
}