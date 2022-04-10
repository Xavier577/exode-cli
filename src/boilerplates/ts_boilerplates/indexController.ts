const indexController = `import { Request, Response, NextFunction as Next } from "express";

export default function indexController(
    _req: Request,
    res: Response,
    _next: Next
) {
    res.send("<h1 style=\'color: #2266ba;\'>Hello there, let\'s get coding!</h1>");
}`;

export default indexController;
