const {
  client,
  createTables,
  //   createCustomer,
  //   createRestaurant,
  //   fetchCustomers,
  //   fetchRestaurants,
  //   createReservation,
  //   destroyReservation,
} = require("./db");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/customers", async (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
});
app.get("/api/restaurants", async (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
});
app.get("/api/reservations", async (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
  } catch (ex) {
    next(ex);
  }
});

app.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
    } catch (ex) {
      next(ex);
    }
  }
);

const init = async () => {
  client.connect();
  console.log("connected to database");
  createTables();
};

init();
