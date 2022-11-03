import { Router } from '@angular/router';
import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor (
    private toast : ToastrService, 
    private service : AuthService,
    private router : Router
    ) 
  {}

  ngOnInit(): void {
  }

  //Método logar usar a dependecia ngx-toastr configurar antes de implementar
  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      //Se a resposta chegar faça isso <-
      //this.toast.info(resposta.headers.get('Authorization'))
        this.service.succesfulLogin(resposta.headers.get('Authorization').substring(7));
        //Quando termina de atenticar vai navegar para o componente nav 
        this.router.navigate([''])
    }, () => {
      this.toast.error('Usuario e/ou senha invalidos');
    }) 
  }


  //Método para validar campos usando os dados email do new FromControll
  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
