import fs from "fs/promises";
import { errorResponse, successResponse } from "./responseControllers.js";

export const getAllUsers = async (req, res, next) => {
    console.log(req.body.user);
    try {
        const users = JSON.parse(await fs.readFile('users.json', 'utf-8'));
        successResponse(res, 200, 'all the users is returned', users);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}