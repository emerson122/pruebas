const express = require("express");
const mysql = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
//Autor Emerson Ramos
//MIDDLEWARE
//middleware para asegurarse de que el token pertence a htours
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearetoken = bearer[1];
    req.token = bearetoken;
    next();
  } else {
    res.sendStatus(403); //acceso prohibido
  }
}

// LEER TODA LA TABLA
router.get("/", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const sql = `Call PRC_PERSONAS('', '', 0, '', '', '', '', '', 4, 0)`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudieron Obtener los datos");
          }
        });
        console.log("Datos Leidos Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `Call PRC_PERSONAS('', '', 0, '', '', '', '', '', 5, ${cod});`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudieron Obtener los datos");
          }
        });
        console.log("Datos Leidos Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
      }
    });
  } catch (error) {
    res.send(error);
  }
});
// buscar personas por usuario
router.post("/usuarios", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objuserper = {
          USUARIO: req.body.USER,
        };
        const sql = `Call PRC_PERSONAS('${objuserper.USUARIO}', '', 0, '', '', '', '', '', 6, 0);`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudieron Obtener los datos");
          }
        });
        console.log("Datos Leidos Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// traer usuarios
router.get("/buscar/list_usuarios", ensureToken,(req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
       
        const sql = `call PRC_PERSONAS('', '', 0, '', '', '', '', '', '7', 0);`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            res.json(results[0]);
          } else {
            res.send("No se pudieron Obtener los datos");
          }
        });
        console.log("Datos Leidos Correctamente"); //confirmación en Consola posteriormente se debe eliminar en produccion
      }
    });
  } catch (error) {
    res.send(error);
  }
});

// INSERTAR
router.post("/insertar", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const objpersonas = {
          USUARIO: req.body.USUARIO,
          SEX_PERSONA: req.body.SEX_PERSONA,
          EDA_PERSONAL: req.body.EDA_PERSONAL,
          TIP_PERSONA: req.body.TIP_PERSONA,
          Num_Identidad: req.body.Num_Identidad,
          IND_CIVIL: req.body.IND_CIVIL,
          TELEFONO: req.body.TELEFONO,
          TIP_TELEFONO: req.body.TIP_TELEFONO,
        };
        const sql = `CALL PRC_PERSONAS('${objpersonas.USUARIO}','${objpersonas.SEX_PERSONA}',${objpersonas.EDA_PERSONAL} , '${objpersonas.TIP_PERSONA}', '${objpersonas.Num_Identidad}','${objpersonas.IND_CIVIL}','${objpersonas.TELEFONO}','${objpersonas.TIP_TELEFONO}',1, 0)`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos insertados");
        });
      }
    });
    console.log("Datos insertados Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});

//ACTUALIZAR
router.put("/actualizar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const objpersonas = {
          USUARIO: req.body.USUARIO,
          SEX_PERSONA: req.body.SEX_PERSONA,
          EDA_PERSONAL: req.body.EDA_PERSONAL,
          TIP_PERSONA: req.body.TIP_PERSONA,
          Num_Identidad: req.body.Num_Identidad,
          IND_CIVIL: req.body.IND_CIVIL,
          TELEFONO: req.body.TELEFONO,
          TIP_TELEFONO: req.body.TIP_TELEFONO,
        };
        const sql = `CALL PRC_PERSONAS('${objpersonas.USUARIO}','${objpersonas.SEX_PERSONA}',${objpersonas.EDA_PERSONAL} , '${objpersonas.TIP_PERSONA}', '${objpersonas.Num_Identidad}','${objpersonas.IND_CIVIL}','${objpersonas.TELEFONO}','${objpersonas.TIP_TELEFONO}',2, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos Actualizados");
        });
      }
    });
    console.log("Datos insertados Correctamente"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});

//Eliminación Lógica
router.put("/delete/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
     
        const sql = `CALL PRC_PERSONAS('','',0, '', '','','','',8, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Desactivado Logico ");
        });
      }
    });
    console.log("Datos Desactivado"); //confirmacion en Consola posteriormente se debe eliminar en produccion
  } catch (error) {
    res.send(error);
  }
});


//ELIMINAR
router.delete("/eliminar/:cod", ensureToken, (req, res) => {
  try {
    jwt.verify(req.token, process.env.JWT, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { cod } = req.params;
        const sql = `Call PRC_PERSONAS('', '', 0, '', '', '', '', '', 3, ${cod})`;
        mysql.query(sql, (error, results) => {
          if (error) throw error;
          res.send("Datos Eliminados");
        });

        console.log("Datos Eliminados Correctamente");
      }
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
