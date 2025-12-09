import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Storage setup for images
const uploadsDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Database file paths
const dataDir = path.join(__dirname, "data");
const awardsDbPath = path.join(dataDir, "awards.json");
const certificatesDbPath = path.join(dataDir, "certificates.json");
const galleryDbPath = path.join(dataDir, "gallery.json");
const partnersDbPath = path.join(dataDir, "partners.json");
const newsDbPath = path.join(dataDir, "news.json");
const eventsDbPath = path.join(dataDir, "events.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database files
if (!fs.existsSync(awardsDbPath)) {
  fs.writeFileSync(awardsDbPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(certificatesDbPath)) {
  fs.writeFileSync(certificatesDbPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(galleryDbPath)) {
  fs.writeFileSync(galleryDbPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(partnersDbPath)) {
  fs.writeFileSync(partnersDbPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(newsDbPath)) {
  fs.writeFileSync(newsDbPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(eventsDbPath)) {
  fs.writeFileSync(eventsDbPath, JSON.stringify([], null, 2));
}

// Helper functions
function readAwards() {
  try {
    const data = fs.readFileSync(awardsDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeAwards(awards) {
  fs.writeFileSync(awardsDbPath, JSON.stringify(awards, null, 2));
}

function readCertificates() {
  try {
    const data = fs.readFileSync(certificatesDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeCertificates(certificates) {
  fs.writeFileSync(certificatesDbPath, JSON.stringify(certificates, null, 2));
}

function readGallery() {
  try {
    const data = fs.readFileSync(galleryDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeGallery(gallery) {
  fs.writeFileSync(galleryDbPath, JSON.stringify(gallery, null, 2));
}

function readPartners() {
  try {
    const data = fs.readFileSync(partnersDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writePartners(partners) {
  fs.writeFileSync(partnersDbPath, JSON.stringify(partners, null, 2));
}

function readNews() {
  try {
    const data = fs.readFileSync(newsDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeNews(news) {
  fs.writeFileSync(newsDbPath, JSON.stringify(news, null, 2));
}

function readEvents() {
  try {
    const data = fs.readFileSync(eventsDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeEvents(events) {
  fs.writeFileSync(eventsDbPath, JSON.stringify(events, null, 2));
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Awards API Endpoints
app.get("/api/awards", (req, res) => {
  try {
    const awards = readAwards();
    res.json(awards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch awards" });
  }
});

app.post("/api/awards", upload.single("image"), (req, res) => {
  try {
    const { title, description, date } = req.body;
    const awards = readAwards();
    
    const newAward = {
      id: Date.now().toString(),
      title,
      description,
      date,
      image: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString()
    };
    
    awards.push(newAward);
    writeAwards(awards);
    
    res.status(201).json(newAward);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create award" });
  }
});

app.delete("/api/awards/:id", (req, res) => {
  try {
    const { id } = req.params;
    let awards = readAwards();
    
    const award = awards.find(a => a.id === id);
    if (award && award.image) {
      const imagePath = path.join(__dirname, "public", award.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    awards = awards.filter(a => a.id !== id);
    writeAwards(awards);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete award" });
  }
});

// Certificates API Endpoints
app.get("/api/certificates", (req, res) => {
  try {
    const certificates = readCertificates();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

app.post("/api/certificates", upload.single("image"), (req, res) => {
  try {
    const { title, description, date } = req.body;
    const certificates = readCertificates();
    
    const newCertificate = {
      id: Date.now().toString(),
      title,
      description,
      date,
      image: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString()
    };
    
    certificates.push(newCertificate);
    writeCertificates(certificates);
    
    res.status(201).json(newCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create certificate" });
  }
});

app.delete("/api/certificates/:id", (req, res) => {
  try {
    const { id } = req.params;
    let certificates = readCertificates();
    
    const certificate = certificates.find(c => c.id === id);
    if (certificate && certificate.image) {
      const imagePath = path.join(__dirname, "public", certificate.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    certificates = certificates.filter(c => c.id !== id);
    writeCertificates(certificates);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete certificate" });
  }
});

// Gallery API Endpoints
app.get("/api/gallery", (req, res) => {
  try {
    const gallery = readGallery();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery photos" });
  }
});

app.post("/api/gallery", upload.single("image"), (req, res) => {
  try {
    const { caption } = req.body;
    const gallery = readGallery();
    
    const newPhoto = {
      id: Date.now().toString(),
      caption,
      image: `/uploads/${req.file.filename}`,
      createdAt: new Date().toISOString()
    };
    
    gallery.push(newPhoto);
    writeGallery(gallery);
    
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
});

app.delete("/api/gallery/:id", (req, res) => {
  try {
    const { id } = req.params;
    let gallery = readGallery();
    
    const photo = gallery.find(p => p.id === id);
    if (photo && photo.image) {
      const imagePath = path.join(__dirname, "public", photo.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    gallery = gallery.filter(p => p.id !== id);
    writeGallery(gallery);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete photo" });
  }
});

// Partners API Endpoints
app.get("/api/partners", (req, res) => {
  try {
    const partners = readPartners();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partners" });
  }
});

// News API Endpoints
app.get("/api/news", (req, res) => {
  try {
    const news = readNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Events API Endpoints
app.get("/api/events", (req, res) => {
  try {
    const events = readEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Admin endpoints ready: /api/awards, /api/certificates, /api/gallery`);
});
