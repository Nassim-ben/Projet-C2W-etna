const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

const UsersSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
	email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true
  },
  birthday: Date,
  adresse: String,
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  }
}, { timestamps: true });

UsersSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

module.exports= mongoose.model("Users", UsersSchema);