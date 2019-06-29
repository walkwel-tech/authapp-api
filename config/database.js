let mongoose = require("mongoose");

let connect = () => {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
    console.log(`Database connected`);
  });
};

connect();

module.exports = mongoose;
