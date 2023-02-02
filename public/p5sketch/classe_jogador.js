function display_player_status(playerName, playerDinheiro, playerCarisma) {

    tagdinheiro = select("#dinheiro");
    tagnome = select("#nome")
    tagcarisma = select("#carisma")
    tagturno = select("#turno")

    tagnome.html("Nome: " + playerName)
    tagdinheiro.html("Dinhero: " + playerDinheiro + "€$")
    tagcarisma.html("carisma: " + playerCarisma)
    tagturno.html("Turno:") 
}
