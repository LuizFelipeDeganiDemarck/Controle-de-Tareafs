let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "Todos";

function render(lista = tarefas) {
  const container = document.getElementById("tarefas");
  container.innerHTML = "";

  lista.forEach((t, i) => {
    container.innerHTML += `
      <div class="tarefa">
        <h3>${t.titulo}</h3>
        <p>${t.descricao}</p>

        <div class="tags">
          <span class="tag prioridade-${t.prioridade}">${t.prioridade}</span>
          <span class="tag status-${t.status}">${statusLabel(t.status)}</span>
          <span class="tag">${t.responsavel}</span>
          <span class="tag">${t.equipe}</span>
        </div>

        <small>
          📅 Início: ${t.dataInicio || "-"}<br>
          ⏰ Prazo: ${t.prazo || "-"}<br>
          ⏱ Horas: ${t.horas || 0}
        </small>

        <select onchange="mudarStatus(${i}, this.value)">
          <option value="NaoIniciada" ${t.status === "NaoIniciada" ? "selected" : ""}>Não iniciada</option>
          <option value="EmAndamento" ${t.status === "EmAndamento" ? "selected" : ""}>Em andamento</option>
          <option value="Concluida" ${t.status === "Concluida" ? "selected" : ""}>Concluída</option>
        </select>

        <button class="remove" onclick="remover(${i})">Remover</button>
      </div>
    `;
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function salvarTarefa() {
  tarefas.push({
    titulo: titulo.value,
    descricao: descricao.value,
    prioridade: prioridade.value,
    responsavel: responsavel.value,
    equipe: equipe.value,
    dataInicio: dataInicio.value,
    prazo: prazo.value,
    horas: horas.value,
    status: status.value
  });

  fecharModal();
  limparFormulario();
  aplicarFiltro();
}

function remover(i) {
  tarefas.splice(i, 1);
  aplicarFiltro();
}

function mudarStatus(i, status) {
  tarefas[i].status = status;
  aplicarFiltro();
}

function filtrar(status) {
  filtroAtual = status;
  aplicarFiltro();
}

function aplicarFiltro() {
  if (filtroAtual === "Todos") {
    render();
  } else {
    render(tarefas.filter(t => t.status === filtroAtual));
  }
}

function statusLabel(status) {
  return {
    NaoIniciada: "Não iniciada",
    EmAndamento: "Em andamento",
    Concluida: "Concluída"
  }[status];
}

function abrirModal() {
  document.getElementById("modal").classList.remove("hidden");
}

function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

function limparFormulario() {
  titulo.value = "";
  descricao.value = "";
  horas.value = "";
  dataInicio.value = "";
  prazo.value = "";
}

render();
