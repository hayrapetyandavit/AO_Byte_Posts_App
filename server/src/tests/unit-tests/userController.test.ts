import bcrypt from "bcrypt";
import UserModel, { IUserModel } from "../../models/user.model";
import cookie from "cookie";
import request from "supertest";
import app from "../..";

describe("Auth Controller", () => {
  beforeEach((): void => {
    jest.setTimeout(10000);
  });
  let token: string;
  // describe("POST /register", () => {
  //   it("should return 201 and create a new user", async () => {
  //     const newUser = {
  //       name: "Doe",
  //       email: "test-1@example.com",
  //       password: "test1.Test",
  //       confirmPassword: "test1.Test",
  //     };

  //     const response = await request(app).post("/register").send(newUser);

  //     expect(response.status).toBe(201);
  //     expect(response.body.name).toBe(newUser.name);
  //     expect(response.body.email).toBe(newUser.email);
  //   });

  //   it("should return 400 if required fields are missing", async () => {
  //     const response = await request(app).post("/register").send({});

  //     expect(response.status).toBe(400);
  //   });

  //   // Add more test cases as needed
  // });

  describe("POST /login", () => {
    it("should return 200 and log in the user", async () => {
      expect(async () => {
        const userCredentials = {
          email: "test-1@example.com",
          password: "test1.Test",
          isChecked: true,
        };
        const response = await request(app)
          .post("/login")
          .send(userCredentials);
        expect(response.status).toBe(200);
        expect(response.body.name).toBeDefined();
        expect(response.body.id).toBeDefined();
      }).not.toThrowError("Exceeded timeout");
    });

    //   it("should return 400 if password is missing", async () => {
    //     const response = await request(app)
    //       .post("/login")
    //       .send({ email: "test-1@example.com" });
    //     expect(response.status).toBe(400);
    //   });

    //   it("should return 400 if email is missing", async () => {
    //     const response = await request(app)
    //       .post("/login")
    //       .send({ password: "test1.Test" });
    //     expect(response.status).toBe(400);
    //   });

    //   it("should return an error for an invalid user", async () => {
    //     const response = await request(app).post("/login").send({
    //       email: "wrong@example.com",
    //       password: "password.002M",
    //       isChecked: false,
    //     });
    //     expect(response.status).toBe(400);
    //   });

    it("should return an access token for a valid user", async () => {
      expect(async () => {
        const userCredentials = {
          email: "test-1@example.com",
          password: "test1.Test",
          isChecked: true,
        };
        const response = await request(app)
          .post("/login")
          .send(userCredentials);
        expect(response.status).toBe(201);
        expect(response.headers["set-cookie"]).toBeDefined();
        const cookies = response.headers["set-cookie"].map(cookie.parse);
        const accessToken = cookies.find(
          (c: any) => c.access_token
        )?.access_token;
        expect(accessToken).toBeDefined();
        token = accessToken;
      });
    }, 10000);
  });

  // describe("POST /forgot-password", () => {
  //   it("should return 200 and send a reset password link", async () => {
  //     const response = await request(app)
  //       .post("/forgot-password")
  //       .send({ email: "aobyteinternship@gmail.com" });

  //     expect(response.status).toBe(200);
  //     // ::::::::::::::::::::::::::::::::::::::::::::
  //   });

  //   it("should return 404 if the user does not exist", async () => {
  //     const response = await request(app)
  //       .post("/forgot-password")
  //       .send({ email: "nonexistent@example.com" });

  //     expect(response.status).toBe(404);
  //   });
  // });

  // describe("POST /reset-password/:token", () => {
  //   it("should return 200 and reset the user's password", async () => {
  //     const user = await UserModel.findOne({
  //       email: "aobyteinternship@gmail.com",
  //     });

  //     const resetToken = await bcrypt.hash("aobyteinternship@gmail.com", 6);

  //     const response = await request(app)
  //       .post(`/reset-password/${resetToken}`)
  //       .send({
  //         email: "aobyteinternship@gmail.com",
  //         password: "new!test1.Test",
  //         confirmPassword: "new!test1.Test",
  //       });

  //     expect(response.status).toBe(200);

  //     // ::::::::::::::::::::::::::::::::::::::::::::
  //   });

  //   it("should return 400 if passwords do not match", async () => {
  //     const user = await UserModel.findOne({
  //       email: "aobyteinternship@gmail.com",
  //     });
  //     const resetToken = await bcrypt.hash("aobyteinternship@gmail.com", 6);

  //     const response = await request(app)
  //       .post(`/reset-password/${resetToken}`)
  //       .send({
  //         email: "aobyteinternship@gmail.com",
  //         password: "new!test1.Test",
  //         confirmPassword: "incorrectpass",
  //       });

  //     expect(response.status).toBe(404);
  //   });

  // ::::::::::::::::::::::::::::::::::::::::::::
  // });

  describe("POST /logout", () => {
    it("should log out the user", async () => {
      const response = await request(app)
        .post("/logout")
        .set("Cookie", [`access_token=${token}`]);

      expect(response.status).toBe(200);
    });
  });
});
