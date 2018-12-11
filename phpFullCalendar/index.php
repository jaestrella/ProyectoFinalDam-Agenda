<?php
    session_start();

    if(isset($_SESSION["loggedin"])&&$_SESSION["loggedin"]===true){
        header("location: calendario.php");
        exit;
    }
    
    require_once "login/config.php";

    $username=$password="";
    $username_err=$password_err="";

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        if(empty(trim($_POST["username"]))){
            $username_err="Inserte usuario.";
        }else{
            $username=trim($_POST["username"]);
        }
        if(empty(trim($_POST["password"]))){
            $password_err="Inserte contraseña.";
        }else{
            $password=trim($_POST["password"]);
        }
        if(empty($username_err)&&empty($password_err)){
            $sql="SELECT id, username, password FROM users WHERE username=?";
            if($stmt=mysqli_prepare($link,$sql)){
                mysqli_stmt_bind_param($stmt,"s",$param_username);
                $param_username=$username;
                if(mysqli_stmt_execute($stmt)){
                    mysqli_stmt_store_result($stmt);
                    if(mysqli_stmt_num_rows($stmt)==1){
                        mysqli_stmt_bind_result($stmt,$id,$username,$hashed_password);
                        if(mysqli_stmt_fetch($stmt)){
                            if(password_verify($password,$hashed_password)){
                                session_start();
                                $_SESSION["loggedin"]=true;
                                $_SESSION["id"]=$id;
                                $_SESSION["username"]=$username;
                                header("location: calendario.php");
                            }else{
                                $password_err="La contraseña no es válida.";
                            }
                        }
                    }else{
                        $username_err="El usuario no existe.";
                    }
                }else{
                    echo "Ha habido un error. Intentelo más tarde.";
                }
            }
            mysqli_stmt_close($stmt);
        }
        mysqli_close($link);
    }
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Acceder</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
        <style type="text/css">
            body{font:14px sans-serif;}
            .wrapper{width:350px; padding:20px;}
        </style>
    </head>
    <body>
        <div class="wrapper">
            <h2>ACCEDER</h2>
            <p>Rellene los campos para acceder.</p>    
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
                <div class="from-group <?php echo(!empty($username_err))?'has-error':'';?>">
                    <label>Usuario</label>
                    <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                    <span class="help-block"><?php echo $username_err; ?></span>
                </div>
                <div class="from-group <?php echo(!empty($password_err))?'has-error':'';?>">
                    <label>Contraseña</label>
                    <input type="password" name="password" class="form-control">
                    <span class="help-block"><?php echo $password_err; ?></span>
                </div>
                <div class="from-group">
                    <input type="submit" class="btn btn-primary" value="Aceptar">
                </div>
                <p>¿No tiene cuenta? <a href="login/signup.php">Registrese</a>.</p>
            </form>
        </div>
    </body>
</html>