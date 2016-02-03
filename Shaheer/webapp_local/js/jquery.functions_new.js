var CRUD = (function(){
	var clientes;

	var acciones = (function(){
		return {
			create: function(){
				var nombres = $('#nombres').val();
				var ciudad = $('#ciudad').val(); 
				var alternativas = $("input[name^='alternativas']:checked").val();
				var telefono = $("#telefono").val();
				var fecha_nacimiento = $("#fecha_nacimiento").val();

				$.ajax({
					url: 'nuevo.php',
					type: "POST",
					data: "submit=&nombres="+nombres+"&ciudad="+ciudad+"&alternativas="+alternativas+"&telefono="+telefono+"&fecha_nacimiento="+fecha_nacimiento,
					success: function(datos){
						if(datos == "correcto"){
							alert("Registro guardado correctamente");
							acciones.read();
						}else{
							alert("Error al guardar!");
						}			
						$("#formulario").hide();
						$("#tabla").show();
					}
				});
				return false;
			},

			read: function(){
	    		$.ajax({
				url: 'consulta.php',
				type: 'POST',
				dataType: 'json',
				success : function(data){
					var table = $("#tabla");
					var table_html = "";
					clientes = [];
					for(var i in data){
						clientes.push(data[i]);
						table_html += "<tr id='cliente" +data[i].id +"'><td>" +data[i].nombres +"</td><td>" +data[i].ciudad +"</td><td>" +data[i].sexo +"</td><td>" +data[i].telefono +"</td><td>" +data[i].fecha_nacimiento +"</td><td><a onClick='CRUD.init.updateForm(" +data[i].id +"); return false'><img src='img/database_edit.png' title='Editar' alt='Editar' /></a></td><td><a onClick='CRUD.init.delete(" +data[i].id +"); return false'><img src='img/delete.png' title='Eliminar' alt='Eliminar' /></a></td></tr>";
					}
		            table.html("<span id='nuevo'><a onclick='CRUD.init.createForm()'><img src='img/add.png' alt='Agregar dato' /></a></span><table><tr><th>NOMBRES</th><th>CIUDAD</th><th>SEXO</th><th>TELEFONO</th><th>FECHA NACIMIENTO</th><th></th><th></th></tr>" +table_html +"</table>");
				}	
				});
			},

			update: function(id){
				var cliente_id = id;
				var nombres = $('#nombres').val();
				var ciudad = $('#ciudad').val(); 
				var alternativas = $("input[name^='alternativas']:checked").val();
				var telefono = $("#telefono").val();
				var fecha_nacimiento = $("#fecha_nacimiento").val();

				$.ajax({
					url: 'actualizar.php',
					type: "POST",
					data: "submit=&nombres="+nombres+"&ciudad="+ciudad+"&alternativas="+alternativas+"&telefono="+telefono+"&fecha_nacimiento="+fecha_nacimiento+"&cliente_id="+cliente_id,
					success: function(datos){
						if(datos == "correcto"){
							var index = $("#cliente"+id).index() - 1;
							clientes[index].nombres = nombres;
							clientes[index].ciudad = ciudad;
							clientes[index].sexo = alternativas;
							clientes[index].telefono = telefono;
							clientes[index].fecha_nacimiento = fecha_nacimiento;
							alert("Registro actualizado correctamente.");
							acciones.read();
						}else{
							alert("Error al actualizar!");
						}
						$("#formulario").hide();
						$("#tabla").show();
					}
				});
				return false;
			},

			delete: function(id){
				var nombre = $("#cliente"+id +" td").html();
				var msg = confirm("¿Desea eliminar a " +nombre +"?");
				if ( msg ) {
					$.ajax({
						url: 'eliminar.php',
						type: "POST",
						data: "id="+id,
						success: function(datos){
							if(datos == "correcto"){
								alert("El registro ha sido eliminado correctamente.");
								$("#cliente"+id).remove();
							}else{
								alert("Error al eliminar!");
							}
						}
					});
				}
				return false;
			},

			createForm: function(){
				$("#tabla").hide();
		    	$('#frmClienteNuevo').each(function(){
		  			this.reset();
				});
				$("#frmClienteNuevo").attr('onsubmit','CRUD.init.create(); return false');
				$("#cancelar").attr('onclick','CRUD.init.cancel(); return false');
				$("#button").val("Enviar");
		    	$("#formulario").show();
			},

			updateForm: function(id){
				$("#frmClienteNuevo").attr('onsubmit','CRUD.init.update(' +id +'); return false');
	    		$("#cancelar").attr('onclick','CRUD.init.cancel(); return false');
				var index = $("#cliente"+id).index() - 1;
				var nombre = clientes[index].nombres;
				var ciudad = clientes[index].ciudad;
				var sexo = clientes[index].sexo;
				var telefono = clientes[index].telefono;
				var fecha_nacimiento = clientes[index].fecha_nacimiento;

				//Insertar los datos en el formulario
				$('#nombres').val(nombre);
				$('#ciudad').val(ciudad);
				$("input[value='" +sexo +"']").prop("checked",true);
				$("#telefono").val(telefono);
				$("#fecha_nacimiento").val(fecha_nacimiento);

				$("#tabla").hide();
				$("#button").val("Actualizar");
				$("#formulario").show();
			},

			cancel: function(){
				$("#formulario").hide();
				$("#tabla").show();
				return false;
			}
		};
	}());

	return{
		init: acciones
	};
}());

$(document).ready(function(){
	CRUD.init.read();
});

    /*var clientes;

    function consulta(){
    	$.ajax({
		url: 'consulta.php',
		type: 'POST',
		dataType: 'json',
		success : function(data){
			var table = $("#tabla");
			var table_html = "";
			clientes = [];
			for(var i in data){
				clientes.push(data[i]);
				table_html += "<tr id='cliente" +data[i].id +"'><td>" +data[i].nombres +"</td><td>" +data[i].ciudad +"</td><td>" +data[i].sexo +"</td><td>" +data[i].telefono +"</td><td>" +data[i].fecha_nacimiento +"</td><td><a onClick='form_editar("+data[i].id +"); return false'><img src='img/database_edit.png' title='Editar' alt='Editar' /></a></td><td><a onClick='eliminar("+data[i].id +"); return false'><img src='img/delete.png' title='Eliminar' alt='Eliminar' /></a></td></tr>";
			}
            table.html("<span id='nuevo'><a onclick='add_form()'><img src='img/add.png' alt='Agregar dato' /></a></span><table><tr><th>NOMBRES</th><th>CIUDAD</th><th>SEXO</th><th>TELEFONO</th><th>FECHA NACIMIENTO</th><th></th><th></th></tr>" +table_html +"</table>");
			}	
		});
    }
	
	/*function add_form(){
		var add = $("#formulario");
		var form = '<form id="frmClienteNuevo" name="frmClienteNuevo" method="post" onsubmit="guardar(); return false"><p><label>Nombres<br /><input class="text" type="text" name="nombres" id="nombres" /></label></p><p><label>Ciudad<br /><input class="text" type="text" name="ciudad" id="ciudad" /></label></p><p><label><input type="radio" name="alternativas" id="masculino" value="M" />Masculino</label><label><input type="radio" name="alternativas" id="femenino" value="F" />Femenino</label></p><p><label>Telefono<br /><input class="text" type="text" name="telefono" id="telefono" /></label></p><p><label>Fecha Nacimiento <small>(calendario)</small><br /><input type="text" name="fecha_nacimiento" id="fecha_nacimiento" /></label></p><p><input type="submit" name="submit" id="button" value="Enviar" />&nbsp;<label></label><input type="button" class="cancelar" name="cancelar" id="cancelar" value="Cancelar" onclick="Cancelar()" /></p></form>';
		$("#tabla").hide();
		add.html(form);
		$('#fecha_nacimiento').datepicker({  
			changeMonth: true,
	    	changeYear: true,
	    	dateFormat: 'yy/mm/dd'
		});
		add.show();
	}*/

	/*function eliminar(id){
		var nombre = $("#cliente"+id +" td").html();
		var msg = confirm("¿Desea eliminar a " +nombre +"?");
		if ( msg ) {
			$.ajax({
				url: 'eliminar.php',
				type: "POST",
				data: "id="+id,
				success: function(datos){
					if(datos == "correcto"){
						alert("El registro ha sido eliminado correctamente.");
						$("#cliente"+id).remove();
					}else{
						alert("Error al eliminar!");
					}
				}
			});
		}
		return false;
	}

	function guardar(){
		var nombres = $('#nombres').val();
		var ciudad = $('#ciudad').val(); 
		var alternativas = $("input[name^='alternativas']:checked").val();
		var telefono = $("#telefono").val();
		var fecha_nacimiento = $("#fecha_nacimiento").val();

		$.ajax({
			url: 'nuevo.php',
			type: "POST",
			data: "submit=&nombres="+nombres+"&ciudad="+ciudad+"&alternativas="+alternativas+"&telefono="+telefono+"&fecha_nacimiento="+fecha_nacimiento,
			success: function(datos){
				if(datos == "correcto"){
					alert("Registro guardado correctamente");
					consulta();
				}else{
					alert("Error al guardar!");
				}			
				$("#formulario").hide();
				$("#tabla").show();
			}
		});
		return false;
	}

	function form_editar(id){
		$("#frmClienteNuevo").attr('onsubmit','actualizar(' +id +'); return false');
		var index = $("#cliente"+id).index() - 1;
		var nombre = clientes[index].nombres;
		var ciudad = clientes[index].ciudad;
		var sexo = clientes[index].sexo;
		var telefono = clientes[index].telefono;
		var fecha_nacimiento = clientes[index].fecha_nacimiento;

		//Insertar los datos en el formulario
		$('#nombres').val(nombre);
		$('#ciudad').val(ciudad);
		$("input[value='" +sexo +"']").prop("checked",true);
		$("#telefono").val(telefono);
		$("#fecha_nacimiento").val(fecha_nacimiento);

		$("#tabla").hide();
		$("#button").val("Actualizar");
		$("#formulario").show();
	}

	function actualizar(id){
		var cliente_id = id;
		var nombres = $('#nombres').val();
		var ciudad = $('#ciudad').val(); 
		var alternativas = $("input[name^='alternativas']:checked").val();
		var telefono = $("#telefono").val();
		var fecha_nacimiento = $("#fecha_nacimiento").val();

		$.ajax({
			url: 'actualizar.php',
			type: "POST",
			data: "submit=&nombres="+nombres+"&ciudad="+ciudad+"&alternativas="+alternativas+"&telefono="+telefono+"&fecha_nacimiento="+fecha_nacimiento+"&cliente_id="+cliente_id,
			success: function(datos){
				if(datos == "correcto"){
					var index = $("#cliente"+id).index() - 1;
					clientes[index].nombres = nombres;
					clientes[index].ciudad = ciudad;
					clientes[index].sexo = alternativas;
					clientes[index].telefono = telefono;
					clientes[index].fecha_nacimiento = fecha_nacimiento;
					alert("Registro actualizado correctamente.");
					consulta();
				}else{
					alert("Error al actualizado");
				}
				$("#formulario").hide();
				$("#tabla").show();
			}
		});
		return false;
	}*/