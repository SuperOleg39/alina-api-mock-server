const Fastify = require("fastify");
const swaggerPlugin = require("@fastify/swagger");
const swaggerUiPlugin = require("@fastify/swagger-ui");
const { Repository } = require("./repository.js");

const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

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
      id: { type: "number" },
      name: { type: "string" },
      surname: { type: "string" },
      lastMessage: { type: "string" },
      avatarImg: { type: "string" },
    },
  });

  fastify.addSchema({
    $id: "message",
    type: "object",
    properties: {
      id: { type: "number" },
      author: { type: "number" },
      text: { type: "string" },
      date: { type: "string" },
      attachment: {
        type: "object",
        properties: {
          type: { type: "string" },
          value: { type: "string" },
        },
      },
    },
  });

  fastify.decorate("repository", new Repository());

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
      async function (request, reply) {
        const response = await this.repository.getContacts();

        reply.send(response);
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
      async function (request, reply) {
        const contactId = request.params.id;
        const response = await this.repository.getContact(contactId);

        reply.send(response);
      }
    );

    fastify.get(
      "/messages/:id",
      {
        schema: {
          description: "Get messages list by contact id",
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
            200: {
              type: "array",
              items: { $ref: "message#" },
            },
          },
        },
      },
      async function (request, reply) {
        const contactId = request.params.id;
        const response = await this.repository.getMessages(contactId);

        reply.send(response);
      }
    );
  });

  fastify.post(
    "/messages/:id",
    {
      schema: {
        description: "Send message for contact",
        params: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "user id",
            },
          },
        },
        body: {
          type: "object",
          properties: {
            text: { type: "string" },
            date: { type: "string" },
            attachment: { type: "string" },
          },
          required: ["text", "date"],
        },
        response: {
          200: { $ref: "message#" },
        },
      },
    },
    async function (request, reply) {
      const contactId = request.params.id;
      const message = request.body;
      const response = await this.repository.sendMessage(contactId, message);

      reply.send(response);
    }
  );

  fastify.listen({ host, port }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
}

main();
