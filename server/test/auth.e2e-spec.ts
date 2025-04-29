import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../src/app.module";

describe("Auth (e2e)", () => {
  let app: INestApplication;
  let refreshToken: string;
  let accessToken: string;
  const testUser = {
    name: "User",
    password: "password123",
    phoneNumber: "+380501222267",
    role: "USER",
    deviceName: "TestDevice",
    os: "TestOS",
    appVersion: "1.0.0",
    ipAddress: "127.0.0.1",
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user (POST /auth/registration)", async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/registration")
      .send(testUser)
      .expect(201);

    expect(response.body.tokens).toHaveProperty("accessToken");
    expect(response.body.tokens).toHaveProperty("refreshToken");

    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
  });

  it("should login with the registered user (POST /auth/login)", async () => {
    const loginDto = {
      phoneNumber: testUser.phoneNumber,
      password: testUser.password,
      deviceName: testUser.deviceName,
      os: testUser.os,
      appVersion: testUser.appVersion,
      ipAddress: testUser.ipAddress,
    };

    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send(loginDto)
      .expect(200);

    expect(response.body.tokens).toHaveProperty("accessToken");
    expect(response.body.tokens).toHaveProperty("refreshToken");

    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
  });

  it("should refresh the token (POST /auth/refresh)", async () => {
    const refreshDto = {
      refreshToken: refreshToken,
      userId: 1,
    };

    const response = await request(app.getHttpServer())
      .post("/auth/refresh")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(refreshDto)
      .expect(200);

    expect(response.body.tokens).toHaveProperty("accessToken");
    expect(response.body.tokens).toHaveProperty("refreshToken");

    accessToken = response.body.tokens.accessToken;
    refreshToken = response.body.tokens.refreshToken;
  });

  it("should logout the user (POST /auth/logout)", async () => {
    const logoutDto = {
      refreshToken: refreshToken,
      allDevices: false,
    };

    await request(app.getHttpServer())
      .post("/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(logoutDto)
      .expect(200);
  });
});
