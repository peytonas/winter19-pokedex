import PokemonService from "../Services/PokemonService.js";
import store from "../store.js";

//Private
function _drawPokemon() {
  let template= "";
  let pokemon = store.State.pokemon;
  pokemon.forEach(cur => template+= `<li>${cur.name}</li>`)
  console.log(pokemon);
}



//Public
export default class PokemonController {
  constructor() {
    store.subscribe("pokemon", _drawPokemon);
    console.log("hello from controller")
  }
  find () {}
}
