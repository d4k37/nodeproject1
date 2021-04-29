const { request, response } = require('express');
const express =require('express');
const {v4 : uuidv4} = require("uuid");

const app = express();
app.use(express.json());
const customers = [];

//middleware
function verifyIfExistsAccountCPF(request, response, next){
    const {cpf} = request.headers;
    const customer = customers.find(customer => customer.cpf === cpf);
    if(!customer){
        return response.status(400).json({error:"NÃO ACHEI"})
    }
    request.customer = customer;
    return next();
}


app.post("/account", (request, response)=>{
    const {cpf, name} = request.body;
   
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)


    if(customerAlreadyExists){
        return response.status(400).json({error: "JÁ EXISTE"})
    }

   customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });
    return response.status(201).send();
})

app.use(verifyIfExistsAccountCPF);

app.get("/statement", verifyIfExistsAccountCPF,  (request, response) =>{
    

       
})

app.listen(3334)