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
            return await _context.Curso.Include(c => c.Categoria).Where(c => c.Status == true).ToListAsync();
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso(int id, Curso curso)
        {
            if (id != curso.CursoId)
            {
                return BadRequest();
            }

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cursos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Curso>> PostCurso(Curso curso)
        {
            if (ModelState.IsValid)
            {
                if(DateTime.Now > curso.DataInicio)
                {
                    return BadRequest(error: "Data Inicio não pode ser menor que a Data Atual");
                }
                if(curso.DataTermino < curso.DataInicio)
                {
                    return BadRequest(error: "Data Final não pode ser menor que a Data de Inicio");
                }
                if ()
                {

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
            return BadRequest(error:"Os campos não foram preenchidos corretamente !");
            

            
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
            if ((curso.DataTermino > DateTime.Now && DateTime.Now > curso.DataInicio) || DateTime.Now > curso.DataTermino)
            {
                return BadRequest(error:"Erro123");
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
