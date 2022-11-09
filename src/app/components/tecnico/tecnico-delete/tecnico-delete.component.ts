import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

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

  //Método de delete
  delete(): void {
    this.service.delete(this.tecnico.id).subscribe( () =>{
      this.toast.success('Técnico deletado com sucesso', 'delete');
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


}