<?php
include "config.php";

$title=$_REQUEST['title'];
$content=$_REQUEST['content'];
$post=new Post();
$post->newPost($title,$content);