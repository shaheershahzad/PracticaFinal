<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

//require('clases/cliente.class.php');

require_once('DAO/include_dao.php');

	$cliente_id = $_POST['id'];

	//start new transaction
	$transaction = new Transaction();

	$Tbl = DAOFactory::getClienteDAO();
	
	if($Tbl->delete($cliente_id) == true){
		echo "correcto";
	}else{
		echo "error";
	}

/*$objCliente=new Cliente;
if( $objCliente->eliminar($cliente_id) == true){
	
}*/
?>