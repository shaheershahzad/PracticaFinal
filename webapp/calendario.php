<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

require('functions.php');
$mes=$_GET['month'];
$anio=$_GET['year'];
$dia=1; //primer dia del mes
calendar($mes,$anio);
?>

