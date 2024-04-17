import nodemailer from 'nodemailer'
import ContactModel from '../models/contactModel.js'

export class ContactController {
    async sendForm(req, res, next) {
        try {
            // TODO: Email ska vara frivilligt att fylla i. 
            const { fname, email, contactType, message, recipientEmail } = req.body
            console.log(recipientEmail)

            const contact = await ContactModel.addContact(req.body)
            console.log(contact)
            const contactGet = await ContactModel.getContact()
            console.log(contactGet)

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })

            const mailOptions = {
                from: process.env.EMAIL,
                to: recipientEmail,
                subject: 'New message from your website',
                text: `
                    Name: ${fname}
                    Email: ${email}
                    Contact Type: ${contactType}
                    Message: ${message}
                `
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error)
                    req.session.flash = { type: 'danger', text: 'Formulär kunde inte skickas' }
                    res.redirect('/')
                } else {
                    console.log('Email sent:', info.response)
                    req.session.flash = { type: 'success', text: 'Formulär skickades korrekt!' }
                    res.redirect('/')
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
