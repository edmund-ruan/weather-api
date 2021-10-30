//blueprint/contructor function
const Weather = function(data) {
    this.data = data
    this.errors = []
}

//js prototypes to create new methods

Weather.prototype.validateUserInput = function() {
    if (this.data == "") {
        this.errors.push("Please enter the name of the city.")
    }
}

module.exports = Weather