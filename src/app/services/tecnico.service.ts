import { Tecnico } from './../models/tecnico';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(
    private http: HttpClient
  ) { }

  //Puxa por id
  findById(id: any): Observable<Tecnico>{
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }

  //Faz a requisição e traz um arry de tecnico
  findAll(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  //envia umas requisição para criar uma tecnico na base de dados
  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  //Atualiza o tecnico do id
  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }
}
