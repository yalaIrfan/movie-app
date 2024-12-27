
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

type User = {
    email: string,
    id: string,
    role: string,
    password?: string
};

declare module 'express-session' { 
    interface Session  {
        jwt?: string;
    }
}

interface UserInterface {
    email: string;
    role?: string;
    password: string;

    id?: string;
}


const VerifyToken = (req: Request, res: Response, next: NextFunction) => {

    // const token = req.header('Authorization') as string;
    const token = req.session.jwt as string;

    if (!token || token === undefined) {
        next(new Error('Access denied'));
    }
        // res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, 'topsecret') as User;
        req.currentUser = { email: decoded.email, id: decoded.id, role: decoded.role } as UserInterface;
        next();
    } catch (error) {
        // res.status(401).json({ error: 'Invalid token' });
        next(error);
    }
};

function isAuthorized(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.currentUser?.role;
        if (userRole && roles.includes(userRole)) {
            next();
        } else {
            // res.status(403).json({ });
            next( new Error('Unauthorized') )
        }
    };
}


export { VerifyToken, isAuthorized };

