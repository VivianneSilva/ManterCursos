use ManterCursosBD;
select * from Curso;

select l.*, c.Descricao from Log l inner join Curso c on l.CursoId = c.CursoId;