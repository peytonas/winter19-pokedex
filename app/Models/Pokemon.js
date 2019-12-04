export default class Pokemon {
    constructor(data) {
        this._id = data.id
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }
    get Template()  {
        return `
        <div class="card" style="width: 18rem;">
        <img src="${this.img}" class="card-img-top" alt="${this.name} sprite">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">Weight: ${this.weight}</p>
          <p class="card-text">Height: ${this.height}</p>
          <button class="btn btn-primary" onclick="app.pokemonController.catchAsync()">Catch Em'</button>
        </div>
      </div>`
    }


}