const mysql = require("mysql");
const util = require("util");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stock",
});

// node native promisify
const query = util.promisify(conn.query).bind(conn);

exports.getCrntStock = async () => {
  return (async () => {
    try {
      const rows = await query(
        "SELECT a.id, a.name, SUM(b.qty) as stock FROM racks a LEFT JOIN stock b ON a.id = b.rack GROUP BY a.id ORDER BY a.id ASC"
      );

      return rows;
    } catch (e) {
      return e;
    } finally {
      conn.end();
    }
  })();
};

exports.sugstRackQty = async (crntQty, newQty, maxQty) => {
  const avlblSpace = maxQty - crntQty;

  const posssibleQty = newQty < avlblSpace ? newQty : avlblSpace;

  return posssibleQty;
};

exports.saveStock = async (data) => {
  return (async () => {
    try {
      await query("INSERT INTO stock (rack, qty, sku) VALUES ?", [data]);

      return true;
    } catch (e) {
      return e;
    } finally {
      conn.end();
    }
  })();
};
