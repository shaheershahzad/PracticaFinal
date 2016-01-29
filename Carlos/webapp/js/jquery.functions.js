	function ActualizarDatos(){
		var cliente_id = $('#cliente_id').val();
		var nombres = $('#nombres').val();
		var ciudad = $('#ciudad').val();
		var alternativas = $("input[name^='alternativas']:checked").val();
		var telefono = $("#telefono").val();
		var fecha_nacimiento = $("#fecha_nacimiento").val();

		$.ajax({
			url: 'http://practicadawcarlos.esy.es/webapp/actualizar.php',
			type: "POST",
			data: "submit=&nombres="+nombres+"&ciudad="+ciudad+"&alternativas="+alternativas+"&telefono="+telefono+"&fecha_nacimiento="+fecha_nacimiento+"&cliente_id="+cliente_id,
			success: function(datos){
				alert(datos);
				ConsultaDatos();
				$("#formulario").hide();
				$("#tabla").show();
			}
		});
		return false;
	}
	
	function ConsultaDatos(){
		$.ajax({
			url: 'http://practicadawcarlos.esy.es/webapp/consulta.php',
			cache: false,
			type: "GET",
			success: function(datos){
				$("#tabla").html(datos);
			}
		});
	}
	
	function EliminarDato(cliente_id){
		var msg = confirm("Desea eliminar este dato?")
		if ( msg ) {
			$.ajax({
				url: 'http://practicadawcarlos.esy.es/webapp/eliminar.php',
				type: "GET",
				data: "id="+cliente_id,
				success: function(datos){
					alert(datos);
					$("#fila-"+cliente_id).remove();
				}
			});
		}
		return false;
	}
	
	function GrabarDatos(){
		var nombres = $('#nombres').val();
		var ciudad = $('#ciudad').val(); 
		var alternativas = $("input[name^='alternativas']:checked").val();
		var telefono = $("#telefono").val();
		var fecha_nacimiento = $("#fecha_nacimiento").val();

		$.ajax({
			url: 'http://practicadawcarlos.esy.es/webapp/nuevo.php',
			type: "POST",
			data: "submit=&nombres="+nombres+"&ciudad="+ciudad+"&alternativas="+alternativas+"&telefono="+telefono+"&fecha_nacimiento="+fecha_nacimiento,
			success: function(datos){
				ConsultaDatos();
				alert(datos);
				$("#formulario").hide();
				$("#tabla").show();
			}
		});
		return false;
	}

	function Cancelar(){
		$("#formulario").hide();
		$("#tabla").show();
		return false;
	}
	