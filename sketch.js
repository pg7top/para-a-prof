//crie a bola(ball), a raqueteJogador(playerPaddle) e a raqueteComputador(computerPaddle) como objetos sprites
var ball = createSprite(200,200,10,10);


var playerPaddle = createSprite(380,200,10,70);

var computerPaddle = createSprite(10,200,10,70);


//variável para armazenar diferentes estágios do jogo
var gameState = "serve";

//variáveis para manter o placar
var compScore = 0;
var playerScore = 0;


function draw() {
  //limpe a tela
  background("white");
  if(ball.isTouching(computerPaddle)|| ball.isTouching(playerPaddle)){
    playSound("hit.mp3", false);
  }
  
  //posicione o texto informativo ao centro
  if (gameState === "serve") {
    text("Pressione Espaço para Lançar",150,180);
  }
   
  //mostrar placares
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //faça a palheta do jogador mover-se de acordo com a posição y do mouse
  playerPaddle.y = World.mouseY;
  
  //IA para a palheta do computador
  //faça a se mover de acordo com a posição y da bola
  computerPaddle.y = ball.y;
  
  //desenhe uma linha no centro
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
 
  
  //crie limites de borda
  //faça a bola quicar nas bordas superior e inferior
  createEdgeSprites();
  
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //lance a bola quando espaço é pressionado
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //volte a bola ao centro se ela cruzar a tela
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
   text("Fim de Jogo!",170,160);
   text("Pressione 'R' para Recomeçar",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
