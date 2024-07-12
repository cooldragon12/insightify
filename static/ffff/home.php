<?php
session_start();
?>
<!DOCTYPE html>
<html>
	<head>
	</head>
	<body>
		Welcome
		<?php
		echo $_SESSION["firstname"];
		echo " ";
		echo $_SESSION["lastname"];
		?>
	</body>
</html>