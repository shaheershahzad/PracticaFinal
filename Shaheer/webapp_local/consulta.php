<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:Origin,X-Requested-With, Content-Type, Accept");

require('clases/cliente.class.php');
$objCliente = new Cliente;
$consulta = $objCliente->mostrar_clientes();


/*<script type="text/javascript">
$(document).ready(function(){
	// mostrar formulario de actualizar datos
	$("table tr .modi a").click(function(){
		$('#tabla').hide();
		$("#formulario").show();
		$.ajax({
			url: this.href,
			type: "GET",
			success: function(datos){
				$("#formulario").html(datos);
			}
		});
		return false;
	});
	
	// llamar a formulario nuevo
	$("#nuevo a").click(function(){
		$("#formulario").show();
		$("#tabla").hide();
		$.ajax({
			type: "GET",
			url: 'nuevo.php',
			success: function(datos){
				$("#formulario").html(datos);
			}
		});
		return false;
	});
});

</script>
<span id="nuevo"><a href="nuevo.php"><img src="img/add.png" alt="Agregar dato" /></a></span>

	<table>
   		<tr>
   			<th>Nombres</th>
    		<th>Ciudad</th>
    		<th>Sexo</th>
    		<th>Telefono</th>
            <th>Fecha Nacimiento</th>
            <th></th>
            <th></th>
        </tr>
    </table>
    ?>
	
		  <tr id="fila-<?php echo $cliente['id'] ?>">
			  <td><?php echo $cliente['nombres'] ?></td>
			  <td><?php echo $cliente['ciudad'] ?></td>
			  <td><?php echo $cliente['sexo'] ?></td>
			  <td><?php echo $cliente['telefono'] ?></td>
			  <td><?php echo $cliente['fecha_nacimiento'] ?></td>
			  <td><span class="modi"><a href="actualizar.php?id=<?php echo $cliente['id'] ?>"><img src="img/database_edit.png" title="Editar" alt="Editar" /></a></span></td>
			  <td><span class="dele"><a onClick="EliminarDato(<?php echo $cliente['id'] ?>); return false" href="eliminar.php?id=<?php echo $cliente['id'] ?>"><img src="img/delete.png" title="Eliminar" alt="Eliminar" /></a></span></td>
		  </tr>
	<?php
*/
?>



<?php
$clientes = [];
if($consulta) {
	while( $cliente = mysql_fetch_array($consulta, MYSQL_ASSOC) ){
		$clientes[]=$cliente;
	}
	echo json_encode($clientes, JSON_FORCE_OBJECT);
}
?>
    
    