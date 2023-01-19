//funcao botão login
function login() {

      let usernameValue = username.value();
      let passwordValue = password.value();
      
      let data = {

            "username": usernameValue,
            "password": passwordValue
      }

      httpPost('/login','json',data,(response)=>{

            if(response.length>0){
            console.log("resposta "+response);
            userid=response[0].id;
            removeElements();
            scene=1;
            loop()
            }else{
            alert("autenticação errada");
            }
          
      })
}

function register() {

      let usernameValue = username.value();
      let passwordValue = password.value();

      let data = {

            "username": usernameValue,
            "password": passwordValue
      }

      httpPost('/register','json',data,(response)=>{
  
            if(response.length>0){
            alert("Utilizador Registado")
            removeElements();
            scene=1;
            playerId=response[0].PlayerId;
            console.log(playerId);
            }else{
            alert("Utilizador Já Existe!");
            }
          
            });
}

function getUserData(){
      httpPost("/updatePlayerPos","json",data,(response)=>{

            createBoard(playerId);
            diceBtn.remove();
            flagTurn=false;
            changeTurn(playerId);
          });
}