import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private _visibilidadeNavBar: boolean = true;
  private _visibilidadeOpcoes: boolean = true;

  constructor() { }

  public get visibilidadeNavBar(){
    return this._visibilidadeNavBar;
  }
  public set visibilidadeNavBar(b:boolean){
    this._visibilidadeNavBar = b;
  }
  public get visibilidadeOpcoes(){
    return this._visibilidadeOpcoes;
  }
  public set visibilidadeOpcoes(b:boolean){
    this._visibilidadeOpcoes = b;
  }
}
