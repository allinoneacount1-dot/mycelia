import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json({ limit: "50mb" }));

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // 1. Video Generation (veo-3.1-fast-generate-preview)
  app.post("/api/generate-video", async (req, res) => {
    try {
      const { imageBytes, prompt, aspectRatio } = req.body;
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'A visually stunning video',
        image: {
          imageBytes,
          mimeType: 'image/jpeg',
        },
        config: {
          numberOfVideos: 1,
          aspectRatio: aspectRatio || '16:9'
        }
      });
      res.json({ operationName: operation.name });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/video-status", async (req, res) => {
    try {
      const op = new GenerateVideosOperation();
      op.name = req.body.operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      res.json({ done: updated.done });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/video-download", async (req, res) => {
    try {
      const op = new GenerateVideosOperation();
      op.name = req.body.operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
      if (!uri) return res.status(404).json({ error: 'Video URI not found' });
      
      const videoRes = await globalThis.fetch(uri, {
        headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY as string },
      });
      
      res.setHeader('Content-Type', 'video/mp4');
      const buffer = await videoRes.arrayBuffer();
      res.end(Buffer.from(buffer));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // 2. Image Generation (gemini-3-pro-image-preview)
  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, size } = req.body;
      const interaction = await ai.interactions.create({
        model: 'gemini-3-pro-image-preview',
        input: prompt,
        response_modalities: ['image', 'text'],
        generation_config: {
          image_config: {
            aspect_ratio: "1:1",
            image_size: size // '1K', '2K', or '4K'
          },
        },
      });
      
      let base64 = "";
      let mimeType = "";
      for (const step of interaction.steps || []) {
        if (step.type === 'model_output') {
          const imageContent = step.content?.find(c => c.type === 'image');
          if (imageContent && imageContent.data) {
            base64 = imageContent.data;
            mimeType = imageContent.mime_type || 'image/png';
          }
        }
      }
      res.json({ image: `data:${mimeType};base64,${base64}` });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  });

  // 3. High Thinking (gemini-3.1-pro-preview)
  app.post("/api/intelligence-chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: 'HIGH'
          }
        }
      });
      res.json({ text: response.text });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // 4. Low Latency (gemini-3.1-flash-lite)
  app.post("/api/reflex-chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt
      });
      res.json({ text: response.text });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
