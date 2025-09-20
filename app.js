const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));//location
    
app.set('views','./views');//engine set-up
app.set('view engine', 'ejs');//engine set-up


app.get('/',(req,res) => {
    res.render('index');
});


app.get('/about',(req,res) => {
    res.render('about');
});

app.listen(port, () => {
    console.info('App is running on port ${port}');
}); 
