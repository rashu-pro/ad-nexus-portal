'use client'
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import verifyRecaptcha from "@/hooks/verifyRecaptcha";
import Button from "@/components/Button";

const Login = () => {
    const [recaptchaToken, setRecaptchaToken] = useState(null)

    const onCaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!recaptchaToken) {
            alert('Please complete the CAPTCHA!');
            return;
        }

        // Send the token to the backend for verification
        console.log('CAPTCHA token:', recaptchaToken);
        const isHuman = await verifyRecaptcha(recaptchaToken)
        console.log(isHuman)

        // Proceed with your login logic
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Other form fields */}
            <div className="mb-4">
                <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={onCaptchaChange} />
            </div>
            <Button type="submit">Login</Button>
        </form>
    );
};

export default Login;
