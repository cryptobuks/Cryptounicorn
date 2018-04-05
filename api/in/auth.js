import {User} from './models'
import bcrypt from "bcrypt";

export default {
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
