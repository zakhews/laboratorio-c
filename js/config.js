// ============================================================
//  LVPC ZSAMP — Configuração Central
//  Para liberar um módulo: mude "liberado: false" para "true"
//  ou adicione o código de liberação em "codigo".
// ============================================================
 
const LVPC_CONFIG = {
  versao: "1.0",
 
  // Código mestre (professor digita no portal para liberar tudo)
  codigoProfessor: "LVPC-PROF-2025",
 
  modulos: [
    {
      id: "for-basico",
      titulo: "FOR Básico",
      descricao: "Contador simples — entenda inicialização, condição, corpo e incremento.",
      arquivo: "for-basico.html",
      liberado: true,
      codigo: "FOR01",
      icone: "🔁",
      fase: 1
    },
    {
      id: "for-aninhado",
      titulo: "FOR Aninhado",
      descricao: "Dois loops encadeados — notas de 30 alunos e média da turma.",
      arquivo: "for-aninhado.html",
      liberado: true,
      codigo: "FOR02",
      icone: "🔂",
      fase: 2
    },
    {
      id: "vetores",
      titulo: "Vetores",
      descricao: "Estrutura, índices, leitura e escrita com percurso visual.",
      arquivo: "vetores.html",
      liberado: false,
      codigo: "VET01",
      icone: "📊",
      fase: 3
    },
    {
      id: "matrizes",
      titulo: "Matrizes",
      descricao: "Grade bidimensional — índices i e j, percurso linha a linha.",
      arquivo: "matrizes.html",
      liberado: false,
      codigo: "MAT01",
      icone: "🔲",
      fase: 4
    },
    {
      id: "if-else",
      titulo: "IF / ELSE",
      descricao: "Avaliação de condições e desvios de fluxo TRUE / FALSE.",
      arquivo: "if-else.html",
      liberado: false,
      codigo: "IF01",
      icone: "🔀",
      fase: 5
    },
    {
      id: "busca-linear",
      titulo: "Busca Linear",
      descricao: "Comparações sequenciais — encontrado e não encontrado.",
      arquivo: "busca-linear.html",
      liberado: false,
      codigo: "BUS01",
      icone: "🔍",
      fase: 6
    },
    {
      id: "bubble-sort",
      titulo: "Bubble Sort",
      descricao: "Comparações, trocas e organização gradual dos dados.",
      arquivo: "bubble-sort.html",
      liberado: false,
      codigo: "BUB01",
      icone: "🫧",
      fase: 7
    }
  ],
 
  // Verifica se um módulo está liberado (por config ou por código salvo)
  estaLiberado(id) {
    const modulo = this.modulos.find(m => m.id === id);
    if (!modulo) return false;
    if (modulo.liberado) return true;
    const salvos = JSON.parse(localStorage.getItem("lvpc_codigos") || "[]");
    return salvos.includes(modulo.codigo) || salvos.includes(this.codigoProfessor);
  },
 
  // Tenta desbloquear com um código digitado pelo aluno
  tentarDesbloquear(codigoDigitado) {
    const codigo = codigoDigitado.trim().toUpperCase();
    const salvos = JSON.parse(localStorage.getItem("lvpc_codigos") || "[]");
    const modulo = this.modulos.find(m => m.codigo === codigo);
    const ehProfessor = codigo === this.codigoProfessor;
 
    if ((modulo || ehProfessor) && !salvos.includes(codigo)) {
      salvos.push(codigo);
      localStorage.setItem("lvpc_codigos", JSON.stringify(salvos));
      return { sucesso: true, modulo: modulo || null, professor: ehProfessor };
    }
    if (salvos.includes(codigo)) {
      return { sucesso: false, jaAtivado: true };
    }
    return { sucesso: false };
  }
};
