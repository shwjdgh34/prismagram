import dotenv from 'dotenv';
import path from 'path';
import { nouns, adjectives } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * nouns.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'nossi@prismagram.com',
    to: address,
    subject: 'Login Secret for Prisma',
    html: `Hello! your Secret is <strong>${secret}</strong>.<br/>Copy and Paste on the app/webite to login`
  };
  return sendMail(email);
};
