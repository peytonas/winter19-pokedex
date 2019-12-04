import Store from "../store.js";

let _sandbox = axios.create({
  baseURL:'https://bcw-sandbox.herokuapp.com/api/Winter19/pokemon',
  timeout:3000
})

let _pokeApi = axios.create({
  baseURL:'https://pokeapi.co/api/v2/pokemon',
  timeout:3000
})

class PokemonService {

  constructor(){
    console.log("hello from service")
  }
}

const service = new PokemonService();
export default service;
