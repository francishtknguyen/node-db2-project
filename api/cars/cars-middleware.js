const yup = require("yup");
const Cars = require("./cars-model");

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

const checkVinNumberValid = async (req, res, next) => {};

const checkVinNumberUnique = (req, res, next) => {};

module.exports = { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid };
