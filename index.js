const { response } = require('express');
const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configurações iniciais ejs

app.use(express.static('public'));
app.set('view engine', 'ejs');

// início de acesso as rotas

app.get('/', (req, res)=>{
    res.render('index');
});

// início das rotas de clientes

//cadastrar
app.get('/clientes', (req, res)=>{
    res.render('cliente/index');
});

//lista 
app.get('/listagemClientes', (req, res)=>{
    const urlListarCliente = 'http://localhost:3000/listarCliente';


    //chamada do back

    axios.get(urlListarCliente)
    .then((response)=>{

        console.log(response.data);
        let clientes = response.data;
        res.render('cliente/listarCliente', {clientes});

    });
});

//edição 

app.get('/editarCliente/:cod_cliente', (req, res)=>{

    let{cod_Cliente} = req.params

    urlListaClientePK = `http://localhost:3000/listaClientePK/${cod_Cliente}`;


    
    axios.get(urlListaClientePK)
    .then((response)=>{
    let cliente = response.data;
    res.render('cliente/editarCliente.ejs',{cliente})
});

});

app.post('/editarCliente', (req,res)=>{

    let urlEditar = 'http://localhost:3000/editarCliente';
    console.log(req.body);

    axios.put(urlEditar ,req.body)
    .then((response)=>{
        
        res.send('Dados Alterados com sucesso!');

    });
})
app.get('/excluirCliente/:cod_Cliente', (req, res)=>{

    let {cod_Cliente} = req.params;

    const urlExcluirCliente = `http://localhost:3000/excluirCliente/${cod_Cliente}`

    axios.delete(urlExcluirCliente)
    .then((response)=>{
        res.send('Cliente Excluido');
    });

});
//fim das configurações



app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});