<?php
require_once('../app/Traits/Response.php');
require_once('../app/Traits/Log.php');

class App
{
    use Response, Log;

    public static function __callStatic(string $method, array $parameters)
    {
        return call_user_func_array(self::$methods[$method], $parameters);
    }
}