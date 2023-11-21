const express = require('express');
const router = express.Router();

const applicationFormController = require('../controllers/applicationFormController');
const trialDemoFormController = require('../controllers/trialDemoFormController');
const contactUsFormController = require('../controllers/contactUsFormController');

router.post('/application-form', applicationFormController.postApplicationForm);
router.post('/trial-demo-form', trialDemoFormController.postTrialDemoForm);
router.post('/contact-us-form', contactUsFormController.postContactUsForm);
router.post('/subscribe-form', contactUsFormController.postSubscribeForm)


module.exports=router;