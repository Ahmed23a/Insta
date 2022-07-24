

const nodeoutlook = require('nodejs-nodemailer-outlook')

async function sendEmail (dest, message)
{
  nodeoutlook.sendEmail({
    auth: {
        user: process.env.senderEmail,
        pass: process.env.senderPassword
    },
    from: process.env.senderEmail,
    to: dest,
    subject: 'Please confirm your Email',
    html: message,
    text: 'This is text version!',
    
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
  });



}



module.exports = sendEmail