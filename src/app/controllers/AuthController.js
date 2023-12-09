import  authServices from "../../services/AuthServices";
import { internalServerError } from "../middlewares/HanddleErrors"
import user from "../../models/user";

class AuthController {
    register = async (req, res) => {
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).json({
                err: 1,
                mes: 'email or password is required'
            })
            const response = await authServices.register(req.body);

            return res.status(200).json(response);
        } catch (error) {
            return internalServerError(res);
        }
    };

    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).json({
                err: 1,
                mes: 'email or password is required'
            })
            const response = await authServices.login(req.body);

            return res.status(200).json(response);
        } catch (error) {
            return internalServerError(res);
        }
    };
}

module.exports = new AuthController;