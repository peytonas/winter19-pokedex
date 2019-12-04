import Store from "../store.js";
import store from "../store.js";

let _sandbox = axios.create({
  baseURL:'https://bcw-sandbox.herokuapp.com/api/Winter19/pokemon',
  timeout:3000
})

let _pokeApi = axios.create({
  baseURL:'https://pokeapi.co/api/v2/pokemon',
  timeout:3000
})

class PokemonService {  
  async getWildPokemonAsync(){
    let res = await _pokeApi.get('')
    console.log("from api", res.data.results);
    store.commit("pokemon", res.data.results)
    console.log("from store", store.State.pokemon)
  }
  constructor(){
    console.log("hello from service")
  }
}

const service = new PokemonService();
export default service;
