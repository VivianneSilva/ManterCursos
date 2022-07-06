using System;

namespace ManterCursos.Models
{
    public class Curso
    {
        public int CursoId { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataTermino { get; set; }
        public Categoria Categoria { get; set; }
        public int CategoriaId { get; set; }
        
    }
}
