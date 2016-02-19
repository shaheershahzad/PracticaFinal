<?php
	if(isset($_POST['fileName']) && $_POST['fileName'] != ""){
		$nombre_img = $_POST['fileName'];
		$tmp_file = $_FILES['file']['tmp_name'];

		move_uploaded_file($tmp_file, 'profiles/'.$nombre_img);
	}
?>