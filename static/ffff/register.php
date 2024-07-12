<?php
session_start();
require "connection.php";


//Functions

function getRandomString($length) {
    return bin2hex(random_bytes($length / 2));
}

function sha512($userpassword, $salt) {
    $hash = hash_hmac('sha512', $userpassword, $salt);
    return array(
        'salt' => $salt,
        'passwordHash' => $hash
    );
}

function saltHashPassword($userPassword) {
    $salt = getRandomString(16);
    $passwordData = sha512($userPassword, $salt);
    return $passwordData;
}


function checkHashPassword($userPassword, $salt) {
    $passwordData = sha512($userPassword, $salt);
    return $passwordData;
}

$email = $_POST['email'];
$username = $_POST['username'];
$email = $_POST['username'];
$plain_password = $_POST['password'];
$dateofbirth = $_POST['dateofbirth'];

if(empty($email) || empty($password)){
	header ("Location: https://insightify-test-2q7f.onrender.com/login_signup.php?error= Please fill up all the blank fields.");
	exit();
}

$sql = "SELECT * FROM user_account WHERE email='$email'";

$result = $conn->query($sql);

if($result->num_rows === 1 && $result !== FALSE){
	$row = mysqli_fetch_assoc($result);
	if($row['email'] === $email){
		echo "user already registered";
		exit();
	}
    else{
        
    }
}
else{
	$hash_data = saltHashPassword($plain_password);
        $password = $hash_data['passwordHash'];
        $salt = $hash_data['salt'];
        $sql = "INSERT INTO user_account (`email`, `username`, `password`, `salt`, `date_of_birth`, `date_joined`) VALUES('$email','$username','$password','$salt','$dateofbirth',NOW())";
        echo "registered sucessfully";
        exit();
}
?>
