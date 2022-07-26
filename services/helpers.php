<?php

/**
 * Generate random string
 *
 * @return string
 */
function _str_random($l) {
    $c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for ($i = 0, $z = strlen($c)-1, $s = $c{rand(0,$z)}, $i = 1; $i != $l; $x = rand(0,$z), $s .= $c{$x}, $s = ($s{$i} == $s{$i-1} ? substr($s,0,-1) : $s), $i=strlen($s));
    return $s;
}

/**
 * Get timestamp
 *
 * @return string
 */
function _now_timestamp() {
    return strtotime(date("Y-m-d H:i:s"));
}