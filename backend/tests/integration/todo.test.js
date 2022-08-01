const app = require("../../src/app");
const request = require("supertest");

let test = {
  token: "",
  todoID: "",
  wrong_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imh1bmdAZ21haWwuY29tIn0.cLS7izFOxGm1rvqFm_v7HBvRLFpwma9rskIC6t84fzM",
};

describe("Todo endpoints test", () => {
  it("should test get no todos", async () => {
    // Prepare user for testing todo APIs
    await request(app).post("/user/signUp").send({
      email: "test@gmail.com",
      password: "test",
      username: "test",
    });
    const resUser = await request(app).post("/user/login").send({
      email: "test@gmail.com",
      password: "test",
    });
    test.token = resUser.body.token;

    const res = await request(app)
      .get("/todo/")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
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
    if (res.body.data) test.todoID = res.body.data.id;
  });

  it("should test create new todo failed, database create error", async () => {
    const res = await request(app)
      .post("/todo/")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send({ status: "wrong type" });
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });

  it("should test get all todos", async () => {
    const res = await request(app)
      .get("/todo/")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.count).toBe(1);
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

  it("should test edit a todo failed, database edit error", async () => {
    const res = await request(app)
      .patch(`/todo/${test.todoID}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send({ priority: "wrong type" });
    expect(res.status).toBe(500);
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

  it("should test delete a todo failed, database delete error", async () => {
    const res = await request(app)
      .delete(`/todo/wrong-id`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.token}`,
      })
      .send();
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Todo endpoints failed with not exist email in token", () => {
  it("should test get todos failed", async () => {
    const res = await request(app)
      .get("/todo/")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.wrong_token}`,
      })
      .send();
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should test create new todo failed", async () => {
    const res = await request(app)
      .post("/todo/")
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.wrong_token}`,
      })
      .send({});
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should test edit a todo failed", async () => {
    const res = await request(app)
      .patch(`/todo/${test.todoID}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.wrong_token}`,
      })
      .send({ priority: "MEDIUM" });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("should test delete a todo failed", async () => {
    const res = await request(app)
      .delete(`/todo/${test.todoID}`)
      .set({
        Accept: "application/json",
        Authorization: `Bearer ${test.wrong_token}`,
      })
      .send();
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
