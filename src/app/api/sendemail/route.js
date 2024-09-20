import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Named export for POST request
export async function POST(request) {
  try {
    const functions = require('firebase-functions');

    const emailUser = functions.config().email.user;
    const emailPassword = functions.config().email.password;
    // Parse the incoming JSON data
    const { firstname, lastname, phone, email, message } = await request.json();

    // Configure the email transporter using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,  // Use environment variables
        pass: emailPassword,  // Use environment variables
      },
    });

    // Email options
    const mailOptions = {
      from: emailUser,   // Sender email address
      to: 'muntazimalikhan@gmail.com', // Recipient email address
      subject: 'Enquiry Submission',
      text: `Name: ${firstname} ${lastname}\nPhone: ${phone}\nEmail: ${email}\nQuery Message: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    // Handle errors
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
}
