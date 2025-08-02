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
// função para buscar palavra chave nos detalhes do relatorio
document.getElementById("buscar-detalhes").addEventListener("click", function () {
  const palavra = document.getElementById("busca-palavra").value.trim().toLowerCase();
  const resultadosDiv = document.getElementById("resultados-busca");
  resultadosDiv.innerHTML = "";

  if (!palavra) {
    resultadosDiv.textContent = "Digite uma palavra-chave para buscar.";
    return;
  }

  const relatorios = JSON.parse(localStorage.getItem("relatorios")) || {};
  let encontrou = false;

  Object.entries(relatorios).forEach(([data, relatorio]) => {
    const detalhes = relatorio.detalhes || "";
    const palavras = detalhes.split(/\s+/);
    palavras.forEach((p, i) => {
      if (p.toLowerCase().includes(palavra)) {
        encontrou = true;
        // Pega as próximas 5 palavras (ou menos se não houver)
        const proximas = palavras.slice(i + 1, i + 6).join(" ");
        // Cria um botão para selecionar o dia
        const btn = document.createElement("button");
        btn.textContent = `Dia: ${data} ...${p} ${proximas}`;
        btn.onclick = () => {
          alert(`Você selecionou o relatório do dia ${data}`);
          // Aqui você pode exibir o relatório completo, se quiser
        };
        resultadosDiv.appendChild(btn);
        resultadosDiv.appendChild(document.createElement("br"));
      }
    });
  });

  if (!encontrou) {
    resultadosDiv.textContent = "Nenhum resultado encontrado.";
  }
});