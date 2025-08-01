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

// 4. Função que adiciona visualmente a tarefa na lista
function adicionarNaLista(texto) {
  const lista = document.getElementById("lista-tarefas");
  const li = document.createElement("li");

  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "🗑️";
  botaoRemover.classList.add("botao-remover");

  // Ao clicar no botão "🗑️", remove a tarefa
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

// 5. Finalizar o dia: salvar tarefas + detalhes no relatório
document.getElementById("finalizar-dia").addEventListener("click", () => {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  if (tarefas.length === 0) {
    alert("Não há tarefas para salvar.");
    return;
  }

  // Solicita os detalhes do dia ao usuário
  const detalhes = prompt("Deseja escrever algum detalhe sobre o seu dia? (opcional)");

  const hoje = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
  const relatorios = JSON.parse(localStorage.getItem("relatorios")) || {};

  // Salva tarefas + observações
  relatorios[hoje] = {
    tarefas: tarefas,
    detalhes: detalhes || ""
  };

  localStorage.setItem("relatorios", JSON.stringify(relatorios));

  alert("Relatório do dia salvo com sucesso!");

  // Limpa as tarefas
  localStorage.removeItem("tarefas");
  document.getElementById("lista-tarefas").innerHTML = "";
});

// Botão que redireciona para a página de relatório
    document.getElementById("ver-relatorio").addEventListener("click", () => {
      window.location.href = "relatorio.html";
    });
