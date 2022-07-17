const app = require("../app.js");
const request = require("supertest");

describe("Todo endpoints test", () => {
  const test = {};
  it("should test get no todos", async () => {
    await request(app).post("/user/signUp").send({
      email: "test@gmail.com",
      password: "test",
      username: "test",
    });
    const resUser = await request(app).post("/user/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    const token = resUser.body.token;
    test["token"] = token;
    const res = await request(app)
      .get("/todo/")
      .set({ Accept: "application/json", Authorization: `Bearer ${token}` })
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should test create new todo", async () => {
    const res = await request(app)
      .post("/todo/")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send({
        content: "Testing valid create request",
        status: "INPROGRESS",
        category: "PERSONAL",
        priority: "URGENT",
        dueDate: "Thu Jul 15 2022 14:30:57 GMT+0700 (Indochina Time)",
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
    if (res.body.data) test["todoID"] = res.body.data.id;
  });

  it("should test edit a todo", async () => {
    const res = await request(app)
      .patch(`/todo/${test.todoID}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send({ priority: "MEDIUM" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should test delete a todo", async () => {
    const res = await request(app)
      .delete(`/todo/${test.todoID}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
