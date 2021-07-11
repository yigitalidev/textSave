const fs = require('fs');
const qs = require('querystring');

const data = (req,res) => {
    const url = req.url;
    const method = req.method;
    
    res.setHeader('Content-Type', 'text/html');
    
    if (url === '/') {
        res.write(`
             <html>
                <head>
                <h1>Please enter your text in the Text Box</h1>
                   <title>Enter Message</title>
                </head>
                <body>
                    <form method="POST" action="/log">
                        <input type="text" name="message">
                        <button type="submit">Enter</button><br>
                <h3>These codes are written with node js</h3>
                    </form>
                </body>
             </html>  
        `);
        return res.end();
    }
    
    if (url === '/log' && method === 'POST') {
    
        const object = [];

        req.on('data', (vers)=>{
            object.push(vers);
        })

        req.on('end', ()=>{
            const objParse = Buffer.concat(object).toString();
            const message = objParse.split('=')[1];
            fs.appendFileSync('message.txt',message)
            console.log(qs.parse(objParse))
        })
    
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
};

module.exports=data