import React, { Component } from "react";
import UserService from "../services/UserService";
import Swal from "sweetalert2";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  Ingresar() {
     let emailLogin =document.querySelector("#txtemail");
     let passwordLogin = document.querySelector("#txtpassword");

      if(emailLogin === '' || passwordLogin === ''){
        Swal.fire({
            icon: 'error',
            title: 'Campo Email y Password Obligatorio',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          return;
      }


    UserService.Validar(emailLogin, passwordLogin).then((res) => {
       let emailApi = res.data.email;
       let passwordApi = res.data.password;
       if(emailLogin !== emailApi && passwordLogin !== passwordApi){
        Swal.fire({
            icon: 'error',
            title: 'Email y Password Incorrecto',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
       }else{
           UserService.Login(emailLogin, passwordLogin)
           this.props.history.push("/home");
       }



    }) ;
  }

  render() {
    return (
      <div className="container mt-4 col-lg-4">
        <div className="card col-sm-10" style={{ marginTop: "100px" }}>
          <div className="card-body">
            <form className="form-sign">
              <div className="form-group text-center">
                <h3>Login</h3>
                <img src="../../img/login.png" alt="70" width="170" />
                <br />
                <label>Bienvenidos al Sistema</label>
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" id="txtemail" className="form-control" />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="dni" id="txtpassword" className="form-control" />
              </div>

              <button
                className="btn btn-primary mb-2 mt-2"
                onClick={() => this.Ingresar(this.state.user.email, this.state.user.password)}
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
