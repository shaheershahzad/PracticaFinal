
            $("span.help-block").hide();

            function verificar(){
                var v1=0,v2=0,v3=0,v4=0,v5=0;
                v1=validacion('nombres');
                v2=validacion('ciudad');
                v3=validacion('alternativas');
                v4=validacion('telefono');
                v5=validacion('fecha_nacimiento');
                //var formulario = document.frmClienteNuevo;

                if (v1===false || v2===false || v3===false || v4===false || v5===false) {    
                document.frmClienteNuevo.submit.disabled=true;
                }else{               
             document.frmClienteNuevo.submit.disabled=false;
             $("#glypcnnombres").remove();
              $("#glypcnciudad").remove();
               $("#glypcnalternativas").remove();
                $("#glypcntelefono").remove();
                 $("#glypcnfecha_nacimiento").remove();
                 //   formulario.submit();
                }


            } 


     
            function validacion(campo){
                var a=0;           
                if (campo==='nombres'){
                    nombre = document.getElementById(campo).value;
                    if( nombre == null || nombre.length == 0 || !/^[a-z][a-z]/.test(nombre) ) {             
                        $("#glypcn"+campo).remove();
                        $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
                        $('#'+campo).parent().children('span').text("error").show();
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

                if (campo==='ciudad'){
                    city = document.getElementById(campo).value;
                    if( city == null || city.length == 0 || !/^[a-z][a-z]/.test(city) ) {
                        
                        $("#glypcn"+campo).remove();
                        $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
                        $('#'+campo).parent().children('span').text("error").show();
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
                            $('#'+campo).parent().children('span').text("error").show();
                            $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
                            return false;
                        } else{
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
                    }
                    else{
                        $('#masculino').parent().parent().parent().attr("class", "form-group has-success");
                        document.frmClienteNuevo.submit.disabled=false;
                        return true;

                    }
                }



                if (campo==='fecha_nacimiento'){
                    fecha = document.getElementById(campo).value;
                    //var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/; patron dd/mm/yyyy
                     var RegExPattern = /^\d{4}\/\d{2}\/\d{2}$/; // patron yyyy/mm/dd
                      if ((fecha.match(RegExPattern)) && (fecha!='')) {
                         $("#glypcn"+campo).remove();
                        $('#'+campo).parent().parent().attr("class", "form-group has-success has-feedback");
                        $('#'+campo).parent().children('span').hide();
                        $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-ok form-control-feedback'></span>");
                         document.frmClienteNuevo.submit.disabled=false;
                        return true;               
                    }
                    else{
                        $("#glypcn"+campo).remove();
                        $('#'+campo).parent().parent().attr("class", "form-group has-error has-feedback");
                        $('#'+campo).parent().children('span').text("error").show();
                        $('#'+campo).parent().append("<span id='glypcn"+campo+"' class='glyphicon glyphicon-remove form-control-feedback'></span>");
                        return false;
                         
                    } 
                }

               
            }
