'use server'
import Axios from "axios";

const verifyRecaptcha = async (recaptchaToken) => {
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
    const url = `https://www.google.com/recaptcha/api/siteverify`

    const response = await Axios.post(url, null, {
        params: {
            secret: SECRET_KEY,
            response: recaptchaToken,
        },
    });

    return response.data.success;
}

export default verifyRecaptcha
