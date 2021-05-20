import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv'

dotenv.config();

const sendGridAPIKey = process.env.SENDGRID_API_KEY;    // API Key for sendGrid API
const email = process.env.EMAIL;    // EMAIL used to send Emails

sgMail.setApiKey(sendGridAPIKey);

// Send Welcome Email to new User
export const sendWelcomeEmail = (userEmail, userName) => {
    sgMail.send({
        to: userEmail,
        from: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${userName}. Let me know how you get along with the app`
    });
}

// Send Cancelation Email to User
export const sendCancelationEmail = (userEmail, userName) => {
    sgMail.send({
        to: userEmail,
        from: email,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${userName}! I hope to see you back sometime soon. Is there anything we could have done different?`
    });
}