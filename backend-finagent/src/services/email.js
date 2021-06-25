import createError from "http-errors";
import nodemailer from "nodemailer";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://app.finagent.eu"
    : "http://localhost:3000";

const transporter = nodemailer.createTransport({
  host: "mail.finagent.eu",
  port: 587,
  auth: {
    user: "noreply",
    pass: "$RGyZD%h%+XJ8B9a",
  },
});

export async function ConfirmMailUtil(
  req,
  res,
  next,
  name,
  email,
  emailToken,
  isAdmin
) {
  let baseURL = "";
  if (isAdmin) {
    baseURL =
      process.env.NODE_ENV === "production"
        ? "https://admin.finagent.eu"
        : "http://localhost:3001";
  } else if (!isAdmin) {
    baseURL =
      process.env.NODE_ENV === "production"
        ? "https://app.finagent.eu"
        : "http://localhost:3000";
  }

  const mailOptions = {
    from: "noreply@finagent.eu",
    to: email,
    subject: "Aktywacja konta",
    text: `Aktywacja konta`,
    html: `<h2>Dzień dobry ${name},</h2></br></br><p>Dziękujemy za rejestrację w serwisie FinAgent. W tej chwili Twoje konto nie jest jeszcze aktywne. Aby je aktywować, kliknij w poniższy link:</br></br> <a target="_blank" rel="noreferrer" href="${baseURL}/auth/confirm/${emailToken}">${baseURL}/auth/confirm/${emailToken}</a></p></br></br> <p>Zespół FinAgent </p>`,
  };

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw createError.BadRequest("Unable to send email");
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // res.send(emailToken);
  } catch (error) {
    next(error);
  }
}

// export async function ChangeMailUtil(
//   req,
//   res,
//   next,
//   name,
//   email,
//   emailToken,
//   isAdmin
// ) {
//   let baseURL = "";
//   if (isAdmin) {
//     baseURL =
//       process.env.NODE_ENV === "production"
//         ? "https://admin.finagent.eu"
//         : "http://localhost:3001";
//   } else if (!isAdmin) {
//     baseURL =
//       process.env.NODE_ENV === "production"
//         ? "https://app.finagent.eu"
//         : "http://localhost:3000";
//   }

//   const mailOptions = {
//     from: "noreply@ytogo.app",
//     to: email,
//     subject: "Zmiana poczty",
//     text: `Zmiana poczty`,
//     html: `<h2>Dzień dobry ${name},</h2></br></br><p>Aby zmienić Email, kliknij w poniższy link:</br></br> <a target="_blank" rel="noreferrer" href="${baseURL}/settings/change_email/${emailToken}">${baseURL}/settings/change_email/${emailToken}</a></p></br></br> <p>Zespół FinAgent </p>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         throw createError.BadRequest("Unable to send email");
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//     // res.send(emailToken);
//   } catch (error) {
//     next(error);
//   }
// }

export async function forgotPassword(req, res, next, name, email, emailToken) {
  const mailOptions = {
    from: "noreply@finagent.eu",
    to: email,
    subject: "Zmiana hasła",
    text: `Resetuj hasło`,
    html: `<h2>Dzień dobry ${name},</h2></br></br><p>Aby zresetować hasło, kliknij w poniższy link:</br></br> <a target="_blank" rel="noreferrer" href="${baseURL}/auth/restore/confirm/${emailToken}">${baseURL}/auth/restore/confirm/${emailToken}</a></p></br></br> <p>Zespół FinAgent </p>`,
  };

  try {
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw createError.BadRequest("Unable to send email");
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // res.send(emailToken);
  } catch (error) {
    next(error);
  }
}
