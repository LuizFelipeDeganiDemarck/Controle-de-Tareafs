let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let usuario = localStorage.getItem("usuario") || "";

function entrar() {
  usuario = nomeUsuario.value;
  localStorage.setItem("usuario", usuario);
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("user").innerText = usuario;
  render();
}

if (usuario) {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.getElementById("user").innerText = usuario;
}

function render() {
  ["Aberto", "Em andamento", "Concluído"].forEach(c => {
    document.getElementById(c).innerHTML = "";
  });

  const filtro = document.getElementById("filtro").value;

  tarefas.forEach((t, i) => {
    if (filtro && t.responsavel !== filtro) return;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>${t.titulo}</strong>
      <p>${t.descricao}</p>
      <div class="meta">${t.prioridade} | ${t.responsavel}</div>
      <button onclick="avancar(${i})">Mover</button>
    `;

    document.getElementById(t.status).appendChild(card);
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function salvar() {
  tarefas.push({
    titulo: titulo.value,
    descricao: descricao.value,
    prioridade: prioridade.value,
    responsavel: responsavel.value,
    equipe: equipe.value,
    status: "Aberto",
  });

  fecharModal();
  render();
}

function avancar(i) {
  const ordem = ["Aberto", "Em andamento", "Concluído"];
  const idx = ordem.indexOf(tarefas[i].status);
  tarefas[i].status = ordem[Math.min(idx + 1, 2)];
  render();
}

function exportar() {
  const blob = new Blob([JSON.stringify(tarefas, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "tarefas.json";
  a.click();
}

function abrirModal() {
  modal.classList.remove("hidden");
}

function fecharModal() {
  modal.classList.add("hidden");
}
