import nodemailer from "nodemailer";

export const mailer = async (email: string, link: string, title: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aobyteinternship@gmail.com",
      pass: "tpychprzdiqhiqiv",
    },
  });

  const mailOptions = {
    from: process.env.PROJECT_EMAIL,
    to: email,
    subject: `${title} Link`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title} Email</title>
      <style>
        .container {
          max-width: 600px;
          padding: 20px;
          border: 1px solid rgba(127, 38, 91, 0.4);
          border-radius: 10px;
          background-color: #f9f9f9;
        }
        h1 {
          color: #1a202c;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          border-radius: 5px;
          border: none;
          outline: none;
        }
        a {
          color:inherit!important;
          mso-color-alt: windowtext;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Click the button to reset your password!</h1>
        <p>
          <button  class="button">
            <a href="${link}">${title}</a>
          </button>
        </p>
      </div>
    </body>
    </html>
  `,
  };

  await transporter.sendMail(mailOptions);
};
