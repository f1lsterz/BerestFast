import { Inject, Injectable } from "@nestjs/common";
import * as firebaseAdmin from "firebase-admin";
import { ConfigType } from "@nestjs/config";
import config from "../config/config";

@Injectable()
export class FirebaseService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: this.configService.firebase.projectId,
        privateKey: this.configService.firebase.privateKey,
        clientEmail: this.configService.firebase.clientEmail,
      }),
    });
  }

  async verifyPhoneToken(idToken: string): Promise<string> {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      if (!decodedToken.phone_number) {
        throw new Error("Phone number not found in token");
      }
      return decodedToken.phone_number;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}
