'use strict';
let Table = React.createClass({
  getInitialState:function(){
    return {}
  },
  render: function() {
    return(
      <div className="row">
      <img src="img/logo.png" />
      <div className="col-md-12">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Alumno</th>
            <th>Nombre</th>
            <th>Fecha Nacimiento</th>
            <th>Activo</th>
            <th>Sexo</th>
            <th>Fecha Alta</th>
          </tr>
        </thead>
        <TableBody />
      </table>
      </div>
      </div>
    )
  }
});
let TableBody = React.createClass({
    getInitialState:function(){  
       return {
        alumnos : []
       }
    },
    componentDidMount: function(){
      var self = this;
     self.serverRequest = fetch('js/datos.json')
      .then((res) => res.json())
      .then((data) => {
          self.setState({
            alumnos: data.alumnos
          });         
      });

    },
    eventoClickTr: function(oEvent, oAlumno){
       alert(JSON.stringify(oAlumno));
    },
    render: function() {
      var self = this;
      return (
        <tbody>
          {self.state.alumnos.map(function(alumno) {
            let oLblActivo;
            if (alumno.activo == 1){
              oLblActivo = 'Activo';
            } else {
              oLblActivo = 'Inactivo';
            }
            return (
              <tr onClick={(e) => self.eventoClickTr(e, alumno)} >
                <td>{alumno.idAlumno}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.fecha_nacimiento}</td>
                <td>{oLblActivo}</td>
                <td>{alumno.sexo}</td>
                <td>{alumno.fecha_alta}</td>
              </tr>
            );
          })}
        </tbody>
      )
    }
});
ReactDOM.render(
    <Table />,
    document.querySelector("#root")
);