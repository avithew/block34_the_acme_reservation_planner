const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_reservation_db"
);
const uuid = require("uuid");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS customers CASCADE;
    DROP TABLE IF EXISTS restaurants CASCADE;
    DROP TABLE IF EXISTS reservations CASCADE;
    CREATE TABLE customers(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE
    );
    CREATE TABLE restaurants(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE
    );
    CREATE TABLE reservations(
        id UUID PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
        customer_id UUID REFERENCES customers(id) NOT NULL
    );
    `;
  client.query(SQL);
};

module.exports = {
  client,
  createTables,
  //   createCustomer,
  //   createRestaurant,
  //   fetchCustomers,
  //   fetchRestaurants,
  //   createReservation,
  //   destroyReservation,
};
