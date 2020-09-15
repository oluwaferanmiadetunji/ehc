const nodemailer = require('nodemailer');
const EMAIL = 'oluwaferanmiadetunji111@gmail.com';
const PASSWORD = 'jupitre1999';

module.exports = async (email, token) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: EMAIL,
			pass: PASSWORD,
		},
	});

	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: 'Account verfification',
		html: `
      <p style="color: black;">Use this token to reset your password</p>
      <h2 style="color: black;">${token}</h2>
      <p style="color: black;">Thanks,</p>
      <p style="color: black;">EH Care</p>`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
		} else {
		}
	});
};
