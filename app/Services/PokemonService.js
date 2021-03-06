import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Winter19/pokemon',
  timeout: 3000
})

// @ts-ignore
let _pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 3000
})

let page = 0;

class PokemonService {
  async releaseAsync() {
    let res = await _sandbox.delete(store.State.activePokemon._id);
    store.commit("activePokemon", {});
    this.getMyPokemonAsync();
  }
  selectCaughtPokemon(id) {
    let caughtPokemon = store.State.caughtPokemon.find(elem => elem._id == id);
    store.commit("activePokemon", caughtPokemon)
  }
  async catchAsync() {
    let activePokemon = store.State.activePokemon;
    let res = await _sandbox.post("", activePokemon);
    this.getMyPokemonAsync()
  }
  async getMyPokemonAsync() {
    let res = await _sandbox.get("");
    store.commit("caughtPokemon", res.data.data.map(pokemonData => new Pokemon(pokemonData))) // this takes pokemon pojos and turns them into pokemon
  }
  async selectPokemonAsync(name) {
    let res = await _pokeApi.get(name);
    let theActivePokemon = new Pokemon(res.data);
    store.commit("activePokemon", theActivePokemon);
    console.log(theActivePokemon);
  }
  async getWildPokemonAsync() {
    let res = await _pokeApi.get("?limit=13")
    store.commit("pokemon", res.data.results)
    store.commit("page", page)
  }
  async next() {
    page += 13
    let res = await _pokeApi.get("?limit=13&offset=" + page)
    // page += 13;
    store.commit("pokemon", res.data.results)
    store.commit("page", page)
  }
  async previous() {
    page = (page <= 13 ? 13 : page)
    page -= 13;
    let res = await _pokeApi.get("?limit=13&offset=" + page)
    store.commit("pokemon", res.data.results)
    store.commit("page", page)
  }
  async search(name) {
    let res = await _pokeApi.get(name)
    store.commit("pokemon", res.data.results)
  }
}


const service = new PokemonService();
export default service;
