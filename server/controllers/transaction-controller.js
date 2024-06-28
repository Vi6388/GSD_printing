const mongoose = require('mongoose');
const Transaction = require('../models/transaction.model');


function catchDBErr(err, res) {
    // 400: Invalid Request Error, Duplicate Key...
    // Backup validation since validation already performed by JOI
    if (err.name === "MongoError" || err.name === "ValidationError")
        return res.status(400).send({
            status: false,
            message: err.message
        });
    else {
        // 500: DB connection issues... 
        return res.status(500).send({
            status: false,
            message: "Oops! Internal server error."
        });
    }
}

exports.fetchTransactionList = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 100;
    return Transaction.find()
        .countDocuments()
        .then(count => {
            Transaction.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(list => {
                    res.status(200).json({
                        status: true,
                        message: "Transaction List fetched",
                        list: list,
                    })
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err)
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })

};

exports.getTransactionByProductID = (req, res) => {
    Transaction.find({ _id: req.params.productID})
            .then(async (list) => {
                if(list.length > 0) {
                    return res.status(200).send({ status: true, list});
                } else {
                    return res.status(404).send({
                        status: false,
                        message: "Transaction list not found with productID: " + req.params.productID
                    })
                }
            })
            .catch((err) => catchDBErr(err, res));
}

exports.deleteTransaction = async (req, res) => {
    Transaction.deleteOne({ _id: req.params.id })
        .then((transaction) => {
            if (!transaction) {
                return res.status(404).send({
                    status: false,
                    message: "Transaction not found with id: " + req.params.id
                });
            }
            return res.status(200).send({
                transactionID: transaction._id,
                status: true,
                message: "Transaction deleted successfully"
            });
        })
        .catch((err) => catchDBErr(err, res))
};