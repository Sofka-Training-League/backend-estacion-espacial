import express from "express";

const app = express();

//settings
app.set("port", 5000);

//routes
app.get("/", (req, res) => {
  res.send("Reto técnico: Training League Sofka");
});

app.listen(app.get("port"), () => {
  console.log(`Servidor conectado en el puerto ${app.get("port")}`);
});
