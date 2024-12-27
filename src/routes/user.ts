import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Password } from '../services/password';
const router = Router();

interface UserInterface {
    email: string;
    role?: string;
    password: string;

    id?: string;
}



declare module 'express' {
    interface Request {
        currentUser?:  UserInterface;
    }
}


declare module 'express-session' { 
    interface Session  {
        jwt?: string;
    }
}


router.post('/signup', async (req: Request, res: Response) => {
    console.log('signup !!!!!!!!!!!', req.body);
    const { email, password, role = 'user' } = req.body as UserInterface;
    
    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new Error('Email in use');
    }
    const userModel = User.build({ email, password, role });
    // create user
    await userModel.save();

    res.status(201).send({ email: userModel.email, role, message: 'User created successfully' });
});

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password , role} = req.body as UserInterface;
    User.findOne({ email })
        .then(async (existingUser) => {
            if (!existingUser) {
                throw new Error('User not found');
            }
            const passwordsMatch = await Password.compare(
                existingUser.password,
                password
            );
            if (!passwordsMatch) {
                throw new Error('Invalid Credentials');
            }
            const topSecret = process.env.JWT_KEY || 'topsecret';
            const userToken = jwt.sign({ email: existingUser.email, id: existingUser.id , role: existingUser.role }, topSecret, {
                expiresIn: '10m'
            });
            req.session.jwt =  userToken;
            console.log('userToken.userToken', userToken);
            res.status(200).send({ message: 'Signin successfully', userToken, email });
        })
        .catch(err => {
            console.log(err);
            throw new Error(err.message);
        });
});

router.post('/signout', (req: Request, res: Response) => {
    // console.log('signout !!!!!!!!!!!', req.body);
    delete req.session.jwt;
    res.status(200).send({ message: 'Signout successfully' });

});


export default router;