import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API to save data to JSON file
  app.post("/api/save-data", (req, res) => {
    try {
      const newData = req.body;
      const filePath = path.join(__dirname, "src", "data", "initialData.json");
      
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf-8");
      
      res.json({ success: true, message: "Data saved successfully to JSON file" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ success: false, message: "Failed to save data" });
    }
  });

  // API for Admin Login
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    // In a real app, use environment variables and hashing
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
    
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  });

  // API for Contact Form
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const contactMessage = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      };

      const messagesPath = path.join(__dirname, "src", "data", "messages.json");
      let messages = [];
      
      if (fs.existsSync(messagesPath)) {
        const fileContent = fs.readFileSync(messagesPath, "utf-8");
        messages = JSON.parse(fileContent);
      }
      
      messages.push(contactMessage);
      fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), "utf-8");
      
      console.log(`New contact message from ${name} (${email}): ${subject}`);
      res.json({ success: true, message: "Message received successfully" });
    } catch (error) {
      console.error("Error handling contact message:", error);
      res.status(500).json({ success: false, message: "Failed to process message" });
    }
  });

  // API to get all messages
  app.get("/api/messages", (req, res) => {
    try {
      const messagesPath = path.join(__dirname, "src", "data", "messages.json");
      let messages = [];
      
      if (fs.existsSync(messagesPath)) {
        const fileContent = fs.readFileSync(messagesPath, "utf-8");
        messages = JSON.parse(fileContent);
      }
      
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ success: false, message: "Failed to fetch messages" });
    }
  });

  // API to delete a message
  app.delete("/api/messages/:id", (req, res) => {
    try {
      const { id } = req.params;
      const messagesPath = path.join(__dirname, "src", "data", "messages.json");
      
      if (!fs.existsSync(messagesPath)) {
        return res.status(404).json({ success: false, message: "No messages found" });
      }

      const fileContent = fs.readFileSync(messagesPath, "utf-8");
      let messages = JSON.parse(fileContent);
      
      const initialLength = messages.length;
      messages = messages.filter(msg => msg.id.toString() !== id);
      
      if (messages.length === initialLength) {
        return res.status(404).json({ success: false, message: "Message not found" });
      }

      fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), "utf-8");
      res.json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      res.status(500).json({ success: false, message: "Failed to delete message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
