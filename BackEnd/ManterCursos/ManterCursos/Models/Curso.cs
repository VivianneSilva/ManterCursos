using System;
using System.ComponentModel.DataAnnotations;

namespace ManterCursos.Models
{
    public class Curso
    {
        public int CursoId { get; set; }
        [Required(ErrorMessage = "Campo Obrigatorio !")]
        public string Descricao { get; set; }
        [Required(ErrorMessage = "Campo Obrigatorio !")]
        public DateTime DataInicio { get; set; }
        [Required(ErrorMessage = "Campo Obrigatorio !")]
        public DateTime DataTermino { get; set; }
        [Required(ErrorMessage = "Campo Obrigatorio !")]
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
        public int qtdAlunos { get; set; }
        public bool Status { get; set; } = true;
        
    }
}
