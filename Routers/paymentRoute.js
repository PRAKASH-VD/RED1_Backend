
import express from "express";

import { createChechout } from "../Controllers/paymentController.js";


const Router = express.Router();

Router.post("/checkout", createChechout);


export default Router;