import * as http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  const { url } = req;
  const productsFilePath = path.join(
    __dirname,
    "..",
    "src",
    "Data",
    "Products.json"
  );
  console.log("req url", req.url);

  if (url === "/products") {
    // take care of that res === response

    fs.access(productsFilePath, (err) => {
      if (err) {
        return err;
      }

      fs.readFile(productsFilePath, "utf8", (err, data) => {
        const jsonProducts:{products:[{id:number,title:string}]} = JSON.parse(data);
        const submitedData = { id:9, title: "product 10" };

        
      

       

        res.writeHead(200, { "content-type": "application/json" });
        console.log("DATA =>", jsonProducts);
        res.write(data);
        res.end();
      });
    });
  } else if (url === "/products/new") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(`
            <div>
              <form action="/add-product" method="POST">
                <label>Id</label>
                <input type="number" name="id" placeholder="ID"/>
                <label>product title</label>
                <input type="text" name="title" placeholder="product title"/>
                <br/><br/><br/>
                <button type="submit">submit</button>
              </form>
            </div>
        `);
    res.end();
  } else if (req.method === "POST" && url === "/add-product") {
    let body = "";
    req.on("data", (chunck) => {
      body += chunck.toString();
    });

    req.on("end", () => {



      const data = new URLSearchParams(body);
      const title = data.get("title");
      const id = data.get("id");




        fs.readFile(productsFilePath, "utf8", (err: any, data:any) => {
        const jsonProducts:{products:[{id:number,title:string}]} = JSON.parse(data);
        jsonProducts.products.push({id:id as number,title:title as string})
        const updatedData=JSON.stringify(jsonProducts,null,2);
      
       fs.writeFile(
          productsFilePath,
          updatedData,
          { flag: "w" },
          (err) => {
            console.log(err);
          }
        );
      }

        
      res.writeHead(200, { "content-type": "text/html" });

      res.write(`<h1>product Id is :${id} </h1>`);
      res.write(`<h1>product title is :${title} </h1>`);
      res.end();
    });
  } else if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>welocme back</h1>");
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Eror 404</h1>");
    res.write("<h1>not Found request</h1>");
    res.end();
  }
});

const PORT = 5000;
server.listen(PORT);
console.log(`server now is live on => http://localhost:${PORT}`);
