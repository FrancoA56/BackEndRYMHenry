const app = require('../src/app');
const session = require('supertest');
const agent = session(app);
const users = require("../src/utils/users")

describe("Test de RUTAS", ()=>{
    describe("GET /rickandmorty/character/:id", ()=>{
        it("Responde con status: 200", async ()=>{
            const pedido = await agent.get('/rickandmorty/character/1');
            expect(pedido.statusCode).toBe(200);
        });
        it("Responde un objeto con las propiedades: id, name, species, gender, status, origin e image", async ()=>{
            const pedido = await agent.get('/rickandmorty/character/1');
            expect(pedido.body).toHaveProperty("id");
            expect(pedido.body).toHaveProperty("name");
            expect(pedido.body).toHaveProperty("species");
            expect(pedido.body).toHaveProperty("gender");
            expect(pedido.body).toHaveProperty("status");
            expect(pedido.body).toHaveProperty("origin");
            expect(pedido.body).toHaveProperty("image");
        });
        it("Si hay un error responde con status: 500", async()=>{
            const pedido = await agent.get('/rickandmorty/character/1');
            expect(pedido.body.id).not.toBe(900);
            expect(pedido.body.id).not.toBe("string");
            expect(pedido.body.id).not.toBe({});
            expect(pedido.body.id).not.toBe([]);
        })
    });

    describe("GET /rickandmorty/login", ()=>{
        it("Los datos pasados por query para logearse deben ser los correctos", async()=>{
            const user = users.user;
            const email = users.email;
            const password = users.password;
            const pedido = await agent.get("/rickandmorty/login?user=Franco&email=franco.adamoli@gmail.com&password=amarillo6");
            expect(pedido.query).toBe(user);
            expect(pedido.query).toBe(email);
            expect(pedido.query).toBe(password);
        })
        it("Si la informacion de login es correcta recibir {access: true}", async()=>{
            const pedido = await agent.get("/rickandmorty/login?user=Franco&email=franco.adamoli@gmail.com&password=amarillo6");
            expect(pedido.body).toEqual({ access: true })
        });
        it("Si la informacion de login es incorrecta recibir {access: false}", async()=>{
            const pedido = await agent.get("/rickandmorty/login?user=Fran&email=framoli@gmacom&password=amlo6");
            expect(pedido.body).toEqual({ access: false })
        });
    });
    xdescribe("POST /rickandmorty/fav", ()=>{
        
    });
    xdescribe("DELETE /rickandmorty/fav/:id", ()=>{
        
    })
})