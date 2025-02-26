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
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
  socket: {
    chatPort: process.env.SOCKET_CHAT_PORT || 3001,
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
}));
