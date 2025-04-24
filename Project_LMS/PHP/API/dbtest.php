<?php
  class DbTest{
    private $conn;

    public function __construct($db){
      $this->conn = $db;
    }

    public function checkConnection(){
      if($this->conn){
        return ["status" => "success", "message" => "Database Connect successfully" ];
      }
      else{
        return ["status" => "failed", "message" => "Failed to connect to database" ];
      }
    }
  }
?>