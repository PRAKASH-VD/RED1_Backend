
import express from "express";

import { createCheckout } from "../Controllers/paymentController.js";


const Router = express.Router();

Router.post("/checkout", createCheckout);


export default Router;