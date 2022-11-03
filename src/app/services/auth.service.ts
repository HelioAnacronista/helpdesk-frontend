import { Credenciais } from './../models/credenciais';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Servico para verificar o token
  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, 
    //Pega o token de resposta
    creds, { observe:'response', responseType:'text'})
  }

  //Método que diz ser o token fufou para ser authenticate
  succesfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
  }

  //Método verifica ser o está authenticate
  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token)
    }
    return false
  }
  //Limpar o token e info do usuario
  logout() {
    localStorage.clear();
  }
}
