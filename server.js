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
