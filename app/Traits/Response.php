<?php

trait Response
{
    public function response($successful, $data, $message, $errors = [], $responseCode = 200)
    {
        $response = new stdClass();
        $response->successful = $successful;
        $response->code = $responseCode;
        $response->message = $message;
        $response->errors = $errors;
        $response->values = $data;

        return json_encode($response);
    }

    public function successfulResponse($data = null, $message = 'Success')
    {
        return $this->response(true, $data, $message);
    }

    public function notFoundResponse($errors = [], $message = 'Not found')
    {
        return $this->response(false, null, $message, $errors,404);
    }

    public function serverErrorResponse($errors = [], $message = 'Server error.')
    {
        return $this->response(false, [], $message, $errors, 500);
    }

    public function validationErrorResponse($errors = [], $message = 'Validation error.')
    {
        return $this->response(false, [], $message, $errors, 400);
    }
}