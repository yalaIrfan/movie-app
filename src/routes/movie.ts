import { Request, Response, Router } from "express";
import { Movie } from '../models/Movie';

const router = Router();


router.get('/movies', async (req: Request, res: Response) => {
    console.log('Running now !');
    const movies = await Movie.find();
    res.status(200).send(movies);
}).get('/search', async (req: Request, res: Response) => {
    console.log('Running now !');
    const query = req.query;
    console.log(query);
    const movies = await Movie.find(
        {
            where: { query}
        }
    );
    res.status(200).send(movies);
});

router.post('/movies', async (req: Request, res: Response) => {
    console.log('REQUEST BODY ', req.body);
    const m = await Movie.create(req.body);
    res.status(201).send(m);
});

router.put('/movies/:id', async (req: Request, res: Response) => {
    console.log('REQUEST BODY ', req.body);
    const id = req.params.id;
    let theMovie = await Movie.findById(id);
    res.status(200).send(theMovie);
});

router.delete('/movies/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    res.send('Deleted');
    // const theMovie = await Movie.destroy({ where: { id } });
    // res.status(theMovie ? 204 : 404).send(theMovie ? 'Deleted' : 'Not Found');
});



export default router;
