const Joi = require('../../../../../common/utils/validator/joiValidator').Joi;

class Req_FundTransferModel {

    constructor(
initiatingUserId,
        postingUserReference,
        transactionDate,
        transactionInitiatedBranch,
        transactionAmount,
        debitAccountNo,
        debitTransactionCode,
        debitRecordReference,
        debitValueDate,
        debitCurrency,
        debitNarration1,
        debitNarration2,
        debitNarration3,
        debitNarration4,
        creditAccountNo,
        creditTransactionCode,
        creditRecordReference,
        creditValueDate,
        creditCurrency,
        creditNarration1,
        creditNarration2,
        creditNarration3,
        creditNarration4,
        batchNo
) {
        this.transactionDate = transactionDate;
        this.initiatingUserId = initiatingUserId;
        this.postingUserReference = postingUserReference;
        this.transactionInitiatedBranch = transactionInitiatedBranch;
        this.debitTransactionCode = debitTransactionCode;
        this.debitRecordReference = debitRecordReference;
        this.debitValueDate = debitValueDate;
        this.debitCurrency = debitCurrency;
        this.debitNarration1 = debitNarration1;
        this.debitNarration2 = debitNarration2;
        this.debitNarration3 = debitNarration3;
        this.debitNarration4 = debitNarration4;
        this.creditAccountNo = creditAccountNo;
        this.creditTransactionCode = creditTransactionCode;
        this.creditRecordReference = creditRecordReference;
        this.creditValueDate = creditValueDate;
        this.creditCurrency = creditCurrency;
        this.creditNarration1 = creditNarration1;
        this.creditNarration2 = creditNarration2;
        this.creditNarration3 = creditNarration3;
        this.creditNarration4 = creditNarration4;
        this.batchNo = batchNo;
        this.transactionAmount = transactionAmount;
        this.debitAccountNo = debitAccountNo;

    }


    validateSchema() {
        const schema = Joi.object().keys({
            transactionDate: Joi.string().allow(''),
            initiatingUserId: Joi.strict().required(),
            postingUserReference: Joi.string().required(),
            transactionInitiatedBranch: Joi.string().required(),
            debitTransactionCode: Joi.string().required(),
            debitRecordReference: Joi.string().required(),
            debitValueDate: Joi.string().allow(''),
            debitCurrency: Joi.string().required(),
            debitNarration1: Joi.string().required(),
            debitNarration2: Joi.string().required(),
            debitNarration3: Joi.string().required(),
            debitNarration4: Joi.string().required(),
            creditAccountNo: Joi.string().allow(''),
            creditTransactionCode: Joi.string().required(),
            creditRecordReference: Joi.string().required(),
            creditValueDate: Joi.string().allow(''),
            creditCurrency: Joi.string().required(),
            creditNarration1: Joi.string().required(),
            creditNarration2: Joi.string().required(),
            creditNarration3: Joi.string().required(),
            creditNarration4: Joi.string().allow(''),
            batchNo: Joi.string().required(),
            transactionAmount: Joi.string().required(),
            debitAccountNo:Joi.string().required()
        });

        return Joi.validate(this, schema);
    }

}

module.exports = Req_FundTransferModel;