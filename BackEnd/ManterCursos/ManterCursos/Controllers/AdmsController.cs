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
    public class AdmsController : ControllerBase
    {
        private readonly ManterCursosContext _context;

        public AdmsController(ManterCursosContext context)
        {
            _context = context;
        }

        // GET: api/Adms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Adm>>> GetAdm()
        {
            return await _context.Adm.ToListAsync();
        }

        // GET: api/Adms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Adm>> GetAdm(int id)
        {
            var adm = await _context.Adm.FindAsync(id);

            if (adm == null)
            {
                return NotFound();
            }

            return adm;
        }

        // PUT: api/Adms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutAdm(Adm adm)
        {
            _context.Adm.Update(adm);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/Adms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Adm>> PostAdm(Adm adm)
        {
            _context.Adm.Add(adm);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdm", new { id = adm.AdmId }, adm);
        }

        // DELETE: api/Adms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdm(int id)
        {
            var adm = await _context.Adm.FindAsync(id);
            if (adm == null)
            {
                return NotFound();
            }

            _context.Adm.Remove(adm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdmExists(int id)
        {
            return _context.Adm.Any(e => e.AdmId == id);
        }
    }
}
