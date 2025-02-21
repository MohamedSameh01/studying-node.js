"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server = http.createServer((req, res) => {
    const { url } = req;
    const productsFilePath = path_1.default.join(__dirname, "..", "src", "Data", "Products.json");
    console.log("req url", req.url);
    if (url === "/products") {
        // take care of that res === response
        fs_1.default.access(productsFilePath, (err) => {
            if (err) {
                return err;
            }
            fs_1.default.readFile(productsFilePath, "utf8", (err, data) => {
                const jsonProducts = JSON.parse(data);
                const submitedData = { id: 9, title: "product 10" };
                jsonProducts.products.push(submitedData);
                const updatedData = JSON.stringify(jsonProducts, null, 2);
                fs_1.default.writeFile(productsFilePath, updatedData, { flag: "w" }, (err) => {
                    console.log(err);
                });
                res.writeHead(200, { "content-type": "application/json" });
                console.log("DATA =>", jsonProducts);
                res.write(data);
                res.end();
            });
        });
    }
    else if (url === "/products/new") {
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
    }
    else if (req.method === "POST" && url === "/add-product") {
        let body = "";
        req.on("data", (chunck) => {
            body += chunck.toString();
        });
        req.on("end", () => {
            const data = new URLSearchParams(body);
            const title = data.get("title");
            const id = data.get("id");
            console.log("final data ->", data);
            res.writeHead(200, { "content-type": "text/html" });
            res.write(`<h1>product Id is :${id} </h1>`);
            res.write(`<h1>product title is :${title} </h1>`);
            res.end();
        });
    }
    else if (url === "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>welocme back</h1>");
        res.end();
    }
    else {
        res.writeHead(404, { "content-type": "text/html" });
        res.write("<h1>Eror 404</h1>");
        res.write("<h1>not Found request</h1>");
        res.end();
    }
});
const PORT = 5000;
server.listen(PORT);
console.log(`server now is live on => http://localhost:${PORT}`);
