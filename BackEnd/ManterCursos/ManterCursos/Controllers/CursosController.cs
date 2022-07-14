using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManterCursos.Data;
using ManterCursos.Models;

namespace ManterCursos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly ManterCursosContext _context;

        public CursosController(ManterCursosContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> GetCurso()
        {
            return await _context.Curso.Where(x => x.Status == true).Include(x => x.Categoria).ToListAsync();
        }

        // GET: api/Cursos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Curso>> GetCurso(int id)
        {
            var curso = await _context.Curso.FindAsync(id);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        // PUT: api/Cursos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutCurso(Curso curso)
        {
            var outrosCursos = (_context.Curso.Where(x => x.CursoId != curso.CursoId && x.Status == true));
            if (outrosCursos.Any(c => 
             (curso.DataInicio.Date >= c.DataInicio.Date && curso.DataInicio.Date <= c.DataTermino.Date) ||
             (curso.DataTermino.Date >= c.DataInicio.Date && curso.DataTermino.Date <= c.DataTermino.Date)))
            {
                return BadRequest(new { mensagem = "Existe(m) curso(s) planejado(s) dentro do periodo informado." });
            }

            Log log = await _context.Log.SingleOrDefaultAsync(x => x.CursoId == curso.CursoId);
            if (log != null)
            {
                log.DataUltimaAlteracao = DateTime.Now;
                _context.Log.Update(log);
            }


            _context.Curso.Update(curso);
            await _context.SaveChangesAsync();
            return Ok();

        }

        // POST: api/Cursos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            if (ModelState.IsValid)
            {
                if(DateTime.Now.Date > curso.DataInicio.Date)
                {
                    return BadRequest(error: "A Data de Inicio não pode ser menor que a Data Atual.");
                }
                if(curso.DataTermino.Date < curso.DataInicio.Date)
                {
                    return BadRequest(error: "A Data Final não pode ser menor que a Data de Inicio.");
                }
                if (_context.Curso.Where(x => x.CursoId != curso.CursoId && x.Status == true).Any(c => (c.DataInicio.Date < curso.DataTermino.Date && c.DataTermino.Date >= curso.DataTermino.Date) || (c.DataInicio.Date < curso.DataInicio.Date && c.DataTermino.Date > curso.DataInicio.Date))) 
                {
                    return BadRequest(new { mensagem = "Existe(m) curso(s) planejado(s) dentro do periodo informado." });
                }


                _context.Curso.Add(curso);
                await _context.SaveChangesAsync();
                CreatedAtAction("GetCurso", new { id = curso.CursoId }, curso);

                Log log = new Log();
                log.DataInclusao = DateTime.Now;
                log.CursoId = curso.CursoId;

                _context.Log.Add(log);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetCurso", new { id = curso.CursoId }, curso);
            }

            return BadRequest(error: "Os campos não foram preenchidos corretamente !");
           
        }
        
        // DELETE: api/Cursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Curso.FindAsync(id);
            if (curso == null)
            {
                return NotFound();
            }
            if ((curso.DataTermino.Date >= DateTime.Now.Date && DateTime.Now.Date >= curso.DataInicio.Date) || DateTime.Now.Date > curso.DataTermino.Date)
            {
                return BadRequest(error: "O Curso não pode ser Excluido");
            }

            curso.Status = false;
            _context.Curso.Update(curso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CursoExists(int id)
        {
            return _context.Curso.Any(e => e.CursoId == id);
        }
    }
}
