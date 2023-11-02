// Define el objeto Grafo
function Graph() {
  this.nodes = [];
  this.edges = [];
}

// Agrega un nodo al grafo
Graph.prototype.addNode = function (node) {
  this.nodes.push(node);
  this.edges[node] = [];
};

// Agrega una arista al grafo
Graph.prototype.addEdge = function (node1, node2, weight) {
  this.edges[node1].push({ node: node2, weight: weight });
};

// Obtiene el peso de una arista entre dos nodos
Graph.prototype.getEdgeWeight = function (node1, node2) {
  var weight = null;
  this.edges[node1].forEach(function (edge) {
    if (edge.node === node2) {
      weight = edge.weight;
    }
  });
  return weight;
};
// Crea el objeto grafo
var graph = new Graph();
//Crea el grafo basado en la entrada del usuario
Graph.prototype.deleteNode = function (node) {
  // Elimina el nodo del arreglo de nodos
  var index = this.nodes.indexOf(node);
  if (index !== -1) {
    this.nodes.splice(index, 1);
  }

  // Elimina todas las aristas relacionadas con el nodo
  delete this.edges[node];
  for (var otherNode in this.edges) {
    if (this.edges.hasOwnProperty(otherNode)) {
      var edges = this.edges[otherNode];
      for (var i = edges.length - 1; i >= 0; i--) {
        if (edges[i].node === node) {
          edges.splice(i, 1);
        }
      }
    }
  }
};
// Edita un nodo existente en el grafo
Graph.prototype.editNode = function (oldNode, newNode) {
  // Reemplaza el nodo antiguo por el nuevo
  var index = this.nodes.indexOf(oldNode);
  if (index !== -1) {
    this.nodes.splice(index, 1, newNode);
  }

  // Actualiza las aristas relacionadas con el nodo
  this.edges[newNode] = this.edges[oldNode];
  delete this.edges[oldNode];
  for (var otherNode in this.edges) {
    if (this.edges.hasOwnProperty(otherNode)) {
      var edges = this.edges[otherNode];
      for (var i = 0; i < edges.length; i++) {
        if (edges[i].node === oldNode) {
          edges[i].node = newNode;
        }
      }
    }
  }
};
// Maneja el evento de clic en el botón "Editar Nodo"
function editNode() {
  var oldNodeName = document.querySelector("#actualNodeName").value;
  var newNodeName = document.querySelector("#newNodeName").value;
  graph.editNode(oldNodeName, newNodeName);

  // Actualiza el grafo en la visualización
  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return { id: node, label: node, color: "#5FDABD" };
    })
  );
  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      if (graph.getEdgeWeight(node1, node2) !== null) {
        edges.add({
          from: node1,
          to: node2,
          label: graph.getEdgeWeight(node1, node2).toString(),
        });
      }
    });
  });
  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);
  document.getElementById("actualNodeName").value = "";
  document.getElementById("newNodeName").value = "";
}
// Edita una arista existente en el grafo
Graph.prototype.editEdge = function (node1, node2, newWeight) {
  // Si newWeight es igual a 0, elimina la arista
  if (newWeight === 0) {
    for (var i = 0; i < this.edges[node1].length; i++) {
      if (this.edges[node1][i].node === node2) {
        this.edges[node1].splice(i, 1);
        break;
      }
    }
  } else {
    // Actualiza el peso de la arista
    var edgeFound = false;
    this.edges[node1].forEach(function (edge) {
      if (edge.node === node2) {
        edge.weight = newWeight;
        edgeFound = true;
      }
    });
    if (!edgeFound) {
      // Si no se encuentra la arista, la agrega
      this.addEdge(node1, node2, newWeight);
    }
  }
};

// Maneja el evento de clic en el botón "Editar Arista"
function editEdge() {
  var node1 = document.querySelector("#editNodeName1").value;
  var node2 = document.querySelector("#editNodeName2").value;
  var newWeight = document.querySelector("#editWeight").value;
  graph.editEdge(node1, node2, parseFloat(newWeight));

  // Actualiza el grafo en la visualización
  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return { id: node, label: node, color: "#5FDABD" };
    })
  );
  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      if (graph.getEdgeWeight(node1, node2) !== null) {
        edges.add({
          from: node1,
          to: node2,
          label: graph.getEdgeWeight(node1, node2).toString(),
        });
      }
    });
  });
  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);
  document.getElementById("editNodeName1").value = "";
  document.getElementById("editNodeName2").value = "";
  document.getElementById("editWeight").value = "";
}

// Maneja el evento de clic en el botón "Eliminar Nodo"
function deleteNode() {
  var nodeToDelete = document.querySelector("#deleteNode").value;
  graph.deleteNode(nodeToDelete);

  // Actualiza el grafo en la visualización
  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return { id: node, label: node, color: "#5FDABD" };
    })
  );
  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      if (graph.getEdgeWeight(node1, node2) !== null) {
        edges.add({
          from: node1,
          to: node2,
          label: graph.getEdgeWeight(node1, node2).toString(),
        });
      }
    });
  });
  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);
  document.getElementById("deleteNode").value = "";
}
Graph.prototype.addNode = function (node) {
  this.nodes.push(node);
  this.edges[node] = [];
};

Graph.prototype.addNewNode = function () {
  var nodeName = document.querySelector("#addNode").value;
  if (!nodeName || this.nodes.some((node) => node === nodeName)) return;
  this.addNode(nodeName);

  // Actualiza el grafo en la visualización
  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return { id: node, label: node, color: "#5FDABD" };
    })
  );
  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      if (graph.getEdgeWeight(node1, node2) !== null) {
        edges.add({
          from: node1,
          to: node2,
          color: "#5FDABD",
          label: graph.getEdgeWeight(node1, node2).toString(),
        });
      }
    });
  });
  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);
  document.getElementById("addNode").value = "";
};
// Agrega una nueva arista al grafo
Graph.prototype.addNewEdge = function () {
  var node1 = document.querySelector("#addNodeName1").value;
  var node2 = document.querySelector("#addNodeName2").value;
  var weight = parseInt(document.querySelector("#addWeight").value);
  if (this.nodes.indexOf(node1) !== -1 && this.nodes.indexOf(node2) !== -1) {
    this.addEdge(node1, node2, weight);
  }
  // Actualiza el grafo en la visualización
  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return { id: node, label: node, color: "#5FDABD" };
    })
  );
  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      if (graph.getEdgeWeight(node1, node2) !== null) {
        edges.add({
          from: node1,
          to: node2,
          label: graph.getEdgeWeight(node1, node2).toString(),
        });
      }
    });
  });
  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);
  document.getElementById("addNodeName1").value = "";
  document.getElementById("addNodeName2").value = "";
  document.getElementById("addWeight").value = "";
};

function saveGraph() {
  // Crear un objeto simplificado del grafo
  var simplifiedGraph = {
    nodes: graph.nodes,
    edges: [],
  };
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      var weight = graph.getEdgeWeight(node1, node2);
      if (weight !== null) {
        simplifiedGraph.edges.push({ De: node1, A: node2, Peso: weight });
      }
    });
  });

  // Convertir el objeto simplificado en formato JSON y descargarlo como archivo
  var jsonGraph = JSON.stringify(simplifiedGraph);
  var blob = new Blob([jsonGraph], {
    type: "application/json;charset=utf-8",
  });
  saveAs(blob, "grafo.json");
}
// Implementa el algoritmo de Bellman-Ford modificado para encontrar el camino más largo
Graph.prototype.longestPath = function (startNode, endNode) {
  var distances = {};
  var previous = {};
  var nodes = this.nodes;

  // Inicializar las distancias a -Infinity y nodos previos a null
  nodes.forEach(function (node) {
    distances[node] = node === startNode ? 0 : -Infinity;
    previous[node] = null;
  });

  for (var i = 1; i < nodes.length; i++) {
    for (var node in this.edges) {
      this.edges[node].forEach(function (edge) {
        var newDistance = distances[node] + edge.weight;
        if (newDistance > distances[edge.node]) {
          distances[edge.node] = newDistance;
          previous[edge.node] = node;
        }
      });
    }
  }

  // Construye el camino más largo desde el nodo final al nodo inicial
  var path = [];
  var currentNode = endNode;
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return { path: path, distance: distances[endNode] };
};

// Resalta el camino más largo en color rojo
function highlightLongestPath() {
  var startNode = prompt("Ingrese el nodo de inicio:");
  var endNode = prompt("Ingrese el nodo final:");

  var result = graph.longestPath(startNode, endNode);
  var longestPath = result.path;
  var totalDistance = result.distance;

  var pathText = longestPath.join(" -> ");
  alert("El camino más largo es: " + pathText);

  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return {
        id: node,
        label: node,
        color: longestPath.includes(node) ? "red" : "#5FDABD",
      };
    })
  );

  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      var weight = graph.getEdgeWeight(node1, node2);
      if (weight !== null) {
        var inLongestPath = false;
        for (var i = 0; i < longestPath.length - 1; i++) {
          if (longestPath[i] === node1 && longestPath[i + 1] === node2) {
            inLongestPath = true;
            break;
          }
        }
        edges.add({
          from: node1,
          to: node2,
          label: weight.toString(),
          color: inLongestPath ? "red" : "#5FDABD",
          dashes: inLongestPath ? false : true,
        });
      }
    });
  });

  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);

  // Muestra la distancia total de la ruta más larga
  alert("La distancia total de la ruta más larga es: " + totalDistance);
}
Graph.prototype.shortestPath = function (startNode, endNode) {
  var distances = {};
  var previous = {};
  var nodes = this.nodes;

  // Inicializar las distancias a Infinity y nodos previos a null
  nodes.forEach(function (node) {
    distances[node] = node === startNode ? 0 : Infinity;
    previous[node] = null;
  });

  var unvisitedNodes = nodes.slice();

  while (unvisitedNodes.length > 0) {
    var currentNode = unvisitedNodes.reduce(function (minNode, node) {
      return distances[node] < distances[minNode] ? node : minNode;
    }, unvisitedNodes[0]);

    unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);

    this.edges[currentNode].forEach(function (edge) {
      var newDistance = distances[currentNode] + edge.weight;
      if (newDistance < distances[edge.node]) {
        distances[edge.node] = newDistance;
        previous[edge.node] = currentNode;
      }
    });
  }

  // Construye el camino más corto desde el nodo final al nodo inicial
  var path = [];
  currentNode = endNode;
  while (currentNode !== null) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return { path: path, distance: distances[endNode] };
};

// Resalta el camino más corto en color rojo
function highlightShortestPath() {
  var startNode = prompt("Ingrese el nodo de inicio:");
  var endNode = prompt("Ingrese el nodo final:");

  var result = graph.shortestPath(startNode, endNode);
  var shortestPath = result.path;
  var totalDistance = result.distance;

  var pathText = shortestPath.join(" -> ");
  alert("El camino más corto es: " + pathText);
  var nodes = new vis.DataSet(
    graph.nodes.map(function (node) {
      return {
        id: node,
        label: node,
        color: shortestPath.includes(node) ? "red" : "#5FDABD",
      };
    })
  );

  var edges = new vis.DataSet([]);
  graph.nodes.forEach(function (node1) {
    graph.nodes.forEach(function (node2) {
      var weight = graph.getEdgeWeight(node1, node2);
      if (weight !== null) {
        var inShortestPath = false;
        for (var i = 0; i < shortestPath.length - 1; i++) {
          if (shortestPath[i] === node1 && shortestPath[i + 1] === node2) {
            inShortestPath = true;
            break;
          }
        }
        edges.add({
          from: node1,
          to: node2,
          label: weight.toString(),
          color: inShortestPath ? "red" : "#5FDABD",
          dashes: inShortestPath ? false : true,
        });
      }
    });
  });

  var container = document.getElementById("mynetwork");
  var data = { nodes: nodes, edges: edges };
  var options = {
    edges: {
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      arrowStrikethrough: false,
    },
  };
  var network = new vis.Network(container, data, options);

  // Muestra la distancia total de la ruta más corta
  alert("La distancia total de la ruta más corta es: " + totalDistance);
}

function loadGraph() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var jsonGraph = e.target.result;
    var graphData = JSON.parse(jsonGraph);

    // Crear el objeto grafo
    graphData.nodes.forEach(function (node) {
      graph.addNode(node);
    });
    graphData.edges.forEach(function (edge) {
      graph.addEdge(edge.De, edge.A, edge.Peso);
    });

    // Actualizar la visualización del grafo
    var nodes = new vis.DataSet(
      graph.nodes.map(function (node) {
        return { id: node, label: node, color: "#5FDABD" };
      })
    );
    var edges = new vis.DataSet([]);
    graph.nodes.forEach(function (node1) {
      graph.nodes.forEach(function (node2) {
        if (graph.getEdgeWeight(node1, node2) !== null) {
          edges.add({
            from: node1,
            to: node2,
            label: graph.getEdgeWeight(node1, node2).toString(),
          });
        }
      });
    });
    var container = document.getElementById("mynetwork");
    var data = { nodes: nodes, edges: edges };
    var options = {
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1 },
        },
        arrowStrikethrough: false,
      },
    };
    var network = new vis.Network(container, data, options);
  };

  reader.readAsText(file);
  document.getElementById("fileInput").value = "";
}
function showAdjacencyMatrix() {
  var matrix = [];
  var nodes = graph.nodes;
  var n = nodes.length;

  // llenar la matriz de adyacencia
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
    for (var j = 0; j < n; j++) {
      matrix[i][j] = graph.getEdgeWeight(nodes[i], nodes[j]) || 0;
    }
  }

  // enumerar las filas y columnas
  var table =
    '<table style="width: 100%; border-collapse: collapse; background-color: #cbb9c5;">';
  table +=
    '<tr><td style="padding: 8px; text-align: center; border: 1px solid #0d030c;"></td>'; // espacio en la esquina superior izquierda
  for (var i = 0; i < n; i++) {
    table +=
      '<td style="padding: 8px; text-align: center; border: 1px solid #0d030c;">(' +
      nodes[i] +
      ")</td>"; // enumerar las columnas
  }
  table += "</tr>";
  for (var i = 0; i < n; i++) {
    table += "<tr>";
    table +=
      '<td style="padding: 8px; text-align: center; border: 1px solid #0d030c;">(' +
      nodes[i] +
      ")</td>"; // enumerar las filas
    for (var j = 0; j < n; j++) {
      table +=
        '<td style="padding: 8px; text-align: center; border: 1px solid #0d030c;">' +
        matrix[i][j] +
        "</td>";
    }
    table += "</tr>";
  }
  table += "</table>";

  // abrir la ventana emergente con el mensaje y la matriz de adyacencia
  var matrixWindow = window.open("", "_blank");
  matrixWindow.document.write(
    '<h1 style="text-align: center">Matriz de adyacencia</h1>'
  );
  matrixWindow.document.write(table);
}

function showIncidenceMatrix() {
  var nodes = graph.nodes;
  var edges = Object.values(graph.edges).flat();
  var matrix = [];
  console.log(edges);
  for (var i = 0; i < nodes.length; i++) {
    matrix[i] = [];
    for (var j = 0; j < edges.length; j++) {
      if (edges[j].node === nodes[i]) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = 0;
      }
    }
  }
  var table =
    '<table style="width: 100%; border-collapse: collapse; background-color: #cbb9c5;">';
  table +=
    '<tr><td style="padding: 8px; text-align: center; border: 1px solid #0d030c;"></td>'; // espacio en la esquina superior izquierda
  for (var j = 0; j < edges.length; j++) {
    table +=
      '<td style="padding: 8px; text-align: center; border: 1px solid #0d030c;">' +
      "(e" +
      (j + 1) +
      ")" +
      "</td>"; // etiquetar las columnas con 'e' y el número de arista
  }
  table += "</tr>";
  for (var i = 0; i < nodes.length; i++) {
    table += "<tr>";
    table +=
      '<td style="padding: 8px; text-align: center; border: 1px solid #0d030c;">' +
      "(" +
      nodes[i] +
      ")" +
      "</td>"; // enumerar las filas
    for (var j = 0; j < edges.length; j++) {
      table +=
        '<td style="padding: 8px; text-align: center; border: 1px solid #0d030c;">' +
        matrix[i][j] +
        "</td>";
    }
    table += "</tr>";
  }
  table += "</table>";
  var win = window.open("", "_blank");
  win.document.write(
    '<h1 style="text-align: center">Matriz de incidencia</h1>'
  );
  win.document.write(table);
}
