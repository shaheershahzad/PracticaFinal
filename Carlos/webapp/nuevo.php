<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

if(isset($_POST['submit'])){
	require('clases/cliente.class.php');

	$nombres = htmlspecialchars(trim($_POST['nombres']));
	$ciudad = htmlspecialchars(trim($_POST['ciudad']));
	$sexo = htmlspecialchars(trim($_POST['alternativas']));
	$telefono = htmlspecialchars(trim($_POST['telefono']));
	$fecha_nacimiento = htmlspecialchars(trim($_POST['fecha_nacimiento']));
	
	$objCliente=new Cliente;
	if ( $objCliente->insertar(array($nombres,$ciudad,$sexo,$telefono,$fecha_nacimiento)) == true){
		echo 'Datos guardados';
	}else{
		echo 'Se produjo un error. Intente nuevamente';
	} 
}else{
?>
<form id="frmClienteNuevo" name="frmClienteNuevo" method="post" action="http://practicadawcarlos.esy.es/webapp/nuevo.php" onsubmit="GrabarDatos(); return false">
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

 <script>
 $('#fecha_nacimiento').datepicker({  changeMonth: true,
      changeYear: true,
 dateFormat: 'yy/mm/dd'

});
  </script>

    <label>Fecha Nacimiento <input type="text" id="fecha_nacimiento" name="fecha_nacimiento" >
    </label>
  </p>
  <p>
    <input type="submit" name="submit" id="button" value="Enviar" />
    <label></label>
    <input type="button" class="cancelar" name="cancelar" id="cancelar" value="Cancelar" onclick="Cancelar()" />
  </p>
</form>
<?php
}
?>