import errors from "restify-errors"
import {User, Contract} from './models'
import hash from 'object-hash'
import bcrypt from 'bcrypt'
let actions = {}

actions.status = async (req, res, next) => {
  res.send({
    ok: true
  })
  next()
}

actions.getToken = async (req, res, next) => {
  if (!req.hasOwnProperty("body") || !req.body.hasOwnProperty("email") || !req.body.hasOwnProperty("password")) {
    res.send(403, { ok: false });
    return
  }

  let user = await User.findOne({
    "details.email": req.body.email
  })
  if (!user) {
    res.send(403, { ok: false });
    return;
  }

  console.log(user)
  if(!bcrypt.compareSync(req.body.password, user.password)) {
    res.send(403, { ok: false });
    return
  }

  let generateToken = new Promise(async (resolve, reject) => {
    let token = hash(user.details.email + new Date().getTime())
    let exists = await User.findOne({ token: token })
    if(exists)
      return generateToken();
    console.log(token)
    await User.findOneAndUpdate({ _id: user._id }, { token: token }).catch(err => reject(err))
    resolve(token);
  })
  let token = await generateToken.catch(err => new errors.ConflictError())
  res.send({
    ok: true,
    token: token
  })
  next()
}

actions.newAccount = async (req, res, next) => {
  console.log(req)
  let exists = await User.findOne({ email: req.body.email })
  if(exists) {
    next(new errors.ConflictError());
    return
  }
  let user = new User({
    details: {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      phone: req.body.phone,
      unicorns: 5000
    },
    password: bcrypt.hashSync(req.body.password, 10),
    token: null,
    setup: {}
  });
  await user.save().catch(err => {
    throw err
  })
  res.send({ok: true})
  next()
}

actions.getSetup = async (req, res, next) => {
  res.send({ok: true, setup: req.user.setup || {}});
  next();
}

actions.getDetails = async (req, res, next) => {
  res.send({ ok: true, details: req.user.details || {} });
  next();
};

actions.setSetup = async (req, res, next) => {
  await User.findOneAndUpdate({ email: req.user.email }, { setup: req.body.setup }).catch(err => {
    throw err
  })
  res.send({ok: true});
  next();
}

actions.newParticipation = async (req, res, next) => {
  let contract = await Contract.findOne({ _id: req.body.contract_id })
  if(contract.executed) {
    res.send(409, { ok: false });
    return
  }
  contract.participations.push({
    author_id: req.user._id,
    author_name: req.user.name,
    answer: req.body.answer,
    amount: req.body.amount
  })
  console.log(contract.participations);
  console.log("Participation:\n" + contract)
  await contract.save().catch(err => {
    throw err
  })
  res.send({ok: true});
  next();
}

actions.newContract = async (req, res, next) => {
  let contract = new Contract({
    title: req.body.title,
    code: req.body.code,
    ts_execution: req.body.ts_execution,
    author_id: req.user._id,
    author_name: req.user.details.name,
    participations: []
  });
  await contract.save().catch(err => {
    throw err;
  });
  res.send({ ok: true });
  next();
}

actions.getContracts = async (req, res, next) => {
  res.send({ok: true, contracts: await Contract.find({})});
  next();
}

actions.setStream = async (req, res, next) => {
  /* TODO */
  res.send({ok: true});
  next();
}

export default new Proxy(actions, {
  get: (target, name) => (req, res, next) => target[name](req, res, next).catch(err => {
    console.log(err)
    next(new errors.InternalServerError());
  })
})
