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

  function encontrarCaminhoComLimite(mapa, inicio, destino, limite) {
    let pilha = [[inicio, 0]]; // Armazena o nó e sua profundidade
    let visitados = { [inicio]: true };
    let predecessor = { [inicio]: null };

    while (pilha.length > 0) {
        let [cidadeAtual, profundidadeAtual] = pilha.pop();

        if (cidadeAtual === destino) {
            let caminho = [];
            while (cidadeAtual !== null) {
                caminho.unshift(cidadeAtual);
                cidadeAtual = predecessor[cidadeAtual];
            }
            return caminho;
        }

        if (profundidadeAtual < limite) {
            let vizinhos = Object.keys(mapa[cidadeAtual]);
            for (let vizinho of vizinhos) {
                if (!visitados[vizinho]) {
                    visitados[vizinho] = true;
                    predecessor[vizinho] = cidadeAtual;
                    pilha.push([vizinho, profundidadeAtual + 1]); 
                }
            }
        }
    }

    return "Caminho não encontrado dentro do limite de profundidade.";
}

console.log(encontrarCaminhoComLimite(mapaDaRomenia, "Arad", "Bucharest", 3));