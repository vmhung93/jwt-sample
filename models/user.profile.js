const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaOptions = { timestamps: true };

const schema = new Schema(
  {
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  schemaOptions
);

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // Remove these props when object is serialized
    delete ret._id;
  },
});

module.exports = mongoose.model("UserProfile", schema);
