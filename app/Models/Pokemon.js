export default class Pokemon {
  constructor(data) {
    this._id = data._id || ""
    this.name = data.name
    this.img = data.img || data.sprites.front_default
    this.weight = data.weight
    this.height = data.height
    this.types = data.types
  }
  get Template() {
    let template = `
        <div class="card bg-dark text-white border" style="width: 18rem;">
        <img src="${this.img}" class="card-img-top" alt="${this.name} sprite">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <div class="card-text">Weight: ${this.weight}</div>
          <div class="card-text">Height: ${this.height}'</div>
          `
    if (this._id) {
      template += `<button class="btn btn-danger mt-1" onclick="app.pokemonController.releaseAsync()">Release 'Em</button>`

    } else {
      template += `<button class="btn btn-primary mt-1" onclick="app.pokemonController.catchAsync()">Catch 'Em</button>`
    }
    template += `</div>
      </div>`
    return template;
  }

}