import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  server: {
    port: process.env.SERVER_PORT || 3000,
    url: process.env.SERVER_URL || "http://localhost",
  },
  database: {
    url: process.env.DATABASE_URL || "mysql://root:123456@localhost:3306/dely",
  },
  secret: process.env.JWT_SECRET || "dely",
  signOptions: {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
  },
  refreshSignOptions: {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  socket: {
    chatPort: process.env.SOCKET_CHAT_PORT || 3001,
  },
  redis: {
    host: /* process.env.REDIS_HOST || */ "localhost",
    port: /* process.env.REDIS_PORT  ||*/ 6379,
  },
  aws: {
    region: process.env.AWS_REGION || "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucket: process.env.AWS_S3_BUCKET_NAME || "dely-files",
      productImagesFolder: "products/",
      chatImagesFolder: "chats/",
    },
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
}));
