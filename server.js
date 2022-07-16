import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD } from "./db/db.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

import rutasTipo from "./views/tipos/rutas.js";
import rutasUsuario from "./views/usuarios/rutas.js";

dotenv.config({ path: "./.env" });

const app = Express();

const PORT = process.env.PORT || 5000;

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.A0_API_JWKSURI,
  }),
  audience: process.env.A0_API_AUDIENCE,
  issuer: process.env.AO_APP_ISSUER,
  algorithms: [process.env.A0_API_ALGORITHMS],
});

// app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.use(rutasTipo);
app.use(rutasUsuario);

const main = () => {
  return app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${process.env.PORT}`);
  });
};

conectarBD(main);
