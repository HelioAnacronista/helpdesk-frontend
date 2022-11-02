import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Model Credenciais para validar dados do nosso componente login
  // Usando o  [(ngModel)] no html. fuciona mãodupla
  creds: Credenciais = {
    email: '',
    senha: ''
  }

  //Varaviel de controler de formulario feino no html com
  //[fromControl="email"] 
  //Usando required mostra o campo fica obrigatorio
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor () {}

  ngOnInit(): void {
  }

  //Método para validar campos usando os dados email do new FromControll
  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
