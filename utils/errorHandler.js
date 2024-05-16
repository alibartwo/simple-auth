const errorHandler = (err, req, res, next) => {
    console.log('Shit man :( ->', err);
    res.status(500).send('Internal server error!');
}

module.exports = errorHandler;