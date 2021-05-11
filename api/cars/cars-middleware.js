const yup = require("yup");
const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const IdValidation = await Cars.getById(req.params.id);
    if (!IdValidation) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const carSchema = yup.object({
  vin: yup.string().required(),
  make: yup.string().required(),
  model: yup.string().required(),
  mileage: yup.string().required(),
  title: yup.string(),
  transmission: yup.string(),
});

const checkCarPayload = async (req, res, next) => {
  try {
    const bodyValidation = await carSchema.validate(req.body, { stripUnknown: true });
    req.body = bodyValidation;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

const checkVinNumberValid = async (req, res, next) => {
  try {
    const isValid = await vinValidator.validate(req.body.vin);
    if (isValid) {
      next();
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vinIsUnique = await Cars.getByVin(req.body.vin);
    if (vinIsUnique) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const errorHandler = (err, req, res, next /*eslint-disable-line */) => {
  res.status(err.status || 500).json({
    note: "Houston, We have a problem!",
    message: err.message,
    stack: err.stack,
  });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  errorHandler,
};
