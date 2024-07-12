<?php
session_start();

session_unset();
session_destroy();

header("Location: https://insightify-test-2q7f.onrender.com/homepage.php");
?>