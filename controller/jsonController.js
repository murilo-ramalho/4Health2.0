class JsonController{

    validadeBodyJson (req, res, next){
        const { body } = req;

        if(body.cpf == undefined) return res.status(400).json({message: 'cpf is required'});
        if(body.cpf == "") return res.status(400).json({message: 'cpf is not specified'});

        next();
    }
}

module.exports = JsonController;