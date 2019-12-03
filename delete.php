<?php
include "config.php";

$id=$_REQUEST['id'];

$p=new Post();
$p->deletePost($id);