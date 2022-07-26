<?php
error_reporting(0);
require_once('../app/Class/App.php');
$app = new App();

try {
    $hostname = '127.0.0.1';
    $username = "u624157578_aeptest_user";
    $password = "7|X69@wO";
    $database = "u624157578_aeptest";
    $databaseHandler=new PDO("mysql:host=$hostname;dbname=$database",$username,$password);
    $databaseHandler->setAttribute(PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_USE_BUFFERED_QUERY);
} catch (PDOException $e) {
    echo $app->serverErrorResponse([$e->getMessage()]);
    die();
}