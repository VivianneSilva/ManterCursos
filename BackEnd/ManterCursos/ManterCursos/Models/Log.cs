using System;

namespace ManterCursos.Models
{
    public class Log
    {
        public int LogId { get; set; }
        public DateTime DataInclusao { get; set; }
        public DateTime DataUltimaAlteracao { get; set; }
        public Curso Curso { get; set; }
        public int CursoId { get; set; }
    }
}
