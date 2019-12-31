import PokemonService from "../Services/PokemonService.js";
import store from "../store.js";

//Private
function _drawPokemon() {
  let template = "";
  let pokemon = store.State.pokemon;
  // NOTE  these are all POJO's since there isnt much data and so we create our template here! 
  pokemon.forEach(cur => template += `<h5 onclick="app.pokemonController.selectPokemonAsync('${cur.name}')">${cur.name}</h5>`)
  document.getElementById('pokemon-list').innerHTML = template
}

function _drawActivePokemon() {
  let pokemon = store.State.activePokemon;
  document.getElementById('card').innerHTML = pokemon.Template
}

function _drawCaptured() {
  let template = "";
  let caughtPokemon = store.State.caughtPokemon;
  caughtPokemon.forEach(cur => template += `<li onclick="app.pokemonController.selectCaughtPokemon('${cur._id}')">${cur.name}</li>`)
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
  }
  async next() {
    try {
      store.subscribe("pokemon", _drawPokemon);
      await PokemonService.next()
      _drawPokemon();
    } catch (error) {
      console.error(error)
    }
  }
  async previous() {
    try {
      store.subscribe("pokemon", _drawPokemon);
      await PokemonService.previous()
      _drawPokemon();
    } catch (error) {
      console.error(error)
    }
  }
  async selectPokemonAsync(name) {
    try {
      await PokemonService.selectPokemonAsync(name);
    } catch (error) {
      console.error(error);
    }
  }
  async search(name) {
    try {
      await PokemonService.search(name);
      _drawPokemon()
    } catch (error) {
      console.error(error);
    }
  }
  selectCaughtPokemon(id) {
    PokemonService.selectCaughtPokemon(id);
  }
  async releaseAsync() {
    // @ts-ignore
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,
    })
    // @ts-ignore
    Swal.fire({
      title: 'Are you sure you want to release ' + store.State.activePokemon.name + "?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3661a7',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        try {
          PokemonService.releaseAsync();
        } catch (error) {
          console.error(error)
        }
        toast.fire({
          icon: 'success',
          title: 'Goodbye, ' + store.State.activePokemon.name + "!"
        })
      }
    })
  }
  async getMyPokemonAsync() {
    try {
      await PokemonService.getMyPokemonAsync();
    } catch (error) {
      console.error(error);
    }
  }
  async catchAsync() {
    // @ts-ignore
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: false,
    })
    try {
      await PokemonService.catchAsync()
    } catch (error) {
      console.error(error)
    }
    toast.fire({
      icon: 'success',
      title: 'You caught a ' + store.State.activePokemon.name + "!"
    })
  }
}
