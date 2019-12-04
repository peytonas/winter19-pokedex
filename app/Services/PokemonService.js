import Store from "../store.js";
import store from "../store.js";
import Pokemon from "../Models/Pokemon.js";

// @ts-ignore
let _sandbox = axios.create({
  baseURL:'https://bcw-sandbox.herokuapp.com/api/Winter19/pokemon',
  timeout:3000
})

// @ts-ignore
let _pokeApi = axios.create({
  baseURL:'https://pokeapi.co/api/v2/pokemon',
  timeout:3000
})

class PokemonService {
  async catchAsync() {
    let activePokemon = store.State.activePokemon; 
    let res = await _sandbox.post("", activePokemon); 
    console.log("from catchAsycn", res); 
    store.commit("caughtPokemon", activePokemon)
    console.log("from store ", store.State.caughtPokemon);
    
  }

  async getMyPokemonAsync() {
    let res = await _sandbox.get("");
    store.commit("caughtPokemon", res.data.data)
    
    

  }


   async selectPokemonAsync(name) {
let res = await _pokeApi.get(name);
console.log("from select Pokemon res", res);
let theActivePokemon = new Pokemon(res.data);
store.commit("activePokemon", theActivePokemon);
console.log("from store", store.State.activePokemon);

  }  
  async getWildPokemonAsync(){
    let res = await _pokeApi.get('')
    store.commit("pokemon", res.data.results)
  
  }
  constructor(){
  }
}

const service = new PokemonService();
export default service;
