const app = require("../../src/app");
const request = require("supertest");

let header = {};

describe("User endpoints test", () => {
  it("should test success sign up", async () => {
    const res = await request(app).post("/user/signUp").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
      username: "testuser1",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should test unsuccess sign up due to taken email", async () => {
    const res = await request(app).post("/user/signUp").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
      username: "testuser1",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });

  it("should test unsuccess login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "dev2f@gmail.com",
      password: "nothash",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should test success login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    header = {
      Accept: "application/json",
      Authorization: `Bearer ${res.body.token}`,
    };
  });

  it("should be able to get user's info", async () => {
    const res = await request(app).get("/user").set(header).send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("avatar", "email", "username");
  });

  it("no token provided, should fail to get user info", async () => {
    const res = await request(app).get("/user").send();
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should be able to update user's info", async () => {
    const res = await request(app).put("/user").set(header).send({
      username: "I just got updated",
      avatar: "Random pic",
      oldPassword: "thisisnothash",
      newPassword: "thisisnothash2",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("avatar", "email", "username");
    const { avatar, username } = res.body.user;
    expect(avatar).toBe("Random pic");
    expect(username).toBe("I just got updated");
  });

  it("wrong old password, should fail to change password", async () => {
    const res = await request(app).put("/user").set(header).send({
      oldPassword: "thisisnothash_wrong",
      newPassword: "thisisnothash2",
    });
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Password is incorrect");
  });

  it("no token provided, should fail to update user info", async () => {
    const res = await request(app).get("/user").send();
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
