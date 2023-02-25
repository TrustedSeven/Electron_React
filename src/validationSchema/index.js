import Joi from "joi";

export const CardDetailValidationSchema = Joi.object({
  profileName: Joi.string().required().label("Enter Valid profile Name"),
  cardName: Joi.string().required().label("Enter Valid Card Holder Name"),
  cardNumber: Joi.string()
    .required()
    .label("Card Number should contain at least 16 digits"),
  cardCVV: Joi.string()
    .required()
    .pattern(new RegExp("^[0-9]{3,3}$"))
    .label("Valid Card CVV Contain at least 3 digit"),
  cardExpiryMonth: Joi.string().required().label("Select valid Month"),
  cardExpiryYear: Joi.number().required().label("Select valid Year"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "in", "co"] },
    })
    .required()
    .label("Enter Valid Email"),
  phone: Joi.string().required().label("Enter Phone"),
});

export const ShippingSchema = Joi.object({
  fName: Joi.string().required().label("Enter Valid profile Name"),
  lName: Joi.string().required().label("Enter Valid profile Name"),
  address1: Joi.string().required().label("Enter Valid address1"),
  address2: Joi.optional(),
  city: Joi.string().required().label("Enter Valid City"),
  province: Joi.string().required().label("Enter Valid Province"),
  postalCode: Joi.required().label("Select valid Year"),
  country: Joi.string().required().label("Select country"),
});

export const TaskSchema = Joi.object({
  keyword: Joi.string().required().label("Enter Valid Keyword"),
  profile: Joi.array().required().label("Select Profile"),
  mode: Joi.string().required().label("Select Mode"),
  scheduleStart: Joi.string().label("Select Schedule Start"),
  scheduleStop: Joi.string().label("Select Schedule Stop"),
  filterID: Joi.string().required().label("Enter Valid FilterID"),
  status: Joi.optional(),
  size: Joi.optional(),
  proxy: Joi.optional(),
  isScheduleStart: Joi.optional(),
  isScheduleStop: Joi.optional(),
});

export const TaskGroupSchema = Joi.object({
  taskGroupName: Joi.string().required().label("Enter Group Name "),
  taskSite: Joi.string().required().label("Select Site"),
  taskProxy: Joi.array().required().label("Select task Proxy"),
  monitorProxy: Joi.array().required().label("Select monitor Proxy"),
  monitorDelay: Joi.optional(),
  errorDelay: Joi.optional(),
  taskTable: Joi.optional(),
});
