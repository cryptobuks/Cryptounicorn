import {User} from './models'
import bcrypt from "bcrypt";

export default {
  basic: (email, password, done) => {
      let user = User.findOne({
        email: email,
        password: bcrypt.hashSync(password, 10)
      })
        .then(user => done(null, user))
        .catch(err => console.log(err));
    },

  bearer: (token, done) => {
    if(token == null) {
      done(null, false)
      return
    }
    let user = User.findOne({ token: token })
    .then(user => done(null, user))
    .catch(err => console.log(err))
  }
}
