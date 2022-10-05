//Seletor das casas
const tileElements = document.querySelectorAll('[data-tile]');

//Seletor da board
const board = document.querySelector('[data-board]');

//Seletor do texto de Vitória/Empate
const textoVencedor = document.querySelector('[data-texto]');

//Seletor da DIV de fim de jogo
const textoGanhador = document.querySelector('[data-ganhador]')

//Variável que compõe a troca de jogador
let SegundoJogador;


//Lista de listas que formam a vitória
const vencedor = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6], 
]


//Função que da inicio ao jogo (Faz o hover funcionar)
const playGame = () => {
  for (const tile of tileElements) {
  tile.addEventListener("click", handleClick, {once: true});
}
  SegundoJogador = false;

  board.classList.add("x");
};


const endGame = (empate) => {
  if(empate){
    textoGanhador.innerText = "Empate!"
  } else {
    textoGanhador.innerText = SegundoJogador ? 'O venceu!' : 'X venceu!'
  }

  textoGanhador.classList.add("mostrando-ganhador");
}

//Valida a vitória quando encontrar uma sequência
const checaVitoria = (jogadorAtual) => {
  return vencedor.some((combination) => {
    return combination.every((index) => {
      return tileElements[index].classList.contains(jogadorAtual);
    });
  });
};


//Constante que adiciona o X ou O a casa
const marcador = (tile, classe) => {
  tile.classList.add(classe);
}

//Função para trocar o tipo do marcador
const troca = () => {
  SegundoJogador = !SegundoJogador

  board.classList.remove("o");
  board.classList.remove("x");

  if(SegundoJogador){
    board.classList.add("o");
  } else {
      board.classList.add("x");
    }
};

const handleClick = (e) => {
  //Seleção da célula
  const tile = e.target;
  const classe = SegundoJogador ? 'o' : 'x';

  marcador(tile,  classe);
  //Verificando a vitória
  const ganhou = checaVitoria(classe);
  if (ganhou){
    endGame(false)
  }
  //Verificar o empate

  //Alterando o jogador
  troca();
}

playGame();


