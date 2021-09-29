import * as express from "express";
export const router = express.Router();

/**
 * Load Instance of a Module the call the handler
 * If the Handler is Async the data will send when the Promies is fullfiled
 * First the Folder with normal modules will check
 */

router.all('/*', (req, res)=>{
    res.send("html");
});


export * as html from "./html";