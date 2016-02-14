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
					success: function(data){
						if(data == "correcto"){
							acciones.read();
							acciones.showSuccess();
						}else{
							acciones.showError();
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
				success: function(data){
					var table = $("#tabla");
					var table_html = "";
					clientes = [];
					for(var i in data){
						clientes.push(data[i]);
						table_html += "<tr rel='popover' data-img='img/add.png' id='cliente" +data[i].id +"'><td>" +data[i].nombres +"</td><td>" +data[i].ciudad +"</td><td>" +data[i].sexo +"</td><td>" +data[i].telefono +"</td><td>" +data[i].fechaNacimiento +"</td><td id='acciones'><a onClick='CRUD.init.updateForm(" +data[i].id +"); return false'><button type='button' class='btn btn-info btn-xs' alt='Editar' title='Editar'>Editar <span class='glyphicon glyphicon-edit' aria-hidden='true'></span></button></a></td><td id='acciones'><a onClick='CRUD.init.delete(" +data[i].id +"); return false'><button type='button' class='btn btn-danger btn-xs' alt='Eliminar' title='Eliminar'>Eliminar <span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></button></a></td></tr>";
					}
		            table.html("<a onclick='CRUD.init.createForm()'><button type='button' id='add_btn' class='btn btn-success btn-xs' alt='Añadir' title='Añadir'>Añadir <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span></button></a></span><table class='table table-bordered table-hover'><tr><th>NOMBRES</th><th>CIUDAD</th><th>SEXO</th><th>TELEFONO</th><th>FECHA NACIMIENTO</th><th colspan='2' id='acciones'>ACCIONES</th></tr>" +table_html +"</table>");
					acciones.hoverImage();
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
					success: function(data){
						if(data == "correcto"){
							var index = $("#cliente"+id).index() - 1;
							clientes[index].nombres = nombres;
							clientes[index].ciudad = ciudad;
							clientes[index].sexo = alternativas;
							clientes[index].telefono = telefono;
							clientes[index].fecha_nacimiento = fecha_nacimiento;
							acciones.read();
							acciones.showInfo();
						}else{
							acciones.showError();
						}
						$("#formulario").hide();
						$("#tabla").show();
					}
				});
				return false;
			},

			delete: function(id){
				var nombre = $("#cliente"+id +" td").html();
				var index = $("#cliente"+id).index() - 1;
				bootbox.confirm("¿Desea eliminar a " +nombre +"?", function(result) {
  					if(result){
  						$.ajax({
							url: 'eliminar.php',
							type: "POST",
							data: "id="+id,
							success: function(data){
								if(data == "correcto"){
									clientes.splice(index,1);
									$("#cliente"+id).remove();
									acciones.showSuccess();
								}else{
									acciones.showError();
								}
							}
						});
  					}
				}); 
				return false;
			},

			createForm: function(){
				$("#paginacion").hide();
				$("#tabla").hide();
		    	$("#frmClienteNuevo").each(function(){
		  			this.reset();
				});
				$("#frmClienteNuevo").attr('onsubmit','CRUD.init.create(); return false');
				$("#cancelar").attr('onclick','CRUD.init.cancel(); return false');
				$("#button").val("Enviar");
				acciones.calendar();
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
				var fecha_nacimiento = clientes[index].fechaNacimiento;

				//Insertar los datos en el formulario
				$('#nombres').val(nombre);
				$('#ciudad').val(ciudad);
				$("input[value='" +sexo +"']").prop("checked",true);
				$("#telefono").val(telefono);
				$("#fecha_nacimiento").val(fecha_nacimiento);

				$("#paginacion").hide();
				$("#tabla").hide();
				$("#button").val("Actualizar");
				acciones.calendar();
				$("#formulario").show();
			},

			calendar: function(){
				$('#fecha_nacimiento').datepicker({  
					changeMonth: true,
			    	changeYear: true,
                    yearRange: '-100:+0', //+0 no permite poner una fecha mayor a la actual y -100 coge el año actual y le resta 100 años.
			    	dateFormat: 'yy/mm/dd'
				});
			},

			cancel: function(){
				$("#formulario").hide();
				$("#tabla").show();
				$("#paginacion").show();
				return false;
			},

			showSuccess: function(){
				var show = $("#exito");
				show.show();
				setTimeout(function() { 
					show.hide(); 
				}, 2000);
			},

			showInfo: function(){
				var info = $("#info");
				info.show();
				setTimeout(function() { 
					info.hide(); 
				}, 2000);
			},

			showError: function(){
				var error = $("#error");
				error.show();
				setTimeout(function() { 
					error.hide(); 
				}, 2000);
			},

			hoverImage: function(){
				$('tr[rel="popover"]').popover({
				  html: true,
				  trigger: 'hover',
				  placement: 'left',
				  container: 'body',
				  content: function(){
				  	return '<img src="'+$(this).data('img') + '" />'
				  }
				});
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