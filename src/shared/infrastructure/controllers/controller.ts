import { RequestHandler } from "express";

export interface Controller {
    post: RequestHandler;
    get: RequestHandler;
    put: RequestHandler;
    delete: RequestHandler;
}