import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthServices {
    register = ({email, password}) => new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { email: email },
                defaults: {
                  email,
                  password: bcrypt.hashSync(password, 10)
                }
              });
            const token = response[1] ? jwt.sign(
                            {id: response[0].id, email: response[0].email}, 
                            process.env.JWT_SECRET, 
                            { expiresIn: '5d' }
                        ) : null;
            resolve({
                err: token ? 0 : 1,
                mes: token ? 'Register is successfully' : response ? 'Password is wrong' : 'Email is wrong',
                'access_token': `Beaser ${token}`
            });
    
            resolve({
                err: 0,
                mes: 'register service'
            })
        } catch (error) {
            reject(error);
        }
    });

    login = ({email, password}) => new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOne({
                where: { email: email },
                // raw: true // tra ve mot object
            });
            let isChecked = response && bcrypt.compareSync(password, response.dataValues.password);
            const token = isChecked ? 
                        jwt.sign(
                            {id: response.id, email: response.email}, 
                            process.env.JWT_SECRET, 
                            { expiresIn: '5d' }
                        ) : null;
            // const token = response[1] ? jwt.sign(
            //                 {id: response[0].id, email: response[0].email}, 
            //                 process.env.JWT_SECRET, 
            //                 { expiresIn: '5d' }
            //             ) : null;
            resolve({
                err: response ? 0 : 1,
                mes: response ? 'Login is successfully' : 'Error',
                'access_token': `Beaser ${token}`
            });
    
            resolve({
                err: 0,
                mes: 'register service'
            })
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = new AuthServices;