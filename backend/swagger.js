// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Public Participation API",
      version: "1.0.0",
      description: "API for public participation applications",
      contact: {
        name: "Wafula",
        email: "jobwafulabg@gmail.com",
      },
      servers: ["http://localhost:5000"],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["Citizen", "Government Official", "NGO", "Admin"],
            },
            profilePicture: {
              type: "string",
            },
            isVerified: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Forum: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
              description: "Title of the forum post",
            },
            content: {
              type: "string",
              description: "Content of the forum post",
            },
            author: {
              type: "string",
              description: "ID of the user who created the post",
            },
            comments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: {
                    type: "string",
                    description: "ID of the user who commented",
                  },
                  content: {
                    type: "string",
                    description: "Content of the comment",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp when the comment was created",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp when the comment was updated",
                  },
                },
              },
              description: "Array of comments on the forum post",
            },
            likes: {
              type: "array",
              items: {
                type: "string",
                description: "ID of the user who liked the post",
              },
              description: "Array of user IDs who liked the post",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
                description: "Tag for categorizing the post",
              },
              description: "Array of tags for the forum post",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the post was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the post was updated",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};