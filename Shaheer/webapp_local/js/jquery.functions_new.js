var CRUD = (function(){
	var clientes;
	var acciones = (function(){
		return {
			//Insertamos los datos a la BBDD
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

			//Recibimos todos los clientes de la BBDD
			read: function(){
				clientes = [];
	    		$.ajax({
					url: 'consulta.php',
					type: 'POST',
					dataType: 'json',
					success: function(data){
						var table = $("#tabla");
						var table_html = "";
						for(var i in data){
							clientes.push(data[i]);
						}

						acciones.paginate(1);						
					}		
				});
			},

			//Modificamos el cliente seleccionado
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

			//Borramos el cliente seleccionado
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

			//Mostramos el formulario de insertar cliente
			createForm: function(){
				//Ocultamos la paginacion y la tabla
				$("#paginacion").hide();
				$("#tabla").hide();

				//Limpiamos el formulario
		    	$("#frmClienteNuevo").each(function(){
		  			this.reset();
				});

				$("#frmClienteNuevo").attr('onsubmit','CRUD.init.create(); return false');
				
				//Modificamos los botones del formulario
				$("#cancelar").attr('onclick','CRUD.init.cancel(); return false');
				$("#button").val("Enviar");
				acciones.calendar();
				$("#button").attr('onclick','CRUD.init.verifyOnSend()');

				//Modificamos los inputs del formulario
				$('#nombres').attr("onchange","CRUD.init.validationInput('nombres')");
				$('#ciudad').attr("onchange","CRUD.init.validationInput('ciudad')");
				$("#masculino").attr("onchange","CRUD.init.validationInput('alternativas')");
				$("#femenino").attr("onchange","CRUD.init.validationInput('alternativas')");
				$('#telefono').attr("onchange","CRUD.init.validationInput('telefono')");
				$('#fecha_nacimiento').attr("onchange","CRUD.init.validationInput('fecha_nacimiento')");
		    	
				//Mostramos el formulario de crear
		    	$("#formulario").show();
			},

			//Mostramos el formulario de actualizar cliente
			updateForm: function(id){
				var inputNombres = $('#nombres');
				var inputCiudad = $('#ciudad');
				var inputTelefono = $('#telefono');
				var inputFechaNacimiento = $('#fecha_nacimiento');

				var nombre, ciudad, sexo, telefono, fecha_nacimiento;
				$("#frmClienteNuevo").attr('onsubmit','CRUD.init.update(' +id +'); return false');
	    		$("#cancelar").attr('onclick','CRUD.init.cancel(); return false');
				//var index = $("#cliente"+id).index() - 1;

				$("#cliente"+id).each(function () {
					nombre = $(this).find("td").eq(0).html();
					ciudad = $(this).find("td").eq(1).html();
					sexo = $(this).find("td").eq(2).html();
					telefono = $(this).find("td").eq(3).html();
					fecha_nacimiento = $(this).find("td").eq(4).html();
				});

				/*
				var nombre = clientes[index].nombres;
				//var apellidos = clientes[index].apellidos;
				var ciudad = clientes[index].ciudad;
				var sexo = clientes[index].sexo;
				var telefono = clientes[index].telefono;
				var fecha_nacimiento = clientes[index].fechaNacimiento;*/

				//Insertar los datos en el formulario
				inputNombres.val(nombre);
				//$('#apellidos').val(apellidos);
				inputCiudad.val(ciudad);
				$("input[value='" +sexo +"']").prop("checked",true);
				inputTelefono.val(telefono);
				inputFechaNacimiento.val(fecha_nacimiento);

				$("#paginacion").hide();
				$("#tabla").hide();
				$("#button").val("Actualizar");
				$("#button").attr('onclick','CRUD.init.verifyOnSend()');
				document.frmClienteNuevo.submit.disabled = false;
				acciones.calendar();

				inputNombres.attr("onchange","CRUD.init.validationInput('nombres')");
				inputCiudad.attr("onchange","CRUD.init.validationInput('ciudad')");
				$("#masculino").attr("onchange","CRUD.init.validationInput('alternativas')");
				$("#femenino").attr("onchange","CRUD.init.validationInput('alternativas')");
				inputTelefono.attr("onchange","CRUD.init.validationInput('telefono')");
				inputFechaNacimiento.attr("onchange","CRUD.init.validationInput('fecha_nacimiento')");
				$("#formulario").show();
			},

			//Quitamos todas las validaciones
			clearValidation: function(){
				//Quitamos las imagenes de tick y cross
				$("#glypcnnombres").remove();
			    $("#glypcnciudad").remove();
			    $("#glypcnalternativas").remove();
			    $("#glypcntelefono").remove();
			    $("#glypcnfecha_nacimiento").remove();

			    //Quitamos los colores de los inputs
			    $('#nombres').parent().parent().attr("class", "form-group has-feedback");
			    $('#ciudad').parent().parent().attr("class", "form-group has-feedback");
			    $('#masculino').parent().parent().parent().attr("class", "form-group has-feedback");
			    $('#telefono').parent().parent().attr("class", "form-group has-feedback");
			    $('#fecha_nacimiento').parent().parent().attr("class", "form-group has-feedback");

			    //Ocultamos el formulario y mostramos la tabla y la paginación 
			    $("#formulario").hide();
			    $("#tabla").show();
			    $("#paginacion").show();
			    
			    //Dejamos activado el botón de enviar o actualizar
			    document.frmClienteNuevo.submit.disabled = false;
			    return false;
			},

			//Verificamos los campos antes de enviar los datos
			verifyOnSend: function(){
				var v1 = 0, v2 = 0, v3 = 0, v4 = 0, v5 = 0;
			    v1 = acciones.validationInput('nombres');
			    v2 = acciones.validationInput('ciudad');
			    v3 = acciones.validationInput('alternativas');
			    v4 = acciones.validationInput('telefono');
			    v5 = acciones.validationInput('fecha_nacimiento');

                if (v1 === false || v2 === false || v3 === false || v4 === false || v5 === false) {    
                    document.frmClienteNuevo.submit.disabled = true;
                }else{               
                   document.frmClienteNuevo.submit.disabled = false;
                   acciones.clearValidation();          
             	}
			},

			//Verificamos cada campo
			validationInput: function(campo){
				var a=0;           
	            if (campo==='nombres'){
	                nombre = document.getElementById(campo).value;
	                if(nombre.length == 0 || !/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/.test(nombre)) {             
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
	                    return false;

	                }else{
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
	                    document.frmClienteNuevo.submit.disabled=false;
	                    return true;
	                } 
	            }

	            if (campo==='ciudad'){
	                city = document.getElementById(campo).value;
	                if(city.length == 0 || !/^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/.test(city)) {

	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
	                    return false;

	                }
	                else{
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
	                    document.frmClienteNuevo.submit.disabled=false;
	                    return true;

	                } 
	            }

	            if (campo==='telefono'){
	                telef = document.getElementById(campo).value;
	                if(isNaN(telef) || telef.length == 0){
	                // if( !(/^\d{9}$/.test(telef)) ) { //valida que tenga nueve digitos y sin espacios
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
	                    return false;
	                }else{
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
	                    document.frmClienteNuevo.submit.disabled=false;
	                    return true;
	                }
	            }

		        if (campo==='alternativas'){  //RADIOBUTTONS
		            opciones = document.getElementsByName(campo);
		            var seleccionado = false;
		            for(var i=0; i<opciones.length; i++) {    
		            	if(opciones[i].checked) {
			                seleccionado = true;
			                break;
		            	}
		        	}

			        if(!seleccionado) {
			            $('#masculino').parent().parent().parent().attr("class", "form-group has-error has-feedback");
			            return false;
			        }else{
			            $('#masculino').parent().parent().parent().attr("class", "form-group has-success");
			            document.frmClienteNuevo.submit.disabled=false;
			            return true;
	        		}
    			}

			    if (campo==='fecha_nacimiento'){
			        fecha = document.getElementById(campo).value;
			        /*
			        var RegExPattern1 = /^\d{4}\/\d{2}\/\d{2}$/; // patron yyyy/mm/dd
			        var RegExPattern2 = /^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}$/;
			        */
			        if ((fecha == 0) || (fecha == '')) {
			            $("#glypcn"+campo).remove();
				        $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
				        $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
				        return false;            
			        }else{
				        $("#glypcn"+campo).remove();
			            $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
			            $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
			            document.frmClienteNuevo.submit.disabled=false;
			            return true;
			        } 
			    }
			},

			//Preparamos el calendario
			calendar: function(){
				$('#fecha_nacimiento').datepicker({  
					changeMonth: true,
			    	changeYear: true,
                    yearRange: '-100:+0', //+0 no permite poner una fecha mayor a la actual y -100 coge el año actual y le resta 100 años.
			    	dateFormat: 'yy/mm/dd'
				});
			},

			//Función para el botón Cancelar
			cancel: function(){
				acciones.clearValidation();
				$("#formulario").hide();
				$("#tabla").show();
				$("#paginacion").show();
				return false;
			},

			//Muestra el alert de success
			showSuccess: function(){
				var show = $("#exito");
				show.show();
				setTimeout(function() { 
					show.hide(); 
				}, 2000);
			},

			//Muestra el alert de info
			showInfo: function(){
				var info = $("#info");
				info.show();
				setTimeout(function() { 
					info.hide(); 
				}, 2000);
			},

			//Muestra el alert de error
			showError: function(){
				var error = $("#error");
				error.show();
				setTimeout(function() { 
					error.hide(); 
				}, 2000);
			},

			//Muestra la foto de cada cliente al hacer hover
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
			},

			//Paginamos los clientes recibidos y creamos la tabla y la paginación
			paginate: function(page){
				var table = $("#tabla");
				var table_html = "";
				var pagination = $("#pagination");
				pagination.html("");
				var pagination_html = "";

				var rowsPerPage = 3;
				var pageNum = page;
				var totalPages = Math.ceil(clientes.length/rowsPerPage);
				var start = rowsPerPage * (page - 1);
				var end = start + rowsPerPage;
				var clientesPaginados = clientes.slice(start,end);

				for(var c = 1; c <= totalPages; c++){
					if(c == pageNum){
						pagination_html += "<li class='active'><a href='#' onclick='CRUD.init.paginate(" +c +")'>" +c +"</a></li>";
					}else{
						pagination_html += "<li><a href='#' onclick='CRUD.init.paginate(" +c +")'>" +c +"</a></li>";
					}						
				}

				for(var x in clientesPaginados){
					table_html += ("<tr rel='popover' data-img='profiles/1.jpg' id='cliente" +clientesPaginados[x].id +"'>")+
										("<td>" +clientesPaginados[x].nombres +"</td>")+
										("<td>" +clientesPaginados[x].ciudad +"</td>")+
										("<td>" +clientesPaginados[x].sexo +"</td>")+
										("<td>" +clientesPaginados[x].telefono +"</td>")+
										("<td>" +clientesPaginados[x].fechaNacimiento +"</td>")+
										("<td id='acciones'>")+
											("<a onClick='CRUD.init.updateForm(" +clientesPaginados[x].id +"); return false'>")+
												("<button type='button' class='btn btn-info btn-xs' alt='Editar' title='Editar'>")+
													("Editar ")+
													("<span class='glyphicon glyphicon-edit' aria-hidden='true'></span>")+
												("</button>")+
											("</a>")+
										("</td>")+
										("<td id='acciones'>")+
											("<a onClick='CRUD.init.delete(" +clientesPaginados[x].id +"); return false'>")+
												("<button type='button' class='btn btn-danger btn-xs' alt='Eliminar' title='Eliminar'>")+
													("Eliminar ")+
													("<span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span>")+
												("</button>")+
											("</a>")+
										("</td>")+
									("</tr>");
				}
				table.html(
					("<a onclick='CRUD.init.createForm()'>")+
						("<button type='button' id='add_btn' class='btn btn-success btn-xs' alt='Añadir' title='Añadir'>")+
							("Añadir ")+
							("<span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span>")+
						("</button>")+
					("</a>")+
					("<table class='table table-bordered table-hover'>")+
						("<tr>")+
							("<th>NOMBRES</th>")+
							("<th>CIUDAD</th>")+
							("<th>SEXO</th>")+
							("<th>TELEFONO</th>")+
							("<th>FECHA NACIMIENTO</th>")+
							("<th colspan='2' id='acciones'>ACCIONES</th>")+
						("</tr>")+
							table_html+
					"</table>");

				pagination.html(pagination_html);
				acciones.hoverImage();
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