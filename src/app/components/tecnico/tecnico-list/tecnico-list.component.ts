import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild  } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {
  ELEMENT_DATA: Tecnico[] = [
    {
      id : 1,
      nome: 'Valdir',
      cpf: '123.123.123-10',
      email : 'valdir@gmail.com',
      senha : '12345',
      perfis : ['0'],
      dataCriacao: '15/08/2022'
    }

  ]

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  
  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
}
