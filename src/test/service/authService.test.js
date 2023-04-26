const userDAO = require("../../dao/userdao/userDAO.js");
const { hashPassword } = require("../../util/encrypt/hash_password.js");
const AppError = require("../../misc/AppError.js");

// Mocking을 위한 logger Object를 만든다.
const logger = {
    info: jest.fn(),
};

describe("registerUser", () => {
    beforeEach(() => {
        logger.info.mockReset();
    });

    test("should create a new user if the user does not exist", async() =>{
        const userName = 'john123';
        const password = 'abc123456789';
        const roleType = 'user';
        const phoneNumber = '010-1234-5678';
        const mail = 'john123@example.com';
        const address = '123 Main St., Apt 4A';
    })
})

