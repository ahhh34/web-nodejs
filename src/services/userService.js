import { hash } from "bcryptjs";
import db from "../models/index";
import bcrypt from 'bcrypt';


let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {

                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errmessage = "ok";

                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errmessage = "password not true";

                    }
                } else {
                    userData.errCode = 2;
                    userData.errmessage = 'user not found';
                }

            } else {
                userData.errCode = 1;
                userData.errmessage = 'email dosent exit. try other'

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        }
        catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = 'acd';

            if (userId === 'ALL') {
                users = await db.User.findAll({

                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })



            }

            resolve(users)

        } catch {
            reject(e)

        }


    })

}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,

}