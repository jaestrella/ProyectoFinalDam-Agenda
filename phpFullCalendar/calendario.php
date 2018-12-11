<?php
require_once('db.php');
 
 
$sql = "SELECT id, title, start, end, color FROM events ";
 
$req = $bdd->prepare($sql);
$req->execute();
 
$events = $req->fetchAll();
 
?>
 
<!DOCTYPE html>
<html lang="es">
 
<head>
 
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
 
    <title>Inicio</title>
 
   
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		
		<link href='assets/fullcalendar.css' rel='stylesheet' />
 
 
    
    <style>
    body {
      padding-top: 70px;
        
    }
    #calendar {
      max-width: 800px;
    }
    .col-centered{
      float: none;
      margin: 0 auto;
    }
    </style>
 
 
 
</head>
 
<body>
 
   
  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h1>FullCalendar PHP MySQL</h1>
        <div id="calendar" class="col-centered">
        </div>
      </div>
    </div>       
  <div class="modal fade" id="ModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form class="form-horizontal" method="POST" action="addEvent.php">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Agregar Evento</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title" class="col-sm-2 control-label">Titulo</label>
              <div class="col-sm-10">
                <input type="text" name="title" class="form-control" id="title" placeholder="Titulo">
              </div>
            </div>
            <div class="form-group">
              <label for="color" class="col-sm-2 control-label">Color</label>
              <div class="col-sm-10">
                <select name="color" class="form-control" id="color">
                  <option value="">Seleccionar</option>
                  <option style="color:#0071c5;" value="#0071c5"> Azul oscuro</option>
                  <option style="color:#40E0D0;" value="#40E0D0"> Turquesa</option>
                  <option style="color:#008000;" value="#008000"> Verde</option>	  
                  <option style="color:#FFD700;" value="#FFD700"> Amarillo</option>
                  <option style="color:#FF8C00;" value="#FF8C00"> Naranja</option>
                  <option style="color:#FF0000;" value="#FF0000"> Rojo</option>
                  <option style="color:#000;" value="#000"> Negro</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="start" class="col-sm-2 control-label">Fecha Inicial</label>
              <div class="col-sm-10">
                <input type="text" name="start" class="form-control" id="start">
              </div>
            </div>
            <div class="form-group">
              <label for="end" class="col-sm-2 control-label">Fecha Final</label>
              <div class="col-sm-10">
                <input type="text" name="end" class="form-control" id="end">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
<!-- Modal -->
  <div class="modal fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form class="form-horizontal" method="POST" action="editEventTitle.php">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Modificar Evento</h4>
          </div>
          <div class="modal-body">
          <div class="form-group">
            <label for="title" class="col-sm-2 control-label">Titulo</label>
            <div class="col-sm-10">
              <input type="text" name="title" class="form-control" id="title" placeholder="Titulo">
            </div>
          </div>
          <div class="form-group">
            <label for="color" class="col-sm-2 control-label">Color</label>
            <div class="col-sm-10">
              <select name="color" class="form-control" id="color">
                <option value="">Seleccionar</option>
                <option style="color:#0071c5;" value="#0071c5"> Azul oscuro</option>
                <option style="color:#40E0D0;" value="#40E0D0"> Turquesa</option>
                <option style="color:#008000;" value="#008000"> Verde</option>	  
                <option style="color:#FFD700;" value="#FFD700"> Amarillo</option>
                <option style="color:#FF8C00;" value="#FF8C00"> Naranja</option>
                <option style="color:#FF0000;" value="#FF0000"> Rojo</option>
                <option style="color:#000;" value="#000"> Negro</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="start" class="col-sm-2 control-label">Fecha Inicial</label>
            <div class="col-sm-10">
              <input type="text" name="start" class="form-control" id="start" placeholder="YYYY-MM-DD 00:00:00">
            </div>
          </div>
          <div class="form-group">
            <label for="end" class="col-sm-2 control-label">Fecha Final</label>
            <div class="col-sm-10">
              <input type="text" name="end" class="form-control" id="end" placeholder="YYYY-MM-DD 00:00:00">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
              <label class="text-danger"><input type="checkbox"  name="delete"> Eliminar Evento</label>
            </div>
          </div>
        </div> 
          <input type="hidden" name="id" class="form-control" id="id">
          <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
        </div>
        
      </form>
      </div>
    </div>
  </div>
 
    </div>
    
 
   
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
 
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <script src='assets/moment.min.js'></script>
    <script src='assets/fullcalendar.min.js'></script>
    <script src='assets/fullcalendar.js'></script>
    <script src='assets/es.js'></script>

<script>
 
$(document).ready(function() {
 
  var date = new Date();
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString().length == 1 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
  var dd  = (date.getDate()).toString().length == 1 ? "0"+(date.getDate()).toString() : (date.getDate()).toString();
  $('#calendar').fullCalendar({
    header: {
      language: 'es',
      left: 'prev,next today',
      center: 'title',
      right: 'month,basicWeek,basicDay',
    },
    defaultDate: yyyy+"-"+mm+"-"+dd,
    editable: true,
    eventLimit: true,
    selectable: true,
    selectHelper: true,
    select: function(start, end) {
      $('#ModalAdd #start').val(moment(start).format('YYYY-MM-DD HH:mm:ss'));
      $('#ModalAdd #end').val(moment(end).format('YYYY-MM-DD HH:mm:ss'));
      $('#ModalAdd').modal('show');
      },
      eventRender: function(event, element) {
        element.bind('dblclick', function() {
          $('#ModalEdit #id').val(event.id);
          $('#ModalEdit #title').val(event.title);
          $('#ModalEdit #color').val(event.color);
          $('#ModalEdit').modal('show');
          });
      },
      eventDrop: function(event, delta, revertFunc) { 
        edit(event);
      },
      eventResize: function(event,dayDelta,minuteDelta,revertFunc) { 
        edit(event);
      },
      events: [
        <?php foreach($events as $event):
        $start = explode(" ", $event['start']);
        $end = explode(" ", $event['end']);
        if($start[1] == '00:00:00'){
          $start = $start[0];
        }else{
        $start = $event['start'];
        }
        if($end[1] == '00:00:00'){
          $end = $end[0];
        }else{
          $end = $event['end'];
        }
        ?>
        {
          id: '<?php echo $event['id']; ?>',
          title: '<?php echo $event['title']; ?>',
          start: '<?php echo $start; ?>',
          end: '<?php echo $end; ?>',
          color: '<?php echo $event['color']; ?>',
        },
        <?php endforeach; ?>
      ]
  });
  function edit(event){
    start = event.start.format('YYYY-MM-DD HH:mm:ss');
    if(event.end){
      end = event.end.format('YYYY-MM-DD HH:mm:ss');
    }else{
      end = start;
    }
    id =  event.id;
    Event = [];
    Event[0] = id;
    Event[1] = start;
    Event[2] = end;
    $.ajax({
      url: 'editEventDate.php',
      type: "POST",
      data: {Event:Event},
      success: function(rep) {
        if(rep == 'OK'){
          alert('Evento se ha guardado correctamente');
        }else{
          alert('No se pudo guardar. Inténtalo de nuevo.');
        }
      }
    });
  }
});
 
</script>
<head>
    <meta charset="UTF-8">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
 <p>
  <a href="login/passwordReset.php" class="btn btn-warning" text-align="center">Reiniciar contraseña</a>
  <a href="login/logout.php" class="btn btn-danger" text-align="center">Desconexión</a>
 </p>
</body>
 
</html>