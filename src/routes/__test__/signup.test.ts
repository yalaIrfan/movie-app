import request from 'supertest';
import { app } from '../../app';

it('Should not get signup', async () => {
    const result = await request(app)
        .post('/users/signup')
        .send({
            email: '',
            password: 'password'
        })
        .expect(400);
    expect(result).toBeDefined();
    expect(result.body).toHaveProperty('error');
    expect(result.body.error[0].msg).toEqual('Email must be valid');
});

it('Should get signup', async () => {
    const result = await request(app)
        .post('/users/signup')
        .send({
            email: 'admin@test.com',
            password: 'password'
        })
        .expect(201);

    expect(result.body).toHaveProperty('email');
    expect(result.body).toHaveProperty('role');
    expect(result.body).toHaveProperty('message');
    expect(result.body.email).toEqual('admin@test.com');
    expect(result.body.role).toEqual('user');
    expect(result.body.message).toEqual('User created successfully');
});

it('Should get not signin', async () => {
    const result1 = await request(app)
        .post('/users/signup')
        .send({
            email: 'admin@test.com',
            password: 'password'
        })
    const result = await request(app)
        .post('/users/signin')
        .send({
            email: '',
            password: 'password'
        })
        .expect(400);
    expect(result).toBeDefined();
    expect(result.body).toHaveProperty('error');
    expect(result.body.error[0].msg).toEqual('Email must be valid');
});

it('Should get signin', async () => {
    const result1 = await request(app)
        .post('/users/signup')
        .send({
            email: 'admin@test.com',
            password: 'password'
        });
    const result = await request(app)
        .post('/users/signin')
        .send({
            email: 'admin@test.com',
            password: 'password'
        })
        .expect(200);
    expect(result.body).toHaveProperty('email');
    expect(result.body).toHaveProperty('userToken');
    expect(result.body).toHaveProperty('message');
    expect(result.body.email).toEqual('admin@test.com');
    expect(result.body.message).toEqual('Signin successfully');
});


it('Should get signout', async () => {
    const result1 = await request(app)
        .post('/users/signup')
        .send({
            email: 'admin@test.com',
            password: 'password'
        });
    const result2 = await request(app)
        .post('/users/signin')
        .send({
            email: 'admin@test.com',
            password: 'password'
        })
        .expect(200);

        const result = await request(app)
        .post('/users/signout')
        .send({
            email: 'admin@test.com',
            password: 'password'
        })
        .expect(200);
    expect(result.body.message).toEqual('Signout successfully');
});

