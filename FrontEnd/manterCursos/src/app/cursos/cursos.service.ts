import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from './Curso';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url = 'https://localhost:44328/api/Cursos';

  constructor(private http: HttpClient) { }

  //primeiro metodo
  PegarTodos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.url);
  }

  //segundo metodo
  PegarPeloId(cursoId: number): Observable<Curso>{
    const apiUrl  = `${this.url}/${cursoId}`;
    return this.http.get<Curso>(apiUrl);
  }

  //terceiro Metodo
  SalvarCurso(curso: Curso): Observable<any>{
    return this.http.post<Curso>(this.url, curso, httpOptions);
  }

  //quarto metodo
  AtualizarCurso(curso: Curso): Observable<any> {
    return this.http.put<Curso>(this.url, curso, httpOptions);
  }

  //excluir
  ExcluirCurso(cursoId: number):Observable<any>{
    const apiUrl = `${this.url}/${cursoId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
