const express = require("express");
const app = express();
var router = express.Router();
var bodyParser = require("body-parser");
const func = require("./functions");
const port = 3000;

const RACK_LIMIT = 100;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.end("Server Working");
});

app.post("/", async (req, res) => {
  const { qty, sku } = req.body;

  const rackDetails = await func.getCrntStock();

  let suggestedRacks = [];
  let blncQty = qty;

  for (const rack of rackDetails) {
    if (rack.stock < RACK_LIMIT && blncQty) {
      const sgstdQty = await func.sugstRackQty(rack.stock, blncQty, RACK_LIMIT);

      suggestedRacks.push({
        sku,
        qty: sgstdQty,
        rack: rack.id,
      });

      blncQty = blncQty - sgstdQty;
    }
  }

  res.json(suggestedRacks);
});

app.post("/save-stock", async (req, res) => {
  const data = req.body.map((row) => {
    return Object.keys(row).map(function (key) {
      return row[key];
    });
  });

  const result = await func.saveStock(data);
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log("Sever working on port 3000");
});
