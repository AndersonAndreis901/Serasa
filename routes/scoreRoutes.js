const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

router.get("/historico/:cpf_cnpj", scoreController.historicoScore);
router.post("/consultar", scoreController.consultarScore);

module.exports = router;
