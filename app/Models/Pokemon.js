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
          <a href="#" class="btn btn-primary">Catch Em'</a>
        </div>
      </div>`
    }


}