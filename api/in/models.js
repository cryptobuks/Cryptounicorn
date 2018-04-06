import mongoose from './db'

let User = mongoose.model("User", {
  details: {
    name: mongoose.SchemaTypes.String,
    surname: mongoose.SchemaTypes.String,
    email: mongoose.SchemaTypes.String,
    phone: mongoose.SchemaTypes.String,
    unicorns: mongoose.SchemaTypes.Number
  },
  password: mongoose.SchemaTypes.String,
  token: mongoose.SchemaTypes.String,
  setup: mongoose.SchemaTypes.Mixed
});

let Contract = mongoose.model("Contract", {
  title: mongoose.SchemaTypes.String,
  code: mongoose.SchemaTypes.String,
  ts_execution: mongoose.SchemaTypes.Number,
  author_id: mongoose.SchemaTypes.String,
  author_name: mongoose.SchemaTypes.String,
  participations: mongoose.SchemaTypes.Array,
  executed: mongoose.SchemaTypes.Boolean,
  outcome: mongoose.SchemaTypes.Mixed
});

export {User, Contract}
