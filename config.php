<?php
header("Content-type: application/json");

class Post{
    public $db;
    public function __construct()
    {
        try{
            $this->db=new PDO("mysql:host=localhost; dbname=thaton_api", 'root', '');
        }catch (PDOException $e){
            $msg=["message"=>"Connection failed to database server."];
            echo json_encode($msg);
        }
    }
    public function deletePost($id){
        $sql="delete from posts where id='$id'";
        $result=$this->db->query($sql);
        if($result){
            $msg=['message'=>'The selected post have been deleted.'];
        }
        echo json_encode($msg);
    }
    public function getPost(){
        $sql="select * from posts order by id desc";
        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }
    public function newPost($title,$content){
        $sql="insert into posts (title, content, post_at) values ('$title','$content',now())";
        $result=$this->db->query($sql);
        if($result){
            $msg=['message'=>'The post have been created.'];
        }else{
           $msg=['message'=>'The post created failed.'] ;
        }
        echo json_encode($msg);
    }
}

//new Post();