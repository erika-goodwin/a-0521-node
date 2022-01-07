const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method

    if(url === '/'){
        res.write(`
            <html>
                <head>
                    <title>First Page</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message" />
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `)
        return res.end() //we should exit out of the function
    }

    if(url === '/message' && method === 'POST'){

        //parsing req data
        const body = []

        req.on('data', (chunk) => { // "on" is a listener to certain events
            // console.log(chunk); //Buffer object or binary data
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1]
            // fs.writeFileSync('lect-01.txt', message)
            fs.writeFile('lect-01.txt', message, (err) => {
                if(err) throw err
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })

        }) // eventlistener that gets triggered once the incoming request is done
        
    }
}


module.exports = requestHandler