const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});

//Get Request for a Random Quote
app.get("/api/quotes/random", (req, res) => {
  let randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

//Get Request for all quotes or per Author
app.get("/api/quotes", (req, res) => {
  const filterByPerson = quotes.filter((author) => {
    return author.person === req.query.person;
  });

  if (req.query.person) {
    res.send({ quotes: filterByPerson });
  } else {
    res.send({ quotes });
  }
});

//POST method to add a quote
app.post("/api/quotes", (req, res) => {
  const newQuote = req.query.quote;
  const newPerson = req.query.person;
  const body = {
    quote: newQuote,
    person: newPerson,
  };

  if (newQuote && newPerson) {
    quotes.push(body);
    res.status(201).send({ quote: body });
  } else {
    res.status(400).send();
  }
});
