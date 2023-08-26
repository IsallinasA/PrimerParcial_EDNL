document.addEventListener("DOMContentLoaded", () => {
  const graficarBtn = document.getElementById("graficarBtn");
  const generarEnlacesBtn = document.getElementById("generarEnlacesBtn");
  const graficaContainer = document.getElementById("grafica");
  const puntosLista = document.getElementById("puntosLista");
  const buttonAdd = document.getElementById("buttonAdd");

  const nodes = new vis.DataSet();
  const edges = new vis.DataSet();
  const data = { nodes, edges };
  const options = {};
  let valuesList = [];
  let relationsList = [];
  let relationsOriginList = [];
  let addIds = 0;

  const network = new vis.Network(graficaContainer, data, options);

  function refresh() {
    const lis = puntosLista.children;

    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      const liChildren = li.children;
      const selectOrigin = liChildren[0];
      const input = liChildren[1];
      const select = liChildren[2];

      selectOrigin.innerHTML = "";
      select.innerHTML = "";

      for (let k = 1; k <= nodes.length; k++) {
        selectOrigin.innerHTML += `<option value="${k}">Punto ${k}</option>`;
        select.innerHTML += `<option value="${k}">Punto ${k}</option>`;
      }

      if (relationsList.length > 0 && i < lis.length - 1) {
        input.value = valuesList[i];
        select.value = relationsList[i];
        selectOrigin.value = relationsOriginList[i];
      }
    }
  }

  buttonAdd.addEventListener("click", () => {
    addIds++;
    const id = addIds;

    puntosLista.innerHTML += `<li id="li-${id}"><select id="selectOrigin-${id}" value="${1}"></select> <input type="number" id="${id}" value="${1}" /> <select id="select-${id}" value="${1}"></select></li>`;

    refresh();
  });

  graficarBtn.addEventListener("click", () => {
    const id = nodes.length + 1;
    const color = "#5FDABD";
    nodes.add({
      id,
      label: id.toString(),
      color: color,
      font: { color: "white" },
    });
    buttonAdd.disabled = false;
    refresh();
  });

  generarEnlacesBtn.addEventListener("click", () => {
    relationsList = [];
    relationsOriginList = [];
    valuesList = [];
    edges.clear();
    const inputs = puntosLista.querySelectorAll("input");
    inputs.forEach((input, index) => {
      const valor = parseFloat(input.value);
      const origin = document.getElementById(`selectOrigin-${input.id}`);
      const originValue = parseInt(origin.value);
      const destination = document.getElementById(`select-${input.id}`);
      const destinationValue = parseInt(destination.value);
      valuesList.push(valor);
      if (!isNaN(valor)) {
        relationsList.push(destinationValue);
        relationsOriginList.push(originValue);
        edges.add({
          from: originValue,
          to: destinationValue,
          label: valor.toString(),
        });
      }
    });
  });
});
