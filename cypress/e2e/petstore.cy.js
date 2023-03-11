const users = require("../fixtures/users.json");
const body = {
  id: `${users.id}`,
  username: `${users.username}`,
  firstName: "John",
  lastName: "Smith",
  email: "Smith@email.ru",
  password: "password",
  phone: "0",
  userStatus: 5,
};
afterEach(() => {
  if (cy.gett(`${users.username}`)) {
    cy.deleteUser(`${users.username}`);
  }
});
describe("Happy path - petstore api users", () => {
  it("should UPDATE the user with the new phone number", () => {
    const newbody = {
      id: `${users.id}`,
      username: `${users.username}`,
      firstName: "John",
      lastName: "Smith",
      email: "Smith@email.ru",
      password: "password",
      phone: `${users.phone}`,
      userStatus: 5,
    };
    cy.post(body);
    cy.put(newbody, `${newbody.username}`).then((resp) => {
      expect(resp.status).to.eql(200);
    });
    cy.gett(`${newbody.username}`).then((resp) => {
      expect(resp.body.phone).to.eql(`${users.phone}`);
    });
  });
  it("should delete the user", () => {
    cy.post(body);
    cy.deleteUser(`${body.username}`).then((resp) => {
      expect(resp.status).to.be.eql(200);
    });
    cy.gett(`${body.username}`).then((resp) => {
      expect(resp.status).to.eql(404);
    });
  });

  it("should create a new user", () => {
    cy.post(body).then((response) => {
      expect(response.status).to.be.eql(200);
      expect(response.body).to.be.eql({
        code: 200,
        type: "unknown",
        message: `${users.id}`,
      });
      cy.gett(`${body.username}`).then((response) => {
        expect(response.status).to.be.eql(200);
        expect(response.body.username).to.be.eql(`${body.username}`);
      });
    });
  });
});

describe("Unhappy path - petstore api users", () => {
  it("should delete invalid username", () => {
    cy.post(body);
    cy.deleteUser(`${users.wrongName}`).then((resp) => {
      expect(resp.status).to.eql(404);
    });
  });
  it("should delete the same user twice", () => {
    cy.post(body);
    cy.deleteUser(`${body.username}`).then((resp) => {
      expect(resp.status).to.eql(200);
    });
    cy.deleteUser(`${body.username}`).then((resp) => {
      expect(resp.status).to.eql(404);
    });
  });
});
