const app = require("../src/app");
const session = require("supertest");
const agent = session(app);
const users = require("../src/utils/users");

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      const pedido = await agent.get("/rickandmorty/character/1");
      expect(pedido.statusCode).toBe(200);
    });

    it("Responde un objeto con las propiedades: id, name, species, gender, status, episodes, origin e image", async () => {
      const { body } = await agent.get("/rickandmorty/character/1");
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("species");
      expect(body).toHaveProperty("gender");
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("origin");
      expect(body).toHaveProperty("image");
      expect(body).toHaveProperty("episode");
    });

    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/rickandmorty/character/-1").expect(404);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("Los datos pasados por query para logearse deben ser los correctos", async () => {
      const user = users.user;
      const email = users.email;
      const password = users.password;
      const pedido = await agent.get(
        "/rickandmorty/login?user=Franco&email=franco.adamoli@gmail.com&password=amarillo6"
      );
      expect(pedido.query).toBe(user);
      expect(pedido.query).toBe(email);
      expect(pedido.query).toBe(password);
    });

    it("Si la informacion de login es correcta recibir {access: true}", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?user=Franco&email=franco.adamoli@gmail.com&password=amarillo6"
      );
      expect(body).toEqual({ access: true });
    });

    it("Si la informacion de login es incorrecta recibir {access: false}", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?user=Fran&email=framoli@gmacom&password=amlo6"
      );
      expect(body).toEqual({ access: false });
    });
  });

  describe("POST /rickandmorty/fav", () => {
    const favorite1 = {
      id: 1,
      name: "Rick Sanchez",
    };

    const favorite2 = {
      id: 2,
      name: "Morty Smith",
    };

    it("Agrega un nuevo elemento al enviar un objeto por body", async () => {
      const { body } = await agent.post("/rickandmorty/fav").send(favorite1);

      expect(body).toBeInstanceOf(Array);
      expect(body).toContainEqual(favorite1);
    });

    it("Agrega múltiples elementos al enviar diferentes objetos por body", async () => {
      const { body } = await agent.post("/rickandmorty/fav").send(favorite2);

      expect(body).toBeInstanceOf(Array);
      expect(body).toContainEqual(favorite1);
      expect(body).toContainEqual(favorite2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Debe devolver el arreglo sin modificar si no encuentra el id", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/3");
      expect(body).toBeInstanceOf(Array);
      expect(body).toEqual([
        {
          id: 1,
          name: "Rick Sanchez",
        },
        {
          id: 2,
          name: "Morty Smith",
        },
      ]);
    });

    it("Elimina correctamente al personaje", async () => {
      const { body } = await agent.delete("/rickandmorty/fav/1");
      expect(body).toBeInstanceOf(Array);
      expect(body).toEqual([
        {
          id: 2,
          name: "Morty Smith",
        },
      ]);
    });
  });
});
