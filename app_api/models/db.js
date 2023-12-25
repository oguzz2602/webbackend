var mongoose = require("mongoose");

var dbURI = "mongodb+srv://sinan:12345@mekanbul.jefan4s.mongodb.net/mekanbul";
//mongodb+srv://sinan:12345@mekanbul.jefan4s.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(dbURI);

// Bağlantı Olayları (Connection Events)
mongoose.connection.on("connected", () => {
  console.log(dbURI + " adresine bağlandı!");
});

mongoose.connection.on("error", () => {
  console.log("Bağlantı hatası!");
});

mongoose.connection.on("disconnected", () => {
  console.log("Bağlantı kesildi!");
});

process.on("SIGINT", () => {
  mongoose.connection.close();
  console.log("Bağlantı kapatıldı!");
  process.exit(0);
});

require("./venue")