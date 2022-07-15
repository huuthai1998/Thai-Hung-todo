var user_controller = require("../controllers/user.controller");
const app = require("../app.js");
const request = require("supertest");

describe("User endpoints test", () => {
  it("should test success sign up", async () => {
    const res = await request(app).post("/user/signUp").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
      username: "testuser1",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
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

  it("should test success login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should test unsuccess login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "dev2f@gmail.com",
      password: "nothash",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
