import { Categoria } from "../categoria";

export class Curso {
  cursoId: number;
  descricao: string;
  dataInicio: Date;
  dataTermino: Date;
  categoriaId: number;
  categoria: Categoria;
  qtdAlunos: string;
  status: boolean;

}
