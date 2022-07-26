<?php

trait Log
{
    public static function debug($logMessage)
    {
        $log_file_path = '../storage/app/logs/';
        if (!file_exists($log_file_path))
        {
            mkdir($log_file_path, 0777, true);
        }
        $log_file_data = $log_file_path . date('Y-m-d') . '.log';
        file_put_contents($log_file_data, $logMessage . "\n", FILE_APPEND);
    }
}