<?php
require("dbconnection.php");
require_once('../app/Class/App.php');
require_once('helpers.php');
$app = new App();
$errors = [];

$request = [
    'data' => [
        'lastname' => filter_var($_POST['lastname'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH),
        'firstname' => filter_var($_POST['firstname'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH),
        'email' => filter_var($_POST['email'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH),
        'city' => filter_var($_POST['city'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH),
        'country' => filter_var($_POST['country'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH),
    ],
    'file' => [
        'filename' => $_FILES["image"]["name"],//file name
        'slug' => _str_random(20) . _now_timestamp(),//file name
        'tmp_loc' => $_FILES["image"]["tmp_name"],//file in the php temporary folder location
        'type' => $_FILES["image"]["type"],//type of file it is
        'extension' => pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION),//file extension
        'size' => $_FILES["image"]["size"],//file size (bytes)
        'error' => $_FILES["image"]["error"]//0 for false and 1 for true
    ]
];

$app::debug(print_r(['UPDATE CUSTOMER REQUEST', $request], true));

if (!$request['file']['tmp_loc']) {
} else {
    if (!in_array(strtolower($request['file']['extension']), ['jpg', 'jpeg'])) {
        $errors[] = 'Image only accepts jpg files';
    }
}

if ($request['file']['error'] == 1) {
    $errors[] = 'Cant accept image';
}

if(!($request['data']['lastname'] && isset($request['data']['lastname']) && !is_null($request['data']['lastname']))){
    $errors[] = 'Lastname required';
}
if(!($request['data']['firstname'] && isset($request['data']['firstname']) && !is_null($request['data']['firstname']))){
    $errors[] = 'Firstname required';
}

if(!($request['data']['email'] && isset($request['data']['email']) && !is_null($request['data']['email']))){
    $errors[] = 'Email required';
} else {
    if (!filter_var($request['data']['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Invalid email';
    }
}

if(!($request['data']['city'] && isset($request['data']['city']) && !is_null($request['data']['city']))){
    $errors[] = 'City required';
}
if(!($request['data']['country'] && isset($request['data']['country']) && !is_null($request['data']['country']))){
    $errors[] = 'Country required';
}

$app::debug(print_r(['UPDATE CUSTOMER ERROR', $errors], true));

if (!count($errors)) {
    $query = "UPDATE customers SET lastname = :lastname, firstname = :firstname, email = :email, city = :city, country = :country";

    if ($request['file']['tmp_loc']) {
        $relativeStoragePath = "../storage/app/attachments/";
        if (!file_exists($relativeStoragePath))
        {
            mkdir($relativeStoragePath, 0777, true);
        }
        $storagePath = "./storage/app/attachments/";
        $fileName = $request['file']['slug'] . '.' . strtolower($request['file']['extension']);

        if (move_uploaded_file($request['file']['tmp_loc'], $relativeStoragePath . $fileName)){

            $query .= ", image = :image WHERE id = :id";
            $statement = $databaseHandler->prepare($query);
            $statement->bindValue(':image', $storagePath . $fileName);

        } else {
            echo $app->serverErrorResponse([], 'Error uploading image');
            die();
        }
    } else {
        $query .= " WHERE id = :id";
        $statement = $databaseHandler->prepare($query);
    }

    $statement->bindValue(':lastname', $request['data']['lastname']);
    $statement->bindValue(':firstname', $request['data']['firstname']);
    $statement->bindValue(':email', $request['data']['email']);
    $statement->bindValue(':city', $request['data']['city']);
    $statement->bindValue(':country', $request['data']['country']);
    $statement->bindValue(':id', $_GET['id']);
    $statement->execute();

    echo $app->successfulResponse([], 'Customer updated');

} else {
    echo $app->validationErrorResponse($errors);
    die();
}

