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
							acciones.read(1);
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

			read: function(pn){
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
							//table_html += "<tr rel='popover' data-img='profiles/1.jpg' id='cliente" +data[i].id +"'><td>" +data[i].nombres +"</td><td>" +data[i].ciudad +"</td><td>" +data[i].sexo +"</td><td>" +data[i].telefono +"</td><td>" +data[i].fechaNacimiento +"</td><td id='acciones'><a onClick='CRUD.init.updateForm(" +data[i].id +"); return false'><button type='button' class='btn btn-info btn-xs' alt='Editar' title='Editar'>Editar <span class='glyphicon glyphicon-edit' aria-hidden='true'></span></button></a></td><td id='acciones'><a onClick='CRUD.init.delete(" +data[i].id +"); return false'><button type='button' class='btn btn-danger btn-xs' alt='Eliminar' title='Eliminar'>Eliminar <span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></button></a></td></tr>";
						}

						//Paginar
						
						var numero_registros_por_pagina = 3;
						var numero_paginas = Math.ceil(clientes.length/numero_registros_por_pagina);
						var pagina_actual = pn;
	

						$("#pagination").html("");
						var pagination_html = "";
						for(var c=1; c<=numero_paginas; c++){
							if(c == pagina_actual){
								pagination_html += "<li class='active'><a href='#' onclick='CRUD.init.read(" +c +")'>" +c +"</a></li>";
							}else{
								pagination_html += "<li><a href='#' onclick='CRUD.init.read(" +c +")'>" +c +"</a></li>";
							}						
						}

						var clientesPaginados = acciones.paginate(numero_registros_por_pagina, pn);

						for(var x in clientesPaginados){
							table_html += "<tr rel='popover' data-img='profiles/1.jpg' id='cliente" +clientesPaginados[x].id +"'><td>" +clientesPaginados[x].nombres +"</td><td>" +clientesPaginados[x].ciudad +"</td><td>" +clientesPaginados[x].sexo +"</td><td>" +clientesPaginados[x].telefono +"</td><td>" +clientesPaginados[x].fechaNacimiento +"</td><td id='acciones'><a onClick='CRUD.init.updateForm(" +clientesPaginados[x].id +"); return false'><button type='button' class='btn btn-info btn-xs' alt='Editar' title='Editar'>Editar <span class='glyphicon glyphicon-edit' aria-hidden='true'></span></button></a></td><td id='acciones'><a onClick='CRUD.init.delete(" +clientesPaginados[x].id +"); return false'><button type='button' class='btn btn-danger btn-xs' alt='Eliminar' title='Eliminar'>Eliminar <span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></button></a></td></tr>";
						}
						
			            table.html("<a onclick='CRUD.init.createForm()'><button type='button' id='add_btn' class='btn btn-success btn-xs' alt='Añadir' title='Añadir'>Añadir <span class='glyphicon glyphicon-plus-sign' aria-hidden='true'></span></button></a></span><table class='table table-bordered table-hover'><tr><th>NOMBRES</th><th>CIUDAD</th><th>SEXO</th><th>TELEFONO</th><th>FECHA NACIMIENTO</th><th colspan='2' id='acciones'>ACCIONES</th></tr>" +table_html +"</table>");
						$("#pagination").html(pagination_html);
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
							acciones.read(1);
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
				$("#button").attr('onclick','CRUD.init.verifyOnSend()');
				$('#nombres').attr("onchange","CRUD.init.validationInput('nombres')");
				$('#ciudad').attr("onchange","CRUD.init.validationInput('ciudad')");
				$('#sexo').attr("onchange","CRUD.init.validationInput('sexo')");
				$('#telefono').attr("onchange","CRUD.init.validationInput('telefono')");
				$('#fecha_nacimiento').attr("onchange","CRUD.init.validationInput('fecha_nacimiento')");
		    	$("#formulario").show();
			},

			updateForm: function(id){
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
				$('#nombres').val(nombre);
				//$('#apellidos').val(apellidos);
				$('#ciudad').val(ciudad);
				$("input[value='" +sexo +"']").prop("checked",true);
				$("#telefono").val(telefono);
				$("#fecha_nacimiento").val(fecha_nacimiento);

				$("#paginacion").hide();
				$("#tabla").hide();
				$("#button").val("Actualizar");
				$("#button").attr('onclick','CRUD.init.verifyOnSend()');
				document.frmClienteNuevo.submit.disabled = false;
				acciones.calendar();

				$('#nombres').attr("onchange","CRUD.init.validationInput('nombres')");
				$('#ciudad').attr("onchange","CRUD.init.validationInput('ciudad')");
				$('#sexo').attr("onchange","CRUD.init.validationInput('sexo')");
				$('#telefono').attr("onchange","CRUD.init.validationInput('telefono')");
				$('#fecha_nacimiento').attr("onchange","CRUD.init.validationInput('fecha_nacimiento')");
				$("#formulario").show();
			},

			clearValidation: function(){
				$("#glypcnnombres").remove();
			    $("#glypcnciudad").remove();
			    $("#glypcnalternativas").remove();
			    $("#glypcntelefono").remove();
			    $("#glypcnfecha_nacimiento").remove();
			    $('#nombres').parent().parent().attr("class", "form-group has-feedback");
			    $('#ciudad').parent().parent().attr("class", "form-group has-feedback");
			    $('#masculino').parent().parent().parent().attr("class", "form-group has-feedback");
			    $('#telefono').parent().parent().attr("class", "form-group has-feedback");
			    $('#fecha_nacimiento').parent().parent().attr("class", "form-group has-feedback"); 
			    $("#formulario").hide();
			    $("#tabla").show();
			    $("#paginacion").show();
			    $("span.help-block").hide();
			    document.frmClienteNuevo.submit.disabled = false;
			    return false;
			},

			verifyOnSend: function(){
				var v1 = 0, v2 = 0, v3 = 0, v4 = 0, v5 = 0;
			    v1 = acciones.validationInput('nombres');
			    v2 = acciones.validationInput('ciudad');
			    v3 = acciones.validationInput('alternativas');
			    v4 = acciones.validationInput('telefono');
			    v5 = acciones.validationInput('fecha_nacimiento');

                if (v1===false || v2===false || v3===false || v4===false || v5===false) {    
                    document.frmClienteNuevo.submit.disabled = true;
                }else{               
                   document.frmClienteNuevo.submit.disabled = false;
                   acciones.clearValidation();          
             	}
			},

			validationInput: function(campo){
				var a=0;           
	            if (campo==='nombres'){
	                nombre = document.getElementById(campo).value;
	                if( nombre == null || nombre.length == 0 || !/^[a-z][a-z]/.test(nombre) ) {             
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
	                    $('#'+campo).parent().children('span').text("Error").show();
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
	                    return false;

	                }else{
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
	                    $('#'+campo).parent().children('span').hide();
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
	                    document.frmClienteNuevo.submit.disabled=false;
	                    return true;
	                } 
	            }

	            if (campo==='ciudad'){
	                city = document.getElementById(campo).value;
	                if( city == null || city.length == 0 || !/^[a-z][a-z]/.test(city) ) {

	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
	                    $('#'+campo).parent().children('span').text("Error").show();
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
	                    return false;

	                }
	                else{
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
	                    $('#'+campo).parent().children('span').hide();
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
	                    document.frmClienteNuevo.submit.disabled=false;
	                    return true;

	                } 
	            }

	            if (campo==='telefono'){
	                telef = document.getElementById(campo).value;
	                if(isNaN(telef) || telef == null || telef.length == 0){
	                // if( !(/^\d{9}$/.test(telef)) ) { //valida que tenga nueve digitos y sin espacios
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
	                    $('#'+campo).parent().children('span').text("Error").show();
	                    $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
	                    return false;
	                }else{
	                    $("#glypcn"+campo).remove();
	                    $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
	                    $('#'+campo).parent().children('span').hide();
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
			        var RegExPattern1 = /^\d{4}\/\d{2}\/\d{2}$/; // patron yyyy/mm/dd
			        var RegExPattern2 = /^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}$/;
			        if ((fecha.match(RegExPattern1)) && (fecha!='') && (fecha.match(RegExPattern2))) {
			            $("#glypcn"+campo).remove();
				        $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
				        $('#'+campo).parent().children('span').text("Error").show();
				        $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
				        return false;            
			        }else{
				        $("#glypcn"+campo).remove();
			            $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
			            $('#'+campo).parent().children('span').hide();
			            $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
			            document.frmClienteNuevo.submit.disabled=false;
			            return true;
			        } 
			    }
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
				acciones.clearValidation();
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
			},

			paginate: function(size,page){
				var rowsPerPage = size;
				var pageNum = page;
				var start = rowsPerPage * (page - 1);
				var end = start + rowsPerPage;
				return clientes.slice(start,end);
			}
		};
	}());

	return{
		init: acciones
	};
}());

$(document).ready(function(){
	CRUD.init.read(1);
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