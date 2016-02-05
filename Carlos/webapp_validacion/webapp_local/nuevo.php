<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

if(isset($_POST['submit'])){
	//require('clases/cliente.class.php');
  require_once('DAO/include_dao.php');

  $cliente = new Cliente();

	$cliente->nombres = htmlspecialchars(trim($_POST['nombres']));
	$cliente->ciudad = htmlspecialchars(trim($_POST['ciudad']));
	$cliente->sexo = htmlspecialchars(trim($_POST['alternativas']));
	$cliente->telefono = htmlspecialchars(trim($_POST['telefono']));
	$cliente->fechaNacimiento = htmlspecialchars(trim($_POST['fecha_nacimiento']));
	
	//start new transaction
  $transaction = new Transaction();

  $Tbl = DAOFactory::getClienteDAO();

	if ($Tbl->insert($cliente) == true){
		echo 'correcto';
	}else{
		echo 'error';
	} 
}/*else{
  <form id="frmClienteNuevo" name="frmClienteNuevo" method="post" action="nuevo.php" onsubmit="GrabarDatos(); return false">
  <p><label>Nombres<br />
  <input class="text" type="text" name="nombres" id="nombres" />
  </label>
  </p>
  <p>
    <label>Ciudad<br />
    <input class="text" type="text" name="ciudad" id="ciudad" />
    </label>
  </p>
  <p>
    <label>
    <input type="radio" name="alternativas" id="masculino" value="M" />
    Masculino</label>
    <label>
    <input type="radio" name="alternativas" id="femenino" value="F" />
    Femenino</label>
  </p>
  <p>
    <label>Telefono<br />
    <input class="text" type="text" name="telefono" id="telefono" />
    </label>
  </p>
  <p>
    <label>Fecha Nacimiento <a onclick="show_calendar()" style="cursor: pointer;">
<small>(calendario)</small>
</a><br />
    <input readonly="readonly" class="text" type="text" name="fecha_nacimiento" id="fecha_nacimiento" value="<?php echo date("Y-m-j")?>" />
    <div id="calendario" style="display:none;"><?php calendar_html() ?></div>
    </label>
  </p>
  <p>
    <input type="submit" name="submit" id="button" value="Enviar" />
    <label></label>
    <input type="button" class="cancelar" name="cancelar" id="cancelar" value="Cancelar" onclick="Cancelar()" />
  </p>
</form>
}*/
?>