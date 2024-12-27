import { Request, Response, Router } from "express";
import { Movie } from '../models/Movie';
import { VerifyToken, isAuthorized } from "../services/auth-middleware";
import { Roles } from "../services/roles";
const router = Router();


router.get('/', VerifyToken, isAuthorized(Roles.All), async (req: Request, res: Response) => {
    console.log('Running now !');
    const movies = await Movie.find();
    console.log('currentUser', req.currentUser);
    res.status(200).send(movies);
});

router.get('/search', VerifyToken, isAuthorized(Roles.All), async (req: Request, res: Response) => {
    console.log('Running now !');
    const query = req.query;
    console.log(query);
    const movies = await Movie.find(query);
    res.status(200).send(movies);
});

router.post('/', VerifyToken, isAuthorized(Roles.Admin), async (req: Request, res: Response) => {
    console.log('REQUEST BODY ', req.body);
    const m = await Movie.create(req.body);
    res.status(201).send(m);
});

router.put('/:id', VerifyToken, isAuthorized(Roles.Admin), async (req: Request, res: Response) => {
    console.log('REQUEST BODY ', req.body);
    const id = req.params.id;

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedMovie) {
        res.status(404).send('Movie Not Found');
        return;
    }
    res.status(200).send(updatedMovie);
});

router.delete('/:id', VerifyToken, isAuthorized(Roles.Admin), async (req: Request, res: Response) => {
    const id = req.params.id;
    const theMovie = await Movie.findByIdAndDelete(id);
    res.send(theMovie ? 'Deleted' : 'Not Found');
});



export default router;
