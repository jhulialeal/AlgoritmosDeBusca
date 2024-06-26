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

  function buscaGulosa(mapa, heuristica, inicio, destino) {
    let visitados = new Set();
    let fila = [{ cidade: inicio, estimativa: heuristica[inicio], caminho: [inicio] }];
  
    while (fila.length > 0) {
      fila.sort((a, b) => a.estimativa - b.estimativa);
      let { cidade, caminho } = fila.shift();
  
      if (cidade === destino) {
        return caminho;
      }
  
      visitados.add(cidade);
  
      Object.keys(mapa[cidade]).forEach(vizinho => {
        if (!visitados.has(vizinho)) {
          let novoCaminho = caminho.concat(vizinho);
          fila.push({ cidade: vizinho, estimativa: heuristica[vizinho], caminho: novoCaminho });
        }
      });
    }
  
    return "Caminho não encontrado.";
  }

  console.log(buscaGulosa(mapaDaRomenia, heuristica, "Arad", "Bucharest"));