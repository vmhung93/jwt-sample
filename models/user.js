const mongoose = require("mongoose");
const mongoosePaginate = require("../db/mongoose.paginate");

const Schema = mongoose.Schema;

const schemaOptions = { timestamps: true };

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String },
    roles: [String],
    profile: { type: Schema.Types.ObjectId, ref: "UserProfile" },
  },
  schemaOptions
);

schema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // Remove these props when object is serialized
    delete ret._id;
    delete ret.passwordHash;
  },
});

// Add plugin to schema
schema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", schema);
