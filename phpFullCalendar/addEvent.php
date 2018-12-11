<?php
    require_once('db.php');
    if(isset($_POST['title'])&&isset($_POST['start'])&&isset($_POST['end'])&&isset($_POST['color'])){
        $title=$_POST['title'];
        $start=$_POST['start'];
        $end=$_POST['end'];
        $color=$_POST['color'];

        $sql="INSERT INTO events(title, start, end, color) values ('$title', '$start', '$end', '$color')";
        echo $sql;
        $query=$bdd->prepare($sql);
        if($query==false){
            print_r($bdd->errorInfo());
            die('Error prepare');
        }
        $sth=$query->execute();
        if($sth==false){
            print_r($query->errorInfo());
            die('Error ejecutar');
        }
    }
    header('Location: '.$_SERVER['HTTP_REFERER']);
?>