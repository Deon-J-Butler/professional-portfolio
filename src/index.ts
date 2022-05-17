import { Application } from 'express'
import { Request, Response } from 'express'

const express = require('express')
const {check, validationResult} = require('express-validator')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Recaptcha = require('express-recaptcha').RecaptchaV2
const formData = require('form-data')
const Mailgun = require('mailgun.js')
require('dotenv').config()

const mailgun = new Mailgun(formData)

const validation = [
    check('firstName', 'Please enter your first name').notEmpty().trim().escape(),
    check('lastName', 'Please enter your last name').notEmpty().trim().escape(),
    check('email', 'Please enter a valid email address').isEmail().trim().escape(),
    check('subject').optional().trim().escape(),
    check('message', 'The message cannot exceed 1500 characters').notEmpty().trim().escape().isLength({min: 1, max: 1500}),
]

const app: Application = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

const mailgunClient = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY})

const handleGetRequest = (request: Request, response: Response) => {
    return response.json('Eureka!!')
}

const handlePostRequest = (request: Request, response: Response) => {
    response.append('Content-Type', 'text/html')
    response.append('Access-Control-Allow-Origin', '*')

    // @ts-ignore
    if (request.recaptcha.error) {
        return response.send(
            `<div class='alert alert-danger' role='alert'><strong>You just got reCAPTCHA'D</strong> Next time don't be a bot.</div>`
        )
    }

    const errors = validationResult(request)

    if (errors.isEmpty() === false) {
        const currentError = errors.array()[0]
        return response.send(
            `<div class='alert alert-danger' role='alert'><strong>There was an error in your input.</strong><br>${currentError.msg}</div>`
        )
    }

    const {firstName, lastName, email, subject, message} = request.body

    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: `${firstName} ${lastName} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        subject: `${email}: ${subject}`,
        text: message
    }

    mailgunClient.messages.create(process.env.MAILGUN_DOMAIN, mailgunData)
        .then((msg: any) =>
        response.send(
            `<div class='alert alert-success' role='alert'>Email Successfully Sent</div>`
        ))
        .catch((error: any) =>
        response.send(
            `<div class='alert alert-danger' role='alert'><strong>Email failed</strong><br>Please try again.</div>`
        ))
}

const indexRoute = express.Router()

indexRoute.route('/').get(handleGetRequest).post(recaptcha.middleware.verify, validation, handlePostRequest)

app.use('/apis', indexRoute)

app.listen(4200, () => {
    console.log('Connected...')
})