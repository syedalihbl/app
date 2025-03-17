
const router = require('express').Router();

const Authenticator = require('../common/authentication/channelsAuth')
const accountListControllerByCPR = require('./api/account/accountlistBahV2/controllers/accountListBahController')
const accountBalanceALLContoller = require('./api/account/accountbalanceALL/controllers/accountBalanceALLController');
const accountStatementController = require('./api/account/accountstatmentBAH/controllers/accountStatmentController')
const fundTransferControllerH2H = require('./api/payment/fundtransfer/fundtransferH2H/controllers/fundTransferController')
const getStandingOrders = require('./api/account/getStandingOrders/controllers/getStandingOrders')
const accStandingController = require('./api/account/getStandingOrderByAccount/controllers/accStandingController');
const getSuplimentaryAccountInfo = require('./api/account/getSuplimentaryAccountInfo/controllers/getSuplimentaryAccountInfo')
const directDebitByAccount = require('./api/account/getDirectDebitByAccount/controllers/directDebitByAccountController')
const directDebitByCif = require('./api/account/getDirectDebitByCIF/controllers/getDirectDebitByCIFController')

//Consent Management APIs
const fetchConsentAISPController = require('./api/consent/fetchConsentAISP/controllers/fetchConsentAISPController')
const fetchConsentPISPController = require('./api/consent/fetchConsentPISP/controllers/fetchConsentPISPController')
const updateConsentAISPController = require('./api/consent/updateConsentAISP/controllers/updateConsentAISPController')
const updateConsentPISPController = require('./api/consent/updateConsentPISP/controllers/updateConsentPISPController')

router.get('/v1/consent/details/aisp/:consentId', fetchConsentAISPController.fetchConsentAISP);
router.get('/v1/consent/details/pisp/:consentId', fetchConsentPISPController.fetchConsentPISP);
router.post('/v1/consent/details/aisp', updateConsentAISPController.updateConsentAISP);
router.post('/v1/consent/details/pisp', updateConsentPISPController.updateConsentPISP);

//Phase 1

router.get('/v2/account/list/:nationalityIdentityNo', accountListControllerByCPR.accountListBahByCPR) // dont delete

router.get('/v2/account/balance/:account', accountBalanceALLContoller.accountBalanceUAE); // don`t deletes

router.post('/v2/bah/account/statement', (req, res, next) => {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401)
        return res.send(authRes)
    }
    next()
}, accountStatementController.accountStatement) // don`t deletes

router.post('/v3/payment/fundtransfer/transaction', fundTransferControllerH2H.fundTransfer) // don`t deletes



//Phase 2

router.get('/v2/bah/standing-orders', (req, res, next) => {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401)
        return res.send(authRes)
    }
    next()
}, getStandingOrders.getStandingOrders)



router.get('/v2/bah/account/:AccountId/standing-order', (req, res, next) => {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401)
        return res.send(authRes)
    }
    next()
}, accStandingController.AccStanding)


router.get('/v2/bah/accounts/:AccountId/supplementary-account-info', (req, res, next) => {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401)
        return res.send(authRes)
    }
    next()
}, getSuplimentaryAccountInfo.getSuplimentaryAccountInfo)

router.get('/v2/bah/accounts/:AccountId/direct-debits', (req, res, next) => {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401)
        return res.send(authRes)
    }
    next()
}, directDebitByAccount.directDebitByAccount)




router.get('/v2/bah/account/direct-debits', (req, res, next) => {
    const authRes = Authenticator.authenticate(req)
    if (authRes && authRes.error && authRes.error.type === 'Unauthorized') {
        res.status(401)
        return res.send(authRes)
    }
    next()
}, directDebitByCif.getDebitByCif)




/**
 * Demographic - UAE
 * 
 * @swagger
 *
 * /sandbox/api/v1/customer/demographic/byemiratid/{cif}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Demographic - UAE
 *     summary: The service is used for Get Demographic - UAE
 *     parameters:
 *       - name: cif
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: '784198497306203'
 *       - name: x-req-id
 *         in: header
 *         description: >-
 *           The x-req-id helps the server to log the request with unique
 *           identifier and is of max 40 chars
 *         required: true
 *         schema:
 *           type: string
 *           example: '00001'
 *       - name: x-channel-id
 *         in: header
 *         description: >-
 *           The x-channel-id helps the server to validate the request with unique channel source. It is of max 6 chars
 *         required: true
 *         schema:
 *           type: string
 *           example: IB
 *       - name: x-sub-channel-id
 *         in: header
 *         description: >-
 *           The x-sub-channel-id helps the server to validate the request with
 *           unique channel source. It is of max 6 chars
 *         required: true
 *         schema:
 *           type: string
 *           example: IB
 *       - name: x-country-code
 *         in: header
 *         description: >-
 *           It is the country short code. In your case it will be 'PK' and is of max 3 chars
 *         required: true
 *         schema:
 *           type: string
 *           example: UAE
 *           
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                   description: Response description i.e successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: MUHAMMAD OMAR
 *                     middleName:
 *                       type: string
 *                       example: ""
 *                     lastName:
 *                       type: string
 *                       example: QASIM
 *                     dateOfBirth:
 *                       type: string
 *                       example: 0841103
 *                     countryofBirth:
 *                       type: string
 *                       example: 0021
 *                     residentStatus:
 *                       type: string
 *                       example: 01
 *                     countryOfIssuance:
 *                       type: string
 *                       example: CA
 *                     dateOfIssuance:
 *                       type: string
 *                       example: 1150506
 *                     dateOfExpiry:
 *                       type: string
 *                       example: 1200504
 *                     emiratesIDNumber:
 *                       type: string
 *                       example: 784198497306203
 *                     dateofEmiratesIDExpiry:
 *                       type: string
 *                       example: 1200909
 *                     currResAddressCountry:
 *                       type: string
 *                       example: AE
 *                     currResAddressEmirate:
 *                       type: string
 *                       example: U004
 *                     currResAddressCity:
 *                       type: string
 *                       example: U004
 *                     currResAddressStreet:
 *                       type: string
 *                       example: "380, VILLA 4, BAYTI 40 FIRST AL"
 *                     currResAddressPOBox:
 *                       type: string
 *                       example: 11987
 *                     telephoneNumberLandline:
 *                       type: string
 *                       example: 0097143043100
 *                     employeePhoneNumberDirect:
 *                       type: string
 *                       example: 0097143043100
 *                     employeePhoneNumberGeneral:
 *                       type: string
 *                       example: 0097143043100
 *                     regularSalIncome:
 *                       type: string
 *                       example: 61200
 *                     businessPhoneNumberGeneral:
 *                       type: string
 *                       example: ""
 *                     businessEmailAddress:
 *                       type: string
 *                       example: ""
 *                     businessAddressCountry:
 *                       type: string
 *                       example: ""
 *                     businessAddressCity:
 *                       type: string
 *                       example: ""
 *                     businessAddressStreet:
 *                       type: string
 *                       example: ""
 *                     businessAddressPOBox:
 *                       type: string
 *                       example: ""
 *                     nationality:
 *                       type: string
 *                       example: PK
 *                     otherNationality:
 *                       type: string
 *                       example: CA
 *                     countryofResidence:
 *                       type: string
 *                       example: AE
 *                     mailingAddressCountry:
 *                       type: string
 *                       example:  ""
 *                     mailingAddressEmirate:
 *                       type: string
 *                       example:  ""
 *                     mailingAddressCity:
 *                       type: string
 *                       example:  ""
 *                     mailingAddressStreet:
 *                       type: string
 *                       example:  ""
 *                     mailingAddressType:
 *                       type: string
 *                       example:  ""
 *                     mailingAddressApartment:
 *                       type: string
 *                       example:  ""
 *                     mailingAddressPOBox:
 *                       type: string
 *                       example: ""
 *                     employerName:
 *                       type: string
 *                       example: PWC
 *                     industryOfEmployer:
 *                       type: string
 *                       example: ""
 *                     otherIncomeAED:
 *                       type: string
 *                       example: ""
 *                     industryOfBusiness:
 *                       type: string
 *                       example: 05
 *                     businessAddressEmirate:
 *                       type: string
 *                       example: ""
 *                     primaryPurposeOfOpeningAccount:
 *                       type: string
 *                       example: ""
 *                     estimateOfWealthinAED:
 *                       type: string
 *                       example: ""
 *                     nameoftheBank:
 *                       type: string
 *                       example: HSBC
 *                     typeOfAccounts:
 *                       type: string
 *                       example: ""
 *                     areYouaUsPassportHolder:
 *                       type: string
 *                       example: ""
 *                     areYouaUsGreenCardHolder:
 *                       type: string
 *                       example: ""
 *                     monthlyIncomeFromBusinessAED:
 *                       type: string
 *                       example: EA
 *                     otherAnnucalIncome:
 *                       type: string
 *                       example: 1212
 *                     anticipatedmonthlyCrossBorderTransactionAED:
 *                       type: string
 *                       example: 61200
 *                     monthlyCreditTurnover:
 *                       type: string
 *                       example: 61200
 *                     profession:
 *                       type: string
 *                       example: 23
 *                     areYouATaxresdientInUSA:
 *                       type: string
 *                       example: Y 
 *                     taxIdentificationNumber:
 *                       type: string
 *                       example: ""
 *                     tin:
 *                       type: string
 *                       example: Y 
 *       '400':
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400'
 *       '401':
 *         description: Unauthorized Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       '403':
 *         description: Invalid Signature
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/403'
 *       '406':
 *         description: Target System Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/406'
 *       '500':
 *         description: Unspecified Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       '501':
 *         description: JSON Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/501'
 *       '502':
 *         description: Bad Gateway
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/502'
 *       '503':
 *         description: Target System Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/503'
 *       '504':
 *         description: Gateway Time-out
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/504'
 *       '598':
 *         description: Read Timeout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/598'
 *       '599':
 *         description: Connection Timeout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/599'
 */


/**
* Account Balance - UAE
* 
* @swagger
*
* /sandbox/api/v2/account/balance/{accountNo}:
*   get:
*     security:
*       - bearerAuth: []
*     tags:
*       -  Account Balance - UAE
*     summary: The service is used for Get Account Balance - UAE
*     parameters:
*       - name: accountNo
*         in: path
*         required: true
*         schema:
*           type: string
*           example: '20117770378201'
*       - name: x-req-id
*         in: header
*         description: >-
*           The x-req-id helps the server to log the request with unique
*           identifier and is of max 40 chars
*         required: true
*         schema:
*           type: string
*           example: '00001'
*       - name: x-channel-id
*         in: header
*         description: >-
*           The x-channel-id helps the server to validate the request with unique channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-sub-channel-id
*         in: header
*         description: >-
*           The x-sub-channel-id helps the server to validate the request with
*           unique channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-country-code
*         in: header
*         description: >-
*           It is the country short code. In your case it will be 'PK' and is of max 3 chars
*         required: true
*         schema:
*           type: string
*           example: UAE
*           
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Success
*                   description: Response description i.e successful
*                 data:
*                   type: object
*                   properties:
*                     accountNo:
*                       type: string
*                       example: 20117770378201
*                     accountCurrency:
*                       type: string
*                       example: 'AED'
*                     accountBookBalance:
*                       type: string
*                       example: ''
*                     accountHoldAmount:
*                       type: string
*                       example: ''
*                     accountNetBalance:
*                       type: string
*                       example: ''
*                     accountCurrentBalance:
*                       type: string
*                       example: ''
*                     accountAvailableBalance:
*                       type: string
*                       example: 00000000019996060
*                     accountMinimumBalance:
*                       type: string
*                       example: ''
*                     accountUnClearedFund:
*                       type: string
*                       example: ''
*       '400':
*         description: Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/400'
*       '401':
*         description: Unauthorized Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/401'
*       '403':
*         description: Invalid Signature
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/403'
*       '406':
*         description: Target System Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/406'
*       '500':
*         description: Unspecified Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/500'
*       '501':
*         description: JSON Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/501'
*       '502':
*         description: Bad Gateway
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/502'
*       '503':
*         description: Target System Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/503'
*       '504':
*         description: Gateway Time-out
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/504'
*       '598':
*         description: Read Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/598'
*       '599':
*         description: Connection Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/599'
*/

/**
* E-CHECK BAHRAIN- V1
* 
* @swagger
*
* /sandbox/api/v1/customer/echeck/{customerName}:
*   get:
*     security:
*       - bearerAuth: []
*     tags:
*       - E-CHECK BAHRAIN - V1
*     summary: The service is used for E-CHECK BAHRAIN V1 .
*     parameters:
*       - name: x-req-id
*         in: header
*         description: >-
*           The req Id helps the server to log the request with unique
*           identifier and is of max 40 chars
*         required: true
*         schema:
*           type: string
*           example: '00001'
*       - name: x-channel-id
*         in: header
*         description: >-
*           The channel Id helps the server to validate the request with unique
*           channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-sub-channel-id
*         in: header
*         description: >-
*           The sub channel Id helps the server to validate the request with
*           unique channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-country-code
*         in: header
*         description: >-
*           It is the country short code. In your case it will be 'PK' and is of
*           max 3 chars
*         required: true
*         schema:
*           type: string
*           example: BAH
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Success
*                   description: Response description i.e successful
*                 data:
*                   type: object
*                   properties:
*                     customerName:
*                       type: string
*                       example: 'MUHAMMAD UMER DRAZ'
*                       description: Name of Customer
*                     accountType:
*                       type: string
*                       example: 'BH'
*                       description: Account Type
*                     accountTitle:
*                       type: string
*                       example: 'INDIVIDUAL'
*                       description: Title of Account
*                     addressLine1:
*                       type: string
*                       example: 'FLAT 11 BLDG 1657 ROAD 153 BLOCK 90'
*                       description: particulars1
*                     addressLine2:
*                       type: string
*                       example: '1 RIFFA AL HUNAYNIYAH'
*                       description: Address Line 2
*                     addressLine3:
*                       type: string
*                       example: 'KINGDOM OF BAHRAIN'
*                       description: Address Line 3
*                     addressLine4:
*                       type: string
*                       example: ''
*                       description: Address Line 4
*                     items:
*                       type: array
*                       items:
*                             type: object
*                             properties:
*                               bankCode:
*                                 type: string
*                                 example: 'BH10HABB20017000000603'
*                                 description: 'Code of Bank'
*                               bankName:
*                                 type: string
*                                 example: '2001'
*                                 description: 'Name of Bank'
*                               accountNumber:
*                                 type: string
*                                 example: '20017000000603'
*                                 description: 'Customer Account Number'
*                               accountType:
*                                 type: string
*                                 example: 'CURRENT ACCOUNT'
*                                 description: 'Type of Account'
*                               accountStatus:
*                                 type: string
*                                 example: 'Y'
*                                 description: 'Status of Account'
*                               accountCurrecy:
*                                 type: string
*                                 example: 'BHD'
*                                 description: 'Currency of Account'
*       '400':
*         description: Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/400'
*       '401':
*         description: Unauthorized Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/401'
*       '403':
*         description: Invalid Signature
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/403'
*       '406':
*         description: Target System Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/406'
*       '500':
*         description: Unspecified Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/500'
*       '501':
*         description: JSON Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/501'
*       '502':
*         description: Bad Gateway
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/502'
*       '503':
*         description: Target System Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/503'
*       '504':
*         description: Gateway Time-out
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/504'
*       '598':
*         description: Read Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/598'
*       '599':
*         description: Connection Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/599'
*/


/**
* Fund Transfer - Bahrain
* 
* @swagger
*
* /sandbox/api/v2/payment/fundtransfer/transaction:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Fund Transfer Bahrain 
*     summary: The service is used for Fund Transfer Bahrain .
*     parameters:
*       - name: x-req-id
*         in: header
*         description: >-
*           The req Id helps the server to log the request with unique
*           identifier and is of max 40 chars
*         required: true
*         schema:
*           type: string
*           example: '00001'
*       - name: x-channel-id
*         in: header
*         description: >-
*           The channel Id helps the server to validate the request with unique
*           channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-sub-channel-id
*         in: header
*         description: >-
*           The sub channel Id helps the server to validate the request with
*           unique channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-country-code
*         in: header
*         description: >-
*           It is the country short code. In your case it will be 'PK' and is of
*           max 3 chars
*         required: true
*         schema:
*           type: string
*           example: BAH
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               initiatingUserId:
*                 type: string            
*                 example: 'WSPT'
*                 description: 'Initiating User ID'
*               transactionInitiatedBranch:
*                 type: string
*                 example: '2006'
*                 description: 'Branch of Transaction'
*               postingUserReference:
*                 type: string
*                 example: 'WSPT'
*                 description: 'Posting User Reference'
*               transactionDate:
*                 type: string            
*                 example: ''
*                 description: 'Transaction Date'
*               transactionTime:
*                 type: string
*                 example: ''
*                 description: 'Transaction Time'
*               transactionAmount:
*                 type: string            
*                 example: 000000000020000
*                 description: 'Transaction Amount'
*               debitAccountNo:
*                 type: string
*                 example: '21047000000401'
*                 description: 'Debit Account Number'
*               debitTransactionCode:
*                 type: string
*                 example: '020'
*                 description: 'debit Transaction Code'
*               debitRecordReference:
*                 type: string
*                 example: ''
*                 description: 'Debit Record Reference'
*               debitValueDate:
*                 type: string
*                 example: ''
*                 description: 'Debit Value Date'
*               debitCurrency:
*                 type: string            
*                 example: ''
*                 description: 'Debit Currency'
*               debitNarration1:
*                 type: string
*                 example: 'string'
*                 description: 'Debit Narration 1'
*               debitNarration2:
*                 type: string
*                 example: 'string'
*                 description: 'Debit Narration 2'
*               debitNarration3:
*                 type: string            
*                 example: 'string'
*                 description: 'Debit Narration 3'
*               debitNarration4:
*                 type: string
*                 example: 'string'
*                 description: 'Debit Narration 4'
*               creditAccountNo:
*                 type: string
*                 example: '20017000000603'
*                 description: 'Credit Account Number'
*               creditTransactionCode:
*                 type: string
*                 example: '520'
*                 description: 'credit Transaction Code'
*               creditRecordReference:
*                 type: string
*                 example: ''
*                 description: 'Credit Record Reference'
*               creditValueDate:
*                 type: string
*                 example: ''
*                 description: 'credit Value Date'
*               creditCurrency:
*                 type: string            
*                 example: ''
*                 description: 'credit Currency'
*               creditNarration1:
*                 type: string
*                 example: 'string'
*                 description: 'credit Narration 1'
*               creditNarration2:
*                 type: string
*                 example: "string"
*                 description: 'credit Narration 2'
*               creditNarration3:
*                 type: string            
*                 example: 'string'
*                 description: 'credit Narration 3'
*               creditNarration4:
*                 type: string
*                 example: 'string'
*                 description: 'credit Narration 4'
*               batchNo:
*                 type: string
*                 example: ''
*                 description: 'Batch Number'
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Success
*                   description: Response description i.e successful
*                 data:
*                   type: object
*                   properties:
*                     uniqueReferenceId:
*                       type: string
*                       example: 1212
*                     responseCode:
*                       type: string
*                       example: 0000000
*                     responseDescription:
*                       type: string
*                       example: Successfully processed transaction
*       '400':
*         description: Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/400'
*       '401':
*         description: Unauthorized Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/401'
*       '403':
*         description: Invalid Signature
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/403'
*       '406':
*         description: Target System Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/406'
*       '500':
*         description: Unspecified Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/500'
*       '501':
*         description: JSON Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/501'
*       '502':
*         description: Bad Gateway
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/502'
*       '503':
*         description: Target System Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/503'
*       '504':
*         description: Gateway Time-out
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/504'
*       '598':
*         description: Read Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/598'
*       '599':
*         description: Connection Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/599'
*/


/**
* Customer Detail By Account BAHRAIN- V1
* 
* @swagger
*
* /sandbox/api/v1/customer/detail/{accountno}:
*   get:
*     security:
*       - bearerAuth: []
*     tags:
*       - Customer Detail By Account BAHRAIN- V1
*     summary: The service is used for Customer Details BAHRAIN V1 .
*     parameters:
*       - name: x-req-id
*         in: header
*         description: >-
*           The req Id helps the server to log the request with unique
*           identifier and is of max 40 chars
*         required: true
*         schema:
*           type: string
*           example: '00001'
*       - name: x-channel-id
*         in: header
*         description: >-
*           The channel Id helps the server to validate the request with unique
*           channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-sub-channel-id
*         in: header
*         description: >-
*           The sub channel Id helps the server to validate the request with
*           unique channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: MB
*       - name: x-country-code
*         in: header
*         description: >-
*           It is the country short code. In your case it will be 'PK' and is of
*           max 3 chars
*         required: true
*         schema:
*           type: string
*           example: BAH
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Success
*                   description: Response description i.e successful
*                 data:
*                   type: object
*                   properties:
*                     accountTitle:
*                       type: string
*                       example: 'NOOR MOHAMMED'
*                       description: Account Title for Customer
*                     accountStatus:
*                       type: string
*                       example: 'N'
*                       description: Account Current Status
*                     branchCode:
*                       type: string
*                       example: '2006'
*                       description: Branch Code where this account number is openned
*                     customerType:
*                       type: string
*                       example: 'EA'
*                       description: Customer Type
*                     documentId:
*                       type: string
*                       example: '710234880'
*                       description:  Document ID
*                     idTypeDescription:
*                       type: string
*                       example: '01'
*                       description: ID type Description
*                     dateOfBirth:
*                       type: string
*                       example: '01012016'
*                       description: Date of Birth of primary account holder
*                     primaryEmailAddress:
*                       type: string
*                       example: 'BTUAT@GMAIL.COM'
*                       description: Primary Email Address
*                     primaryMobileNumber:
*                       type: string
*                       example: '009733424792'
*                       description: Primary Mobile Number
*                     availableBalanceOfPayer:
*                       type: string
*                       example: '000000005000000'
*                       description: Available Balance of Payer
*       '400':
*         description: Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/400'
*       '401':
*         description: Unauthorized Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/401'
*       '403':
*         description: Invalid Signature
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/403'
*       '406':
*         description: Target System Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/406'
*       '500':
*         description: Unspecified Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/500'
*       '501':
*         description: JSON Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/501'
*       '502':
*         description: Bad Gateway
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/502'
*       '503':
*         description: Target System Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/503'
*       '504':
*         description: Gateway Time-out
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/504'
*       '598':
*         description: Read Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/598'
*       '599':
*         description: Connection Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/599'
*/


/**
* Customer Detail By Account BAHRAIN- V2
* 
* @swagger
*
* /sandbox/api/v2/customer/detail/{accountno}:
*   get:
*     security:
*       - bearerAuth: []
*     tags:
*       - Customer Detail By Account BAHRAIN- V2
*     summary: The service is used for Customer Details BAHRAIN V2 .
*     parameters:
*       - name: x-req-id
*         in: header
*         description: >-
*           The req Id helps the server to log the request with unique
*           identifier and is of max 40 chars
*         required: true
*         schema:
*           type: string
*           example: '00001'
*       - name: x-channel-id
*         in: header
*         description: >-
*           The channel Id helps the server to validate the request with unique
*           channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: BPAY
*       - name: x-sub-channel-id
*         in: header
*         description: >-
*           The sub channel Id helps the server to validate the request with
*           unique channel source. It is of max 6 chars
*         required: true
*         schema:
*           type: string
*           example: BPAY
*       - name: x-country-code
*         in: header
*         description: >-
*           It is the country short code. In your case it will be 'PK' and is of
*           max 3 chars
*         required: true
*         schema:
*           type: string
*           example: BAH
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Success
*                   description: Response description i.e successful
*                 data:
*                   type: object
*                   properties:
*                     accountTitle:
*                       type: string
*                       example: 'NOOR MOHAMMED'
*                       description: Account Title for Customer
*                     accountStatus:
*                       type: string
*                       example: 'N'
*                       description: Account Current Status
*                     branchCode:
*                       type: string
*                       example: '2006'
*                       description: Branch Code where this account number is openned
*                     customerType:
*                       type: string
*                       example: 'EA'
*                       description: Customer Type
*                     addressLine1:
*                       type: string
*                       example: 'EA'
*                       description: Customer Type
*                     addressLine2:
*                       type: string
*                       example: 'EA'
*                       description: Customer Type
*                     addressLine3:
*                       type: string
*                       example: 'EA'
*                       description: Customer Type
*                     addressLine4:
*                       type: string
*                       example: 'EA'
*                       description: Customer Type
*                     documentId:
*                       type: string
*                       example: '710234880'
*                       description:  Document ID
*                     idTypeDescription:
*                       type: string
*                       example: '01'
*                       description: ID type Description
*                     dateOfBirth:
*                       type: string
*                       example: '01012016'
*                       description: Date of Birth of primary account holder
*                     primaryEmailAddress:
*                       type: string
*                       example: 'BTUAT@GMAIL.COM'
*                       description: Primary Email Address
*                     primaryMobileNumber:
*                       type: string
*                       example: '009733424792'
*                       description: Primary Mobile Number
*                     availableBalanceOfPayer:
*                       type: string
*                       example: '000000005000000'
*                       description: Available Balance of Payer
*       '400':
*         description: Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/400'
*       '401':
*         description: Unauthorized Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/401'
*       '403':
*         description: Invalid Signature
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/403'
*       '406':
*         description: Target System Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/406'
*       '500':
*         description: Unspecified Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/500'
*       '501':
*         description: JSON Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/501'
*       '502':
*         description: Bad Gateway
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/502'
*       '503':
*         description: Target System Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/503'
*       '504':
*         description: Gateway Time-out
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/504'
*       '598':
*         description: Read Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/598'
*       '599':
*         description: Connection Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/599'
*/

/**
*  Debit Transaction Lien - UK
* 
* @swagger
*
* /sandbox/api/V1/payment/debit/transaction/lien:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Debit Transaction Lien UK
*     summary: The service is used for Debit Transaction Lien UK .
*     parameters:
*       - name: x-req-id
*         in: header
*         description: >-
*           The x-req-id field helps the server to log the request with the unique identifier. 
*           It is min of 12 and max of 40 alphanumerics characters, so it is mandatory that the value must be a non-repetitive number of at least 12 characters.           
*         required: true
*         schema:
*           type: string
*           example: '<ChannelId>_123456789012'
*       - name: x-channel-id
*         in: header
*         description: >-
*           The x-channel-id field helps the server to validate the request with unique channel source. 
*           It is a min of 2 and max of 6 characters. For channel Id value, source team needs to contact with the Middleware team.
*           
*         required: true
*         schema:
*           type: string
*           example: OB
*       - name: x-sub-channel-id
*         in: header
*         description: >-
*          The x-sub-channel-id field helps the server to validate the request with unique channel source. 
*          It is a min of 2 and max of 6 characters. For sub channel Id value, source team needs to contact with the Middleware team.
*           
*         required: true
*         schema:
*           type: string
*           example: OB
*       - name: x-country-code
*         in: header
*         description: >-
*           The x-country-code field is the country short code. It is a min 2 chars and max 3 characters and in your case it will be 'UK'. For others, please contact with the Middleware team.
*         required: true
*         schema:
*           type: string
*           example: UK
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user:
*                 type: string            
*                 example: 'WSPT'
*                 description: 'Initiating User ID'
*               branch:
*                 type: string
*                 example: '2401'
*                 description: 'Branch of Transaction'
*               postingUserReference:
*                 type: string
*                 example: 'WSPT'
*                 description: 'Posting User Reference'
*               reqDate:
*                 type: string            
*                 example: '20210420'
*                 description: 'Request Date'
*               reqTime:
*                 type: string
*                 example: '150315'
*                 description: 'Request Time'
*               accountNo:
*                 type: string            
*                 example: 21069978864228
*                 description: 'Account Number of bank'
*               deptCode:
*                 type: string
*                 example: 'ACC'
*                 description: 'Debit Account Code'
*               reasonHold:
*                 type: string
*                 example: '011'
*                 description: 'Reason of Hold'
*     responses:
*       '200':
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: Success
*                   description: Response description i.e successful
*                 data:
*                   type: array
*                   items:
*                         type: object
*                         properties:
*                           holdNumber:
*                             type: string
*                             example: '001'
*                             description: 'Hold Number of Account'
*                           holdList:
*                             type: string
*                             example: '001'
*                             description: 'List of Hold'
*                           holdListDetail:
*                             type: string
*                             example: '001'
*                             description: 'Hold List Details'
*                           holdInputDate:
*                             type: string
*                             example: '20200102'
*                             description: 'Input Hold Date'
*                           holdStartDate:
*                             type: string
*                             example: '20200102'
*                             description: 'Start Date of Hold'
*                           holdExpiryDate:
*                             type: string
*                             example: '9999999'
*                             description: 'Expiry Date of Hold'
*                           holdAmount:
*                             type: string
*                             example: '000000000001600'
*                             description: 'hold Amount'
*                           holdReasonCode:
*                             type: string
*                             example: 'ACC'
*                             description: 'Reason of hold code'
*                           holdCode:
*                             type: string
*                             example: '011'
*                             description: 'Hold Number of Account'
*                           holdNarrative1:
*                             type: string
*                             example: 'Add hold till authorization.'
*                             description: 'Hold Narrative 1'
*                           holdNarrative2:
*                             type: string
*                             example: ''
*                             description: 'Hold Narrative 2'
*                           holdNarrative3:
*                             type: string
*                             example: ''
*                             description: 'Hold Narrative 3'
*                           holdNarrative4:
*                             type: string
*                             example: ''
*                             description: 'Hold Narrative 4'
*       '400':
*         description: Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/400'
*       '401':
*         description: Unauthorized Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/401'
*       '403':
*         description: Invalid Signature
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/403'
*       '406':
*         description: Target System Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/406'
*       '500':
*         description: Unspecified Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/500'
*       '501':
*         description: JSON Validation Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/501'
*       '502':
*         description: Bad Gateway
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/502'
*       '503':
*         description: Target System Error
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/503'
*       '504':
*         description: Gateway Time-out
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/504'
*       '598':
*         description: Read Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/598'
*       '599':
*         description: Connection Timeout
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/599'
*/



module.exports = router;