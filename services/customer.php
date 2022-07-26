<?php
require("dbconnection.php");
require_once('../app/Class/App.php');
$app = new App();

$filters = json_decode($_POST['filters'], true);


$query = "SELECT * FROM customers";

if($filters) {

    $index = 0;
    foreach ($filters as $attribute => $value){
        $query .= (' ' . ($index == 0 ? 'WHERE' : 'AND') . ' ' . $attribute . ' = :' . $attribute);
        $index+=1;
    }

    $statement = $databaseHandler->prepare($query);

    foreach ($filters as $attribute => $value){
        $statement->bindValue(':' . $attribute, $value);
    }

    $statement->execute();
    $result = $statement->fetchAll();

    if($statement->rowCount() > 0) {
        echo $app->successfulResponse($result);
        die();
    } else {
        echo $app->notFoundResponse();
        die();
    }
} else {
    echo $app->notFoundResponse();
    die();
}

