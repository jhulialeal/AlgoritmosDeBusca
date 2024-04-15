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

  function encontrarCaminhoCustoUniforme(mapa, inicio, destino) {
    let fila = [{ nome: inicio, custo: 0 }];
    let visitados = {};
    let predecessor = { [inicio]: null };
  
    while (fila.length > 0) {
      // Ordena a fila pelo custo para garantir que o próximo nó escolhido seja o de menor custo
      fila.sort((a, b) => a.custo - b.custo);
      let { nome: cidadeAtual, custo: custoAtual } = fila.shift();
  
      if (cidadeAtual === destino) {
        let caminho = [];
        while (cidadeAtual !== null) {
          caminho.unshift(cidadeAtual);
          cidadeAtual = predecessor[cidadeAtual];
        }
        return { caminho, custo: custoAtual };
      }
  
      if (!visitados[cidadeAtual]) {
        visitados[cidadeAtual] = true;
  
        let vizinhos = Object.keys(mapa[cidadeAtual]);
        for (let vizinho of vizinhos) {
          if (!visitados[vizinho]) {
            let custoTotal = custoAtual + mapa[cidadeAtual][vizinho];
            // Verifica se o vizinho já está na fila com um custo maior e atualiza se necessário
            let indiceNaFila = fila.findIndex((el) => el.nome === vizinho);
            if (indiceNaFila !== -1 && fila[indiceNaFila].custo > custoTotal) {
              fila[indiceNaFila].custo = custoTotal;
              predecessor[vizinho] = cidadeAtual;
            } else if (indiceNaFila === -1) {
              fila.push({ nome: vizinho, custo: custoTotal });
              predecessor[vizinho] = cidadeAtual;
            }
          }
        }
      }
    }
  
    return "Caminho não encontrado.";
  }
  
  console.log(encontrarCaminhoCustoUniforme(mapaDaRomenia, "Arad", "Bucharest"));
  