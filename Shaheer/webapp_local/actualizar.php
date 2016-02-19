<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

if(isset($_POST['submit'])){
	require_once('DAO/include_dao.php');

    $cliente = new Cliente();

    $cliente->id = htmlspecialchars(trim($_POST['cliente_id']));
	$cliente->nombres = htmlspecialchars(trim($_POST['nombres']));
	$cliente->ciudad = htmlspecialchars(trim($_POST['ciudad']));
	$cliente->sexo = htmlspecialchars(trim($_POST['alternativas']));
	$cliente->telefono = htmlspecialchars(trim($_POST['telefono']));
	$cliente->fechaNacimiento = htmlspecialchars(trim($_POST['fecha_nacimiento']));
	$cliente->imagen = htmlspecialchars(trim($_POST['imagen']));
	
	//start new transaction
   $transaction = new Transaction();

   $Tbl = DAOFactory::getClienteDAO();

	if ($Tbl->update($cliente) == true){
		echo 'correcto';
	}else{
		echo 'error';
	} 
}
?>