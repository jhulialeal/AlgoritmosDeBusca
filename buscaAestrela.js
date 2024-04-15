let mapaDaRomenia = {
    Arad: { Sibiu: 140, Zerind: 75, Timisoara: 118 },
    Zerind: { Arad: 75, Oradea: 71 },
    Oradea: { Zerind: 71, Sibiu: 151 },
    Sibiu: { Arad: 140, Oradea: 151, Fagaras: 99, "Rimnicu Vilcea": 80 },
    Timisoara: { Arad: 118, Lugoj: 111 },
    Lugoj: { Timisoara: 111, Mehadia: 70 },
    Mehadia: { Lugoj: 70, Drobeta: 75 },
    Drobeta: { Mehadia: 75, Craiova: 120 },
    Craiova: { Drobeta: 120, "Rimnicu Vilcea": 146, Pitesti: 138 },
    "Rimnicu Vilcea": { Sibiu: 80, Craiova: 146, Pitesti: 97 },
    Fagaras: { Sibiu: 99, Bucharest: 211 },
    Pitesti: { "Rimnicu Vilcea": 97, Craiova: 138, Bucharest: 101 },
    Bucharest: { Fagaras: 211, Pitesti: 101, Giurgiu: 90, Urziceni: 85 },
    Giurgiu: { Bucharest: 90 },
    Urziceni: { Bucharest: 85, Vaslui: 142, Hirsova: 98 },
    Hirsova: { Urziceni: 98, Eforie: 86 },
    Eforie: { Hirsova: 86 },
    Vaslui: { Iasi: 92, Urziceni: 142 },
    Iasi: { Vaslui: 92, Neamt: 87 },
    Neamt: { Iasi: 87 },
  };
  const heuristica = {
    Arad: 366, Bucharest: 0, Craiova: 160, Drobeta: 242,
    Eforie: 161, Fagaras: 176, Giurgiu: 77, Iasi: 226,
    Lugoj: 244, Mehadia: 241, Neamt: 234, Oradea: 380,
    Pitesti: 100, "Rimnicu Vilcea": 193, Sibiu: 253, Timisoara: 329,
    Urziceni: 80, Vaslui: 199, Zerind: 374, Hirsova: 151
  };

  function aStar(mapa, heuristica, inicio, destino) {
    let fila = new PriorityQueue((a, b) => a.f < b.f);
    let g = {}; // Custo do caminho desde o início até o nó n
    let predecessores = {};
    g[inicio] = 0;
    fila.enqueue({ cidade: inicio, f: heuristica[inicio] });
  
    while (!fila.isEmpty()) {
      let { cidade } = fila.dequeue();
      if (cidade === destino) {
        return reconstruirCaminho(predecessores, destino);
      }
  
      Object.keys(mapa[cidade]).forEach(vizinho => {
        let custoAtual = g[cidade] + mapa[cidade][vizinho];
        if (g[vizinho] === undefined || custoAtual < g[vizinho]) {
          predecessores[vizinho] = cidade;
          g[vizinho] = custoAtual;
          let f = custoAtual + heuristica[vizinho];
          fila.enqueue({ cidade: vizinho, f: f });
        }
      });
    }
  
    function reconstruirCaminho(predecessores, destino) {
      let caminho = [destino];
      while (predecessores[destino] !== undefined) {
        destino = predecessores[destino];
        caminho.unshift(destino);
      }
      return caminho;
    }
  
    return "Caminho não encontrado.";
  }
  
  // Implementação simplificada de uma fila de prioridades
  class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
      this._heap = [];
      this._comparator = comparator;
    }
  
    enqueue(value) {
      this._heap.push(value);
      this._heap.sort(this._comparator);
    }
  
    dequeue() {
      return this._heap.shift();
    }
  
    isEmpty() {
      return this._heap.length === 0;
    }
  }
  console.log(aStar(mapaDaRomenia, heuristica, "Fagaras", "Bucharest"));
