const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const clientesRoutes = require("./routes/clientesRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/clientes", clientesRoutes);

app.get("/", (req, res) => res.send("API Serasa rodando"));

if (app._router && app._router.stack) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log("Rota registrada:", middleware.route.path);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log("Rota registrada:", handler.route.path);
        }
      });
    }
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));



