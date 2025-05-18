"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = 3000;
// Serve a simple HTML UI for the root endpoint.
app.get("/", (req, res) => {
    const html = `
    <html>
      <head>
        <title>Frontend UI</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          button { margin: 10px; padding: 10px 20px; font-size: 16px; }
          .result { margin-top: 20px; padding: 10px; border: 1px solid #ddd; background: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>Welcome to the Frontend Service!</h1>
        <p>Click a button to call a backend service:</p>
        <button onclick="location.href='/use-backend-a'">Call Backend-A</button>
        <button onclick="location.href='/use-backend-b'">Call Backend-B</button>
      </body>
    </html>
  `;
    res.send(html);
});
// Endpoint that calls Backend-A (which calls Backend-B) and returns an HTML page.
app.get("/use-backend-a", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.BACKEND_A}/call-backend-b`);
        const data = response.data;
        console.log("Data from Backend-A:", data);
        const html = `
      <html>
        <head>
          <title>Result from Backend-A</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .result { margin-top: 20px; padding: 10px; border: 1px solid #ddd; background: #f9f9f9; }
            a { display: inline-block; margin-top: 20px; text-decoration: none; color: #007BFF; }
          </style>
        </head>
        <body>
          <h1>Response from Backend-A Flow</h1>
          <div class="result">
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
          <a href="/">Back to Home</a>
        </body>
      </html>
    `;
        res.send(html);
    }
    catch (error) {
        console.error("Error calling Backend-A:", error.message);
        res
            .status(500)
            .send(`<h1>Error occurred:</h1><p>${error.message}</p><a href="/">Back Home</a>`);
    }
}));
// Endpoint that calls Backend-B (which calls Backend-A) and returns an HTML page.
app.get("/use-backend-b", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.BACKEND_B}/call-backend-a`);
        const data = response.data;
        console.log("Data from Backend-B:", data);
        const html = `
      <html>
        <head>
          <title>Result from Backend-B</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .result { margin-top: 20px; padding: 10px; border: 1px solid #ddd; background: #f9f9f9; }
            a { display: inline-block; margin-top: 20px; text-decoration: none; color: #007BFF; }
          </style>
        </head>
        <body>
          <h1>Response from Backend-B Flow</h1>
          <div class="result">
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
          <a href="/">Back to Home</a>
        </body>
      </html>
    `;
        res.send(html);
    }
    catch (error) {
        console.error("Error calling Backend-B:", error.message);
        res
            .status(500)
            .send(`<h1>Error occurred:</h1><p>${error.message}</p><a href="/">Back Home</a>`);
    }
}));
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend listening on http://0.0.0.0:${PORT}`);
});
