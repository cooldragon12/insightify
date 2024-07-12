<?php
session_start();

$db_servername = "sql6.freesqldatabase.com";
$db_username = "sql6700012";
$db_password = "D3gevjgE4F";
$dbname = "sql6700012";


// Create connection
$conn = new mysqli($db_servername, $db_username, $db_password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

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
$password = $_POST['password'];

if(empty($email) || empty($password)){
	header ("Location: https://insightify-test-2q7f.onrender.com/login_signup.php?error= Please fill up all the blank fields.");
	exit();
}

$sql = "SELECT * FROM user_account WHERE email='$email'";

$result = $conn->query($sql);

if($result->num_rows === 1 && $result !== FALSE){
	$row = mysqli_fetch_assoc($result);
	if($row['email'] === $email){
	$salt = $row['salt'];
	$encrypted_password = $row['password'];
	$hashed_password = checkHashPassword($password, $salt)['passwordHash'];
	if($hashed_password == $encrypted_password){
		$_SESSION['email'] = $row['email'];  
		$_SESSION['username'] = $row['username'];
		header("Location: https://insightify-test-2q7f.onrender.com/dashboard.php");
		exit();

	}
	else{
		header ("Location: https://insightify-test-2q7f.onrender.com/login_signup.php?error= Incorrect Password");
		exit();
	}
	}
	else{
		header ("Location: https://insightify-test-2q7f.onrender.com/login_signup.php?error= User not Found");
		exit();
	}
	
}
else{
	header ("Location: https://insightify-test-2q7f.onrender.com/login_signup.php?error= Incorrect Password/email");
	exit();
}
$conn->close();
?>
