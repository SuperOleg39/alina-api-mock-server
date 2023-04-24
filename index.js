import Fastify from "fastify";
import swaggerPlugin from "@fastify/swagger";
import swaggerUiPlugin from "@fastify/swagger-ui";

async function main() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(swaggerPlugin, {});

  await fastify.register(swaggerUiPlugin, {
    routePrefix: "/api-docs",
  });

  fastify.addSchema({
    $id: "user",
    type: "object",
    properties: {
      id: {
        id: "number",
        name: "string",
        surname: "string",
        lastMessage: "string",
        nameImg: "string",
      },
    },
  });

  fastify.addSchema({
    $id: "message",
    type: "object",
    properties: {
      id: {
        id: "number",
        owner: "number",
        type: "string",
        text: "string",
        date: "string",
        nameImg: "string",
        files: {
          type: "array",
          items: "string",
        },
      },
    },
  });

  fastify.register(async function (fastify) {
    fastify.get(
      "/users/all",
      {
        schema: {
          description: "Get contacts list",
          response: {
            200: {
              type: "array",
              items: { $ref: "user#" },
            },
          },
        },
      },
      (request, reply) => {
        reply.send([]);
      }
    );

    fastify.get(
      "/users/:id",
      {
        schema: {
          description: "Get contact by id",
          params: {
            type: "object",
            properties: {
              id: {
                type: "number",
                description: "user id",
              },
            },
          },
          response: {
            200: { $ref: "user#" },
          },
        },
      },
      (request, reply) => {
        reply.send({});
      }
    );

    fastify.get(
      "/messages/:id",
      {
        schema: {
          description: "Get messages list by contact id",
          properties: {
            id: {
              type: "number",
              description: "user id",
            },
          },
          response: {
            200: {
              type: "array",
              items: { $ref: "message#" },
            },
          },
        },
      },
      (request, reply) => {
        reply.send([]);
      }
    );
  });

  // @todo: send message

  fastify.listen({ port: 4000 }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
}

main();
