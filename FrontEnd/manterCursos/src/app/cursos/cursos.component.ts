import { CursosService } from './cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from './Curso';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  formulario: any = [];
  tituloFormulario: string;
  cursos: any;
  cursosFiltrados: Curso[];
  private _search: string = '';

  idDeletar: number = null;

  public get search() {
    return this._search;
  }

  public set search(value: string) {
    this._search = value;
    this.cursosFiltrados = this.search? this.filtrarCursos(this.search): this.cursos.$values;
  }
  filtrarCursos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.cursos.$values.filter(
      (curso: { descricao: string }) =>
        curso.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }
  alterarIdDeletar(id: any) {
    this.idDeletar = id;
    console.log(this.idDeletar);
  }

  constructor(
    private CursosService: CursosService,
    private toastr: ToastrService
  ) { }

  public get propriedade(){
    return this.formulario.controls;
  }

  ngOnInit(): void {
    this.getCursos();
    this.formulario = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
  }
  public getCursos(): void {
    this.CursosService.PegarTodos().subscribe(
      resultado => {
        this.cursos = resultado,
        this.cursosFiltrados = this.cursos.$values
      }
    );
  }
  ExibirModalCadastro(): void {
    this.tituloFormulario = 'Novo Curso';
    this.formulario = new FormGroup({
      //forms controle são os inputs
      nome: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
    });
  }
  ExibirModalAtualizacao(cursoId): void {
    this.CursosService.PegarPeloId(cursoId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar: `;

      this.formulario = new FormGroup({
        //forms controle (imputs) recebendo o valor da materia
        cursoId: new FormControl(resultado.cursoId),
        descricao: new FormControl(resultado.descricao, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]),
      });
    });
  }
  EnviarFormulario(): void {
    //criar as variaveis para ter os dados do form
    const curso: Curso = this.formulario.value;
    if (curso.cursoId > 0) {
      this.CursosService.AtualizarCurso(curso).subscribe(resultado => {
        this.toastr.warning('Curso Atualizado com Sucesso!');
        this.CursosService.PegarTodos().subscribe((registros:any) => {
          this.cursosFiltrados = registros.$values;
        });
      });
    } else {
      this.CursosService.SalvarCurso(curso).subscribe((resultado) => {
        this.toastr.success('Curso Inserido com Sucesso!');
        this.CursosService.PegarTodos().subscribe((registros:any) => {
          this.cursosFiltrados = registros.$values;
        });
      });
    }
  }
  ExcluirCurso(deletar:number) {
    this.CursosService.ExcluirCurso(deletar).subscribe((resultado) => {
      this.toastr.error('Registro deletado');
      this.CursosService.PegarTodos().subscribe((registros:any) => {
        this.cursosFiltrados = registros.$values;
      });
    });
  }

}
