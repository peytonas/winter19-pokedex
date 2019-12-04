import PokemonService from "../Services/PokemonService.js";
import store from "../store.js";

//Private
function _drawPokemon() {
  let pokemon = store.State.pokemon;
  console.log(pokemon);
}

//Public
export default class PokemonController {
  constructor() {
    store.subscribe("pokemon", _drawPokemon);
  }
}
