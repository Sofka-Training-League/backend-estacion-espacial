import Express from "express";
import {
  consultarTodosLosTipo,
  crearTipo,
  editarTipo,
  eliminarTipo,
  consultarTipo,
} from "../../controllers/tipos/controller.js";

const rutasTipo = Express.Router();

const generaCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send("Error consultando los tipos de naves espaciales");
  } else {
    res.json(result);
  }
};

rutasTipo.route("/tipos").get((req, res) => {
  console.log("alguien hizo get en la ruta /tipos");
  consultarTodosLosTipo(generaCallback(res));
});

rutasTipo.route("/tipos").post((req, res) => {
  console.log("alguien hizo post en la ruta /tipos");
  crearTipo(req.body, generaCallback(res));
});

rutasTipo.route("/tipos/:id").get((req, res) => {
  console.log("alguien hizo get en la ruta /tipos");
  consultarTipo(req.params.id, generaCallback(res));
});

rutasTipo.route("/tipos/:id").patch((req, res) => {
  editarTipo(req.params.id, req.body, generaCallback(res));
});

rutasTipo.route("/tipos/:id").delete((req, res) => {
  eliminarTipo(req.params.id, generaCallback(res));
});

export default rutasTipo;
