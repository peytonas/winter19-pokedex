import PokemonService from "../Services/PokemonService.js";
import store from "../store.js";

//Private
function _drawPokemon() {
  let template= "";
  let pokemon = store.State.pokemon;
  // NOTE  these are all POJO's since there isnt much data and so we create our template here! 
  pokemon.forEach(cur => template+= `<li onclick="app.pokemonController.selectPokemonAsync('${cur.name}')">${cur.name}</li>`)
  document.getElementById('pokemon-list').innerHTML = template
  console.log(pokemon);
}

function _drawActivePokemon() {
  let pokemon = store.State.activePokemon;
  if(pokemon._id){
    document.getElementById('card').innerHTML = pokemon.Template
    return
  }
  document.getElementById("card").innerHTML = ""
}

function _drawCaptured (){
  let template = "";
  let caughtPokemon = store.State.caughtPokemon;
  caughtPokemon.forEach(cur => template+= `<li onclick="app.pokemonController.selectCaughtPokemon('${cur._id}')">${cur.name}</li>`)
  document.getElementById('caught').innerHTML = template;
}


//Public
export default class PokemonController {
  constructor() {
    store.subscribe("pokemon", _drawPokemon);
    store.subscribe("activePokemon", _drawActivePokemon)
    store.subscribe("caughtPokemon", _drawCaptured)
    _drawPokemon();
    PokemonService.getWildPokemonAsync();
    this.getMyPokemonAsync();
    console.log("hello from controller")
  }
 async selectPokemonAsync(name){
  try {
    await PokemonService.selectPokemonAsync(name);
  } catch (error) {
    debugger;
    console.error(error);
    
  }
 }

 selectCaughtPokemon(id){
   PokemonService.selectCaughtPokemon(id);
 }
 async releaseAsync(){
   try {
     await PokemonService.releaseAsync();
   } catch (error) {
     debugger
     console.error(error)
   }
 }

 async getMyPokemonAsync() {
   try {
     await PokemonService.getMyPokemonAsync();
   } catch (error) {
    debugger;
    console.error(error);
    
  }
 }

 async catchAsync(){
try{
  await PokemonService.catchAsync()

}catch(error){
  debugger;
  console.error(error)
}

 }
}
