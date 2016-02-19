<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

	//include all DAO files
	require_once('DAO/include_dao.php');

	//start new transaction
	$transaction = new Transaction();

	$Tbl = DAOFactory::getClienteDAO();
	$consulta = $Tbl->queryAll();

	/*$longitud = count($consulta);
	
	for($i=0; $i<$longitud; $i++){
	  $consulta[$i]->apellidos = "Lopez Perez";
    }*/

	echo json_encode($consulta, JSON_FORCE_OBJECT);
?>