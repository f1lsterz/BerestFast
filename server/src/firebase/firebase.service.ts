/* import { Inject, Injectable } from "@nestjs/common";
import * as firebaseAdmin from "firebase-admin";
import { ConfigType } from "@nestjs/config";
import config from "@config/config";

@Injectable()
export class FirebaseService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    // Ініціалізація Firebase Admin SDK
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        type: this.configService.firebase.type,
        project_id: this.configService.firebase.projectId,
        private_key_id: this.configService.firebase.privateKeyId,
        private_key: this.configService.firebase.privateKey.replace(
          /\\n/g,
          "\n"
        ),
        client_email: this.configService.firebase.clientEmail,
        client_id: this.configService.firebase.clientId,
        auth_uri: this.configService.firebase.authUri,
        token_uri: this.configService.firebase.tokenUri,
        auth_provider_x509_cert_url:
          this.configService.firebase.authProviderCertUrl,
        client_x509_cert_url: this.configService.firebase.clientCertUrl,
      }),
    });
  }

  async sendOTP(phoneNumber: string) {
    const session = await firebaseAdmin
      .auth()
      .generatePhoneNumberVerificationCode(phoneNumber);
    return { session };
  }

  async verifyOTP(session: string, otpCode: string): Promise<any> {
    const result = await firebaseAdmin
      .auth()
      .verifyPhoneNumber(session, otpCode);
    return result;
  }
}
 */
