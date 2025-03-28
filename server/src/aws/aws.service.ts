import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import config from "../config/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AWSService {
  private s3: S3Client;
  private bucketName: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    this.s3 = new S3Client({
      region: this.configService.aws.region,
      credentials: {
        accessKeyId: this.configService.aws.accessKeyId || "",
        secretAccessKey: this.configService.aws.secretAccessKey || "",
      },
    });

    this.bucketName = this.configService.aws.s3.bucket;
  }

  async uploadChatImage(file: Express.Multer.File) {
    const fileName = `${this.configService.aws.s3.chatImagesFolder}${Date.now()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "private",
      })
    );

    return `https://${this.bucketName}.s3.${this.configService.aws.region}.amazonaws.com/${fileName}`;
  }
}
