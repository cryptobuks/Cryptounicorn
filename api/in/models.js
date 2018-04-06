import mongoose from './db'

let User = mongoose.model("User", {
  details: {
    name: mongoose.SchemaTypes.String,
    surname: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    phone: mongoose.SchemaTypes.String
  },
  password: mongoose.SchemaTypes.String,
  token: mongoose.SchemaTypes.String,
  setup: mongoose.SchemaTypes.Mixed
})

let Contract = mongoose.model("Contract", {
  code: mongoose.SchemaTypes.String,
  ts_execution: mongoose.SchemaTypes.Number,
  author_id: mongoose.SchemaTypes.String,
  author_name: mongoose.SchemaTypes.String,
  participations: mongoose.SchemaTypes.Mixed
});

export {User, Contract}
