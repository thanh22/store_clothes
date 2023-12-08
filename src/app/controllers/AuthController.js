import  authServices from "../../services/AuthServices";
import user from "../../models/user";

class AuthController {
    register = async (req, res) => {
        try {
            const {email, password} = req.body;
            if (!email || !password) return res.status(400).json({
                err: 1,
                mes: 'email or password is required'
            })
            // console.log(req.body);
            const response = await authServices.register(req.body);
            // console.log('aa', userResult);
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                err: -1,
                mes: 'Iternal Server Error'
            })
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
            console.log(error);
            return res.status(500).json({
                err: -1,
                mes: 'Iternal Server Error'
            })
        }
    };
}

module.exports = new AuthController;