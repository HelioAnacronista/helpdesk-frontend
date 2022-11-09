import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnicos-update',
  templateUrl: './tecnicos-update.component.html',
  styleUrls: ['./tecnicos-update.component.css']
})
export class TecnicosUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  //Controler de validação do campos do formularios
  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router : Router,
    private routeHttpActivate : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.routeHttpActivate.snapshot.paramMap.get('id')
    this.findById();
  }
  //Método para encontrar por id
  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }

  //Método de Atualizar
  update(): void {
    this.service.update(this.tecnico).subscribe( () =>{
      this.toast.success('Técnico atualizado com sucesso', 'Update');
      this.router.navigate(['tecnicos'])
    },
    //Capturar error
    excessCatch => {
      if(excessCatch.error.errors) {
        excessCatch.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(excessCatch.error.message);
      }
    })
  }

  //Add profiles (roles)
  addPerfil(perfil: any): void {
    //Logica para não repetir os profiles
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }
  
  //Método para Validar no html de input
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
  }
}