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
        Notification: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            recipient: {
              type: "string",
              description: "ID of the user receiving the notification",
            },
            message: {
              type: "string",
              description: "Content of the notification",
            },
            type: {
              type: "string",
              enum: ["New Incident", "Comment", "Status Update", "Like"],
              description: "Type of notification",
            },
            isRead: {
              type: "boolean",
              description: "Whether the notification has been read",
              default: false,
            },
            relatedIncident: {
              type: "string",
              description: "ID of the related incident (if applicable)",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the notification was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the notification was updated",
            },
          },
        },
        Petition: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
              description: "Title of the petition",
            },
            description: {
              type: "string",
              description: "Description of the petition",
            },
            author: {
              type: "string",
              description: "ID of the user who created the petition",
            },
            signatures: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: {
                    type: "string",
                    description: "ID of the user who signed the petition",
                  },
                  signedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp when the user signed the petition",
                  },
                },
              },
              description: "Array of signatures on the petition",
            },
            goal: {
              type: "number",
              description: "Target number of signatures required",
            },
            status: {
              type: "string",
              enum: ["Active", "Closed", "Achieved"],
              description: "Status of the petition",
              default: "Active",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
                description: "Tag for categorizing the petition",
              },
              description: "Array of tags for the petition",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the petition was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the petition was updated",
            },
          },
        },
        Issue: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            title: {
              type: "string",
              description: "Title of the issue",
            },
            description: {
              type: "string",
              description: "Description of the issue",
            },
            author: {
              type: "string",
              description: "ID of the user who created the issue",
            },
            status: {
              type: "string",
              enum: ["Open", "In Progress", "Resolved", "Closed"],
              description: "Status of the issue",
              default: "Open",
            },
            priority: {
              type: "string",
              enum: ["Low", "Medium", "High", "Urgent"],
              description: "Priority of the issue",
              default: "Medium",
            },
            tags: {
              type: "array",
              items: {
                type: "string",
                description: "Tag for categorizing the issue",
              },
              description: "Array of tags for the issue",
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
              description: "Array of comments on the issue",
            },
            votes: {
              type: "object",
              properties: {
                upvotes: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "ID of the user who upvoted the issue",
                  },
                  description: "Array of user IDs who upvoted the issue",
                },
                downvotes: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "ID of the user who downvoted the issue",
                  },
                  description: "Array of user IDs who downvoted the issue",
                },
              },
              description: "Votes on the issue",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the issue was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the issue was updated",
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