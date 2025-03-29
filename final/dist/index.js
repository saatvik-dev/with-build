// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  kitchenSize: text("kitchen_size"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  kitchenSize: true,
  message: true
});
var insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true
});

// server/storage.ts
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
var { Pool } = pg;
var MemStorage = class {
  users;
  contacts;
  newsletters;
  currentUserId;
  currentContactId;
  currentNewsletterId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentNewsletterId = 1;
  }
  async initializeDatabase() {
    return Promise.resolve();
  }
  // User methods
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Contact methods
  async createContactSubmission(contactData) {
    const id = this.currentContactId++;
    const now = /* @__PURE__ */ new Date();
    const contact = {
      id,
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      kitchenSize: contactData.kitchenSize || null,
      message: contactData.message || null,
      createdAt: now
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async getAllContactSubmissions() {
    return Array.from(this.contacts.values());
  }
  // Newsletter methods
  async subscribeToNewsletter(newsletterData) {
    const id = this.currentNewsletterId++;
    const now = /* @__PURE__ */ new Date();
    const newsletter = {
      ...newsletterData,
      id,
      createdAt: now
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  async isEmailSubscribed(email) {
    return Array.from(this.newsletters.values()).some(
      (newsletter) => newsletter.email === email
    );
  }
};
var PostgresStorage = class {
  pool;
  db;
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
    this.db = drizzle(this.pool);
  }
  // Initialize database by creating tables
  async initializeDatabase() {
    try {
      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `;
      const createContactsTable = `
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(255) NOT NULL,
          kitchen_size VARCHAR(255),
          message TEXT,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      const createNewslettersTable = `
        CREATE TABLE IF NOT EXISTS newsletters (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `;
      await this.pool.query(createUsersTable);
      await this.pool.query(createContactsTable);
      await this.pool.query(createNewslettersTable);
      console.log("Database tables initialized successfully");
    } catch (error) {
      console.error("Error initializing database tables:", error);
    }
  }
  // User methods
  async getUser(id) {
    try {
      const result = await this.db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error("Error getting user:", error);
      return void 0;
    }
  }
  async getUserByUsername(username) {
    try {
      const result = await this.db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error("Error getting user by username:", error);
      return void 0;
    }
  }
  async createUser(userData) {
    try {
      const result = await this.db.insert(users).values(userData).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  // Contact methods
  async createContactSubmission(contactData) {
    try {
      const result = await this.db.insert(contactSubmissions).values({
        ...contactData,
        createdAt: /* @__PURE__ */ new Date()
      }).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating contact submission:", error);
      throw error;
    }
  }
  async getAllContactSubmissions() {
    try {
      return await this.db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
    } catch (error) {
      console.error("Error getting all contact submissions:", error);
      return [];
    }
  }
  // Newsletter methods
  async subscribeToNewsletter(newsletterData) {
    try {
      const result = await this.db.insert(newsletters).values({
        ...newsletterData,
        createdAt: /* @__PURE__ */ new Date()
      }).returning();
      return result[0];
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      throw error;
    }
  }
  async isEmailSubscribed(email) {
    try {
      const result = await this.db.select().from(newsletters).where(eq(newsletters.email, email));
      return result.length > 0;
    } catch (error) {
      console.error("Error checking if email is subscribed:", error);
      return false;
    }
  }
};
var storageImplementation;
if (process.env.DATABASE_URL) {
  console.log("Using PostgreSQL storage implementation");
  storageImplementation = new PostgresStorage();
} else {
  console.log("Using in-memory storage implementation");
  storageImplementation = new MemStorage();
}
var storage = storageImplementation;

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        kitchenSize: req.body.kitchenSize,
        message: req.body.message
      });
      const submission = await storage.createContactSubmission(contactData);
      return res.status(201).json({
        success: true,
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }
      const newsletterData = insertNewsletterSchema.parse({ email });
      const isSubscribed = await storage.isEmailSubscribed(email);
      if (isSubscribed) {
        return res.status(200).json({
          success: true,
          message: "Email is already subscribed"
        });
      }
      const subscription = await storage.subscribeToNewsletter(newsletterData);
      return res.status(201).json({
        success: true,
        message: "Subscribed to newsletter successfully",
        data: subscription
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
  app2.get("/api/admin/contacts", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      return res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  try {
    await storage.initializeDatabase();
    log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, "localhost", () => {
    log(`serving on port ${port}`);
  });
})();
