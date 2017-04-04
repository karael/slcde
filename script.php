<?php

    $string = '';

    for ($i=0; $i < 100; $i++) {
        $string = $string.'<div class="circle" data-id="'.$i.'"></div>'.PHP_EOL;
    }

    file_put_contents('line.txt', $string);