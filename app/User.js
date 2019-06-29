let model = require("../config/database").model;
let bcrypt = require("bcrypt");

let UserSchema = require("../database/Schema/UserSchema");

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.passwordMatch = function(userpassword) {
  return bcrypt.compareSync(userpassword, this.password);
};

let User = model("User", UserSchema);

module.exports = User;
