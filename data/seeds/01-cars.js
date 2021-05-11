const cars = [
  { vin: "11111111111111111", make: "Honda", model: "Civic", mileage: 100000 },
  { vin: "11111111111111112", make: "Ford", model: "Bronco", mileage: 10000 },
  { vin: "11111111111111113", make: "Tesla", model: "Model X", mileage: 50000 },
  { vin: "11111111111111114", make: "BMW", model: "750LI", mileage: 20000 },
  { vin: "11111111111111115", make: "Toyota", model: "Supra", mileage: 30000 },
  { vin: "11111111111111116", make: "Toyota", model: "Prius", mileage: 70000 },
  { vin: "11111111111111117", make: "Mercedes", model: "G-Class", mileage: 5000 },
  { vin: "11111111111111118", make: "Lamborghini", model: "Aventador SVJ", mileage: 1 },
  { vin: "11111111111111119", make: "Porsche", model: "Macan", mileage: 10000 },
  { vin: "11111111111111120", make: "Dodge", model: "1500", mileage: 30000 },
];

exports.cars = cars;

exports.seed = async function (knex) {
  await knex("cars").truncate();

  await knex("cars").insert(cars);
};
