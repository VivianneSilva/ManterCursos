using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ManterCursos.Models;

namespace ManterCursos.Data
{
    public class ManterCursosContext : DbContext
    {
        public ManterCursosContext (DbContextOptions<ManterCursosContext> options)
            : base(options)
        {
        }

        public DbSet<ManterCursos.Models.Adm> Adm { get; set; }

        public DbSet<ManterCursos.Models.Categoria> Categoria { get; set; }

        public DbSet<ManterCursos.Models.Curso> Curso { get; set; }

        public DbSet<ManterCursos.Models.Log> Log { get; set; }
    }
}
