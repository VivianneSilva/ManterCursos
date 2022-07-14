
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categoria';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'https://localhost:44328/api/Categorias'

  constructor(private http: HttpClient) { }
  PegarTodos(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url);
  }

  //segundo metodo
  PegarPeloId(categoriaId: number): Observable<Categoria>{
    const apiUrl  = `${this.url}/${categoriaId}`;
    return this.http.get<Categoria>(apiUrl);
  }

  //terceiro Metodo
  SalvarCategoria(categoria: Categoria): Observable<any>{
    return this.http.post<Categoria>(this.url, categoria, httpOptions);
  }

  //quarto metodo
  AtualizarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put<Categoria>(this.url, categoria, httpOptions);
  }

  //excluir
  ExcluirAluno(categoriaId: number):Observable<any>{
    const apiUrl = `${this.url}/${categoriaId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
