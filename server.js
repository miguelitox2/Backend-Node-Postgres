import fastify from "fastify";
/* import { DatabaseMemory } from "./databasememory.js"; */
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

/* const database = new DatabaseMemory(); */
const database = new DatabasePostgres();

server.get("/", (request, reply) => {
  return res.send("Welcome to my API!");
});

/* Criar video */
server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

/* Listar todos os vídeos */
server.get("/videos", async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

/* Atualizar um vídeo */
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

/* Deletar um vídeo */
server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

console.log("Server is running!");

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
