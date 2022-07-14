
import { CursosService } from './cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from './Curso';
import { ToastrService } from 'ngx-toastr';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';


@Component({
  selector: 'app-cursos',
  templateUrl: 'cursos.component.html',
  styleUrls: ['cursos.component.css']
})
export class CursosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string;
  cursos: Curso[];
  cursosFiltrados: Curso[];
  categorias!: Categoria[];
  private _search: string = ''; //campo de busca
  idDeletar: number = null;


  formatarData(d: any): Date{
    return d.split("T")[0];
  }
  public get search() {
    return this._search;
  }

  public set search(value: string) {
    this._search = value;
    this.cursosFiltrados = this.search ? this.filtrarCursos(this.search) : this.cursos;
  }

  filtrarCursos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.cursos.filter(
      (curso: { descricao: string, categoria: Categoria }) =>
        curso.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        curso.categoria.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }
  alterarIdDeletar(id: any) {
    this.idDeletar = id;
    console.log(this.idDeletar);
  }
  constructor(
    private cursosService: CursosService,
    private toastr: ToastrService,
    private categoriaService: CategoriaService

  ) {}
  public get propriedade() {
    return this.formulario.controls;
  }
  ngOnInit(): void {
    this.getCursos();
    this.cursosService.PegarTodos().subscribe((resultado) =>{
      this.cursos = resultado;
    });
    this.categoriaService.PegarTodos().subscribe((resultado) =>{
      this.categorias = resultado;
    })
    this.formulario = new FormGroup({
      cursoId: new FormControl(0),
      descricao: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      dataInicio: new FormControl(null,[Validators.required]),
      dataTermino: new FormControl(null, [Validators.required]),
      categoriaId: new FormControl(0),
      qtdAlunos: new FormControl(0, [Validators.required]),
      status: new FormControl(true)

    });
  }
  public getCursos(): void {
    this.cursosService.PegarTodos().subscribe((resultado: any) => {
      this.cursos = resultado,
      this.cursosFiltrados = this.cursos;
    });
  }
  ExibirModalCadastro(): void {
    this.tituloFormulario = 'Novo Curso';
    this.formulario = new FormGroup({
      //forms controle são os inputs
      descricao: new FormControl(null, [Validators.required ]),
      dataInicio: new FormControl(null, [Validators.required]),
      dataTermino: new FormControl(null, [Validators.required]),
      categoriaId: new FormControl(0),
      qtdAlunos: new FormControl(0, [Validators.required]),
      status: new FormControl(true)

    });
  }
  ExibirModalAtualizacao(cursoId): void {
    this.cursosService.PegarPeloId(cursoId).subscribe((resultado: any) => {
      this.tituloFormulario = `Atualizar: `;
      this.formulario = new FormGroup({
        //forms controle (imputs) recebendo o valor da materia
        cursoId: new FormControl(resultado.cursoId),
        descricao: new FormControl(resultado.descricao, [Validators.required]),
        dataInicio: new FormControl(this.formatarData(resultado.dataInicio.split("T")[0]), [Validators.required]),
        dataTermino: new FormControl(this.formatarData(resultado.dataTermino.split("T")[0] ), [Validators.required]),
        categoriaId: new FormControl(resultado.categoriaId),
        qtdAlunos: new FormControl(resultado.qtdAlunos),
        status: new FormControl(true)
      });
    });
  }
  EnviarFormulario(): void {
    //criar as variaveis para ter os dados do form
    const curso: Curso = this.formulario.value;
    console.log(curso)
    if (curso.cursoId > 0) {
      this.cursosService.AtualizarCurso(curso).subscribe({next:(resultado) => {
        this.toastr.warning('Curso Atualizado com Sucesso!');
        this.cursosService.PegarTodos().subscribe((registros) => {
          this.cursosFiltrados = registros;
        });
      }, error: error => {
        console.log(error)
        this.toastr.error(error.error.mensagem)
      }});
    } else {
      this.cursosService.SalvarCurso(curso).subscribe((resultado) => {
        this.toastr.success('Curso Inserido com Sucesso!');
        this.cursosService.PegarTodos().subscribe((registros) => {
          this.cursosFiltrados = registros;
        });
      },error => {
        console.log(error)
        this.toastr.error(error.error.mensagem)
    });
    }
  }
  ExcluirCurso(deletar: number) {
    this.cursosService.ExcluirCurso(deletar).subscribe({next:(resultado) => {
      this.toastr.error('Registro deletado');
      this.cursosService.PegarTodos().subscribe((registros) => {
        this.cursosFiltrados = registros;
      });
    },error: error => {
      console.log(error)
      this.toastr.error(error.error)
    }});
  }
}


