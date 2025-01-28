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
    responses: [],
  },
  {
    title: "Erreur de chargement de page",
    description: "La page de paiement ne se charge pas correctement.",
    status: "En cours",
    author: "Tim",
    createdAt: "2025-01-27",
    responses: [],
  },
  {
    title: "Problème de performance",
    description: "L'application est très lente lors du traitement des données.",
    status: "Résolu",
    author: "Amelie",
    createdAt: "2025-01-26",
    responses: [],
  },
  {
    title: "Bug d'affichage",
    description:
      "Les images ne s'affichent pas correctement sur la page d'accueil.",
    status: "Ouvert",
    author: "Paul",
    createdAt: "2025-01-25",
    responses: [],
  },
  {
    title: "Problème de sécurité",
    description:
      "Failles de sécurité détectées dans le système d'authentification.",
    status: "En cours",
    author: "Eva",
    createdAt: "2025-01-24",
    responses: [],
  },
];

app.get("/", (req, res) => {
  res.render("index", { issues: issues });
});

app.get("/create", (req, res) => {
  res.render("pages/create");
});

app.get("/issues/edit/:index", (req, res) => {
  const { index } = req.params;
  if (index < issues.length) {
    res.render("pages/edit", { issue: issues[index], index: index });
  } else {
    res.redirect("/");
  }
});

app.get("/issues/details/:index", (req, res) => {
  const { index } = req.params;
  if (index < issues.length) {
    res.render("pages/details", { issue: issues[index], index: index });
  } else {
    res.redirect("/");
  }
});

app.post("/issues/update/:index", (req, res) => {
  const { index } = req.params;
  const { title, description, status, author } = req.body;
  issues[index] = { ...issues[index], title, description, status, author };
  res.redirect("/");
});

app.post("/issues/create", (req, res) => {
  const { title, description, status, author } = req.body;
  const createdAt = new Date().toISOString().split("T")[0];
  issues.push({ title, description, status, author, createdAt, responses: [] });
  res.redirect("/");
});

app.post("/issues/delete", (req, res) => {
  const { index } = req.body;
  issues.splice(index, 1);
  res.redirect("/");
});

app.post("/issues/:index/responses/create", (req, res) => {
  const { index } = req.params;
  const { author, message } = req.body;
  const createdAt = new Date().toISOString().split("T")[0];
  if (index < issues.length) {
    issues[index].responses.push({ author, message, createdAt });
  }
  res.redirect(`/issues/details/${index}`);
});

app.post("/issues/:index/responses/delete/:responseIndex", (req, res) => {
  const { index, responseIndex } = req.params;
  if (index < issues.length && responseIndex < issues[index].responses.length) {
    issues[index].responses.splice(responseIndex, 1);
  }
  res.redirect(`/issues/details/${index}`);
});

app.get("/issues/:index/responses/edit/:responseIndex", (req, res) => {
  const { index, responseIndex } = req.params;
  if (index < issues.length && responseIndex < issues[index].responses.length) {
    const response = issues[index].responses[responseIndex];
    res.render("pages/editResponse", {
      issueIndex: index,
      responseIndex,
      response,
    });
  } else {
    res.redirect(`/issues/details/${index}`);
  }
});

app.post("/issues/:index/responses/update/:responseIndex", (req, res) => {
  const { index, responseIndex } = req.params;
  const { author, message } = req.body;
  if (index < issues.length && responseIndex < issues[index].responses.length) {
    issues[index].responses[responseIndex] = {
      ...issues[index].responses[responseIndex],
      author,
      message,
    };
  }
  res.redirect(`/issues/details/${index}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
