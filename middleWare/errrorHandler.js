// const errorHandler = (err, req, res, next) => {

//     const status = res.statusCode < 400 ? 500 : res.statusCode;
//     res.status(status);
//     res.json({
//         message: err.message,
//         stack: err.stack
//     })

// }


const errorHandler = (err, req, res, next) => {
    const status = res.statusCode < 400 ? 500 : res.statusCode;
    const errorMessage = err.message || 'Internal Server Error';
    res.status(status).json({
        message: errorMessage,
        stack: err.stack
    });
};

module.exports = { errorHandler }