function apagarStartScene() {
    document.getElementById("imgLogin").style.display = "none"
    document.getElementById("imgRegister").style.display = "none"
}

function apagarAllScenes() {
    document.getElementById("imgLogo").style.display = "none"
    document.getElementById("divLogin").style.display = "none"
    document.getElementById("divRegisto").style.display = "none"
}

//mudar de turno
function checkTurn() {

    loadJSON("/checkTurn/", (response) => {

        for (i = 0; i < response.length; i++) {
            console.log(response)
             
            var turnoJogadorNome
            for (k = 0; k < response.length; k++) {
                if ( response[k].turn == 1){
                    turnoJogadorNome=response[k].username
                } 
            }
             
            if (playerId == response[i].user_id && response[i].turn == 0) {

                createElement('h2', "Espera pela tua vez! é o turno d@: "+turnoJogadorNome).position(canvas_width + 50, 50)
            }

            if (playerId == response[i].user_id && response[i].turn == 1) {
                
                let diceBtn = createImg('/assets/dado.ico', 'lança o dado!');
                diceBtn.position(canvas_width + canvas_width * 0.5, -50);
                diceBtn.size(100, 100)
                diceBtn.mousePressed(rollDice)
                diceBtn.show()
            }
        }
    });
}
//VER AQUI
function changeTurn(playerId) {
    loadJSON("/checkTurn/", (response) => {

        let data = {
            'current_player': playerId,
        }

        httpPost('/setTurn0/', 'json', data, (r) => {
            console.log("SET TURN TO 0")
        })

        let nextP
        for (i = 0; i < response.length; i++) {

            if(playerId==response[i].user_id){

                if(i==response.length-1)
                    nextP=response[0].user_id
                if(i < response.length-1)
                    nextP=response[i+1].user_id
                break
            }
        }

        let dataTwo = {
            'next_player': nextP
        }

        httpPost('/setTurn1/', 'json', dataTwo, (response) => {
            console.log("SET TURN TO 1")
        })

    });
}

function display_players_status() {

    loadJSON("/getPlayersData/", (response) => {
  
      for (i = 0; i < response.length; i++) {
  
        if (playerName == response[i].username)
          createElement('h3', "Nome: " + response[i].username + "     Dinheiro: " + response[i].dinheiro + "      Carisma: " + response[i].carisma).position(canvas_width + 50, 200 + i * 80)
        else
          createP("Nome: " + response[i].username + "     Dinheiro: " + response[i].dinheiro + "$  Carisma: " + response[i].carisma).position(canvas_width + 50, 200 + i * 80)
      }
  
    })
  }