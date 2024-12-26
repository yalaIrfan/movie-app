import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
// import Session from 'express-session'
import { User } from '../models/User';
const router = Router();

interface UserAttrs {
    email: string;
    password: string;
}

router.post('/signup', async (req: Request, res: Response) => {
    console.log('signup !!!!!!!!!!!', req.body);
    const { email, password } = req.body as UserAttrs;
    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (user) {
        // throw new Error('Email in use');
    }
    const userModel = User.build({ email, password });
    // create user
    await userModel.save();
    const topSecret = process.env.JWT_KEY || 'topsecret';
    const userToken = jwt.sign({ email, id: userModel.id }, topSecret);
    // req.session.jwt = userToken;
    console.log(userToken);
    res.status(201).send({ email: userModel.email, message: 'User created successfully' });
});

router.post('/signin', async (req: Request, res: Response) => {
    const { email, password }: UserAttrs = req.body;
    User.findOne({ where: { email, password } }).then(user => {
        if (!user) {
            throw new Error('User not found');
        }
        // jwt generate add role details user detail in token

        res.status(200).send(user);
    })
        .catch(err => {
            console.log(err);
            throw new Error('Internal server error');
        });
});

router.post('/signout', async (req: Request, res: Response) => {
    // delete req.session;
    res.send({ message: 'Signout successfully' });
});


export default router;