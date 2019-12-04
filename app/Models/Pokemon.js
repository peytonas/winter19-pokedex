export default class Pokemon {
    constructor(data) {
        this._id = data._id
        this.name = data.name
        this.img = data.img || data.sprites.front_default
        this.weight = data.weight
        this.height = data.height
        this.types = data.types
    }
    get Template()  {
        return
    }
}