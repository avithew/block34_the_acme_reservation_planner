const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  createReservation,
  destroyReservation,
} = require("./db");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/customers", async (req, res, next) => {
  try {
    res.send(await fetchCustomers());
  } catch (ex) {
    next(ex);
  }
});
app.get("/api/restaurants", async (req, res, next) => {
  try {
    res.send(await fetchRestaurants());
  } catch (ex) {
    next(ex);
  }
});
app.get("/api/reservations", async (req, res, next) => {
  try {
    res.send(await fetchReservations());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    res
      .status(201)
      .send(
        await createReservation(
          req.body.date,
          req.body.party_count,
          req.body.restaurant_id,
          req.params.id
        )
      );
  } catch (ex) {
    next(ex);
  }
});

app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      await destroyReservation(req.params.id, req.params.customer_id);
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  }
);

const init = async () => {
  client.connect();
  console.log("connected to database");
  createTables();
  const [leo, alex, tyler, sky] = await Promise.all([
    createCustomer("Leo"),
    createCustomer("Alex"),
    createCustomer("Tyler"),
    createCustomer("Sky"),
  ]);
  const [sushi_haven, bella_cucina, ocean_bistro] = await Promise.all([
    createRestaurant("Sushi Haven"),
    createRestaurant("La Bella Cucina"),
    createRestaurant("Blue Ocean Bistro"),
  ]);
  const [] = await Promise.all([
    createReservation("02/03/2021", 4, sushi_haven.id, sky.id),
    createReservation("02/15/2021", 3, bella_cucina.id, alex.id),
  ]);
  app.listen(port, () => {
    console.log("listening to port: ", port);
  });
};

init();
