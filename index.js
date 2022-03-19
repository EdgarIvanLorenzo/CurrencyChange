const express=require("express");
const requestPromise = require('request-promise');
const JSSoup=require('jssoup').default;
const url = 'https://eldolar.mx/tipo-de-cambio-banbajio';

const app=express();

app.listen(4700,()=>{
    console.log("Servicio arriba");
})

app.get("/",(data,response)=>{
    response.send("Hola Mundo")
})

app.get('/change',(data,response)=>{
    requestPromise(url)
        .then(html => {
            let soup = new JSSoup(html);
            var tag = soup.find('table');
            var filas=tag.contents[1]
            var h2=filas.find("h2").nextElement.nextElement
            response.send("El valor del dolar es de: "+h2.toString());
        })
        .catch(error => {
            ///handling error
            console.log(error);
        });
})
