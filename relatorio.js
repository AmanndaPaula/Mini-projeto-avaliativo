// Quando o usuário escolher uma data no input
document.getElementById("data-relatorio").addEventListener("change", () => {
  const data = document.getElementById("data-relatorio").value;
  const relatorios = JSON.parse(localStorage.getItem("relatorios")) || {};
  const relatorioDoDia = relatorios[data];

  const lista = document.getElementById("lista-relatorio");
  const detalhes = document.getElementById("detalhes-relatorio");
  lista.innerHTML = "";
  detalhes.textContent = "";

  // Se não tiver relatório para essa data
  if (!relatorioDoDia) {
    lista.innerHTML = "<li>Nenhuma tarefa registrada para esta data.</li>";
    return;
  }

  // Mostra todas as tarefas da data
  relatorioDoDia.tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.textContent = tarefa;
    lista.appendChild(li);
  });

  // Mostra os detalhes do dia
  detalhes.textContent = "Detalhes: " + (relatorioDoDia.detalhes || "Sem observações.");
});
