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



//Public
export default class PokemonController {
  constructor() {
    store.subscribe("pokemon", _drawPokemon);
    _drawPokemon();
    PokemonService.getWildPokemonAsync();
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
}
