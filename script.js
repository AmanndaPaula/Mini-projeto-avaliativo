// 1. Ao carregar a página, exibir tarefas salvas
window.addEventListener("load", function () {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasSalvas.forEach(function (tarefa) {
    adicionarNaLista(tarefa);
  });
});

// 2. Adicionar nova tarefa
document.getElementById("adicionar").addEventListener("click", function () {
  const input = document.getElementById("tarefa");
  const texto = input.value.trim();

  if (texto !== "") {
    adicionarNaLista(texto);

    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(texto);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    input.value = "";
  }
});

// 3. Botão para apagar todas as tarefas
document.getElementById("apagar-tudo").addEventListener("click", function () {
  if (confirm("Tem certeza que deseja apagar TODAS as tarefas?")) {
    localStorage.removeItem("tarefas");
    document.getElementById("lista-tarefas").innerHTML = "";
  }
});

// 4. Função para criar elemento da tarefa com botão "Apagar"
function adicionarNaLista(texto) {
  const lista = document.getElementById("lista-tarefas");
  const li = document.createElement("li");

  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "🗑️";
  botaoRemover.classList.add("botao-remover");

  // Evento de clique para apagar tarefa individual
  botaoRemover.addEventListener("click", function () {
    if (confirm(`Deseja remover a tarefa: "${texto}"?`)) {
      lista.removeChild(li);

      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      tarefas = tarefas.filter((item) => item !== texto);
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  });

  li.appendChild(spanTexto);
  li.appendChild(botaoRemover);
  lista.appendChild(li);
}
