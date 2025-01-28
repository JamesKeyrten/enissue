const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const issues = [
  {
    title: "Problème de connexion",
    description:
      "L'utilisateur ne peut pas se connecter avec ses identifiants.",
    status: "Ouvert",
    author: "Alice",
    createdAt: "2025-01-28",
  },
  {
    title: "Erreur de chargement de page",
    description: "La page de paiement ne se charge pas correctement.",
    status: "En cours",
    author: "Tim",
    createdAt: "2025-01-27",
  },
  {
    title: "Problème de performance",
    description: "L'application est très lente lors du traitement des données.",
    status: "Résolu",
    author: "Amelie",
    createdAt: "2025-01-26",
  },
  {
    title: "Bug d'affichage",
    description:
      "Les images ne s'affichent pas correctement sur la page d'accueil.",
    status: "Ouvert",
    author: "Paul",
    createdAt: "2025-01-25",
  },
  {
    title: "Problème de sécurité",
    description:
      "Failles de sécurité détectées dans le système d'authentification.",
    status: "En cours",
    author: "Eva",
    createdAt: "2025-01-24",
  },
];

app.get("/", (req, res) => {
  res.render("index", { issues: issues });
});

app.get("/page1", (req, res) => {
  res.render("pages/page1");
});

app.post("/issues/create", (req, res) => {
  const { title, description, status, author } = req.body;
  const createdAt = new Date().toISOString().split("T")[0];
  issues.push({ title, description, status, author, createdAt });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
