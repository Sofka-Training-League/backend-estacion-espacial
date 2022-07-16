import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";
import jwt_decode from "jwt-decode";

const consultarTodosLosTipo = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("tiposNave")
    .find({})
    .limit(50)
    .toArray(callback);
};

const crearTipo = async (datosTipoNave, callback) => {
  if (
    Object.keys(datosTipoNave).includes("nombre") &&
    Object.keys(datosTipoNave).includes("descripcion") &&
    Object.keys(datosTipoNave).includes("imagen") &&
    Object.keys(datosTipoNave).includes("estado")
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos
      .collection("tiposNave")
      .insertOne(datosTipoNave, callback);
  } else {
    return "error";
  }
};

const consultarTipo = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("tiposNave")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const editarTipo = async (id, edicion, callback) => {
  const filtroTipo = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("tiposNave")
    .findOneAndUpdate(
      filtroTipo,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarTipo = async (id, callback) => {
  const filtroTipo = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("tiposNave").deleteOne(filtroTipo, callback);
};

export {
  consultarTodosLosTipo,
  crearTipo,
  consultarTipo,
  editarTipo,
  eliminarTipo,
};
