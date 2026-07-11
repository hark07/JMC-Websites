import nodemailer from "nodemailer";

// =====================================
// EMAIL TRANSPORTER
// =====================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

// =====================================
// VERIFY CONNECTION
// =====================================

transporter.verify((error) => {
  if (error) {
    console.log("Email Service Error:", error.message);
  } else {
    console.log("Email Service Connected");
  }
});

// =====================================
// SEND EMAIL
// =====================================

export const sendEmail = async ({ to, subject, html, text = "" }) => {
  try {
    const mailOptions = {
      from: `"JMC Admin Portal" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      text,

      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email Error:", error.message);

    throw error;
  }
};

// =====================================
// SEND OTP EMAIL
// =====================================

export const sendOTPEmail = async (email, otp) => {
  const html = `

  <div style="font-family:Arial">

    <h2>JMC Admin Portal</h2>

    <p>Your OTP code is:</p>

    <h1>${otp}</h1>

    <p>
      OTP valid for 5 minutes.
    </p>

  </div>

  `;

  return sendEmail({
    to: email,

    subject: "Your Verification OTP",

    html,
  });
};

// =====================================
// SEND PASSWORD RESET EMAIL
// =====================================

export const sendPasswordResetEmail = async (email, name, resetLink) => {
  const html = `

  <div>

    <h2>Password Reset</h2>

    <p>Hello ${name}</p>

    <a href="${resetLink}">
      Reset Password
    </a>

    <p>
      Link expires in 15 minutes.
    </p>

  </div>

  `;

  return sendEmail({
    to: email,

    subject: "Reset Your Password",

    html,
  });
};

// =====================================
// SEND WELCOME EMAIL
// =====================================

export const sendWelcomeEmail = async (email, name) => {
  const html = `

  <div>

    <h2>
      Welcome to JMC Admin Portal
    </h2>

    <p>
      Hello ${name}
    </p>

    <p>
      Your admin account has been created successfully.
    </p>

  </div>

  `;

  return sendEmail({
    to: email,

    subject: "Welcome to JMC Admin Portal",

    html,
  });
};

export default transporter;
