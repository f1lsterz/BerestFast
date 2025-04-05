import { Inject, Injectable } from "@nestjs/common";
import config from "../config/config";
import { ConfigType } from "@nestjs/config";
import { Twilio } from "twilio";

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {
    this.client = new Twilio(
      this.configService.twilio.accountSid,
      this.configService.twilio.authToken
    );
  }

  async sendVerificationCode(phoneNumber: string): Promise<void> {
    await this.client.verify.v2
      .services(this.configService.twilio.verificationSid!)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });
  }

  async checkVerificationCode(
    phoneNumber: string,
    code: string
  ): Promise<boolean> {
    const result = await this.client.verify.v2
      .services(this.configService.twilio.verificationSid!)
      .verificationChecks.create({
        to: phoneNumber,
        code,
      });

    return result.status === "approved";
  }
}
