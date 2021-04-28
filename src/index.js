const express =require('express');
const app = express();


app.use(express.json());


app.get("/", (request, response)=>{
    
    return response.json([
        "Curso1",
        "Curso2",
        "Curso3"
    ]);
    
});
app.listen(3334)