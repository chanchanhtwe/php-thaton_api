<?php
include "config.php";

$post=new Post();
$p=$post->getPost();
echo json_encode($p);