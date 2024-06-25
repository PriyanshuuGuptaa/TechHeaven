const express = require("express");

const app= express();
const PORT=process.env.PORT||3001;
const products=[
    {
        n:"a",
        a:2
    },
    {
        n:"a",
        a:2
    }
];
app.get("/api/products", (req,res)=>{
    res.json(products);
});

app.listen(PORT,()=>{console.log("server started");})
