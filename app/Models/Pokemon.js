export default class Pokemon {
  constructor(data) {
    this._id = data._id || ""
    this.name = data.name
    this.img = data.img || data.sprites.front_default
    this.weight = (Math.floor(data.weight * .220462))
    this.height = (Math.floor(data.height * .308084))
    // this.type1 = data.types[0].type.name
    // this.type2 = data.types[1].type.name
  }
  get Template() {
    let template = `
        <div class="card bg-dark text-white border" style="width: 18rem;">
        <img src="${this.img}" class="card-img-top" alt="${this.name} sprite">
        <div class="card-body">
          <h1 class="card-title">${this.name}</h1>
          <div class="card-text">Height: ${this.height} ft</div>
          <div class="card-text">Weight: ${this.weight} lbs</div>
          `
    if (this._id) {
      template += `<button class="button mt-1" onclick="app.pokemonController.releaseAsync()">Release 'Em</button>`

    } else {
      template += `<button class="button mt-1" onclick="app.pokemonController.catchAsync()">Catch 'Em</button>`
    }
    template += `</div>
      </div>`
    return template;
  }

}