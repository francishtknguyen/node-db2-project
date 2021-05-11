const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("./cars-middleware");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  Cars.getAll()
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next);
});

router.get("/:id", checkCarId, (req, res, next) => {
  Cars.getById(req.params.id)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(next);
});

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
  Cars.create(req.body)
    .then((newCar) => {
      res.status(200).json(newCar);
    })
    .catch(next);
});

module.exports = router;
