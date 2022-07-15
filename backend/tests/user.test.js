var user_controller = require("../controllers/user.controller");
const app = require("../app.js");
const request = require("supertest");

// test("testing api: get all todos", async () => {
//   const req = {},
//         res =
//   const output = await expEight(2);
//   expect(output).toBe(256);
// });
describe("Sign up test", () => {
  it("should test that true === true", async () => {
    const res = await request(app).post("/user/signUp").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
      username: "testuser1",
    });
    console.log(res);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Sign in test", () => {
  it("should test that true === true", async () => {
    const res = await request(app).post("/user/login").send({
      email: "dev2f@gmail.com",
      password: "thisisnothash",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
