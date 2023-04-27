const authService = require("../../service/auth_service.js");
const userDAO = require("../../dao/userdao/userDAO.js");
const AppError = require("../../misc/AppError.js");
const { hashPassword, comparePassword } = require("../../util/encrypt/hash_password.js");

jest.mock("../../dao/userdao/userDAO.js");
jest.mock("../../util/encrypt/hash_password.js");

describe("createUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new user if the user does not exist", async () => {

    // ================ ACT ==============================
    const userName = "john123";
    const password = "abc123456789";
    const roleType = "user";
    const phoneNumber = "123-1234-5678";
    const mail = "john123@example.com";
    const address = "서울시 동작구";
    const hashedPassword = "mocked_hashed_password";

    userDAO.findByUserName.mockResolvedValue(null);
    userDAO.create.mockResolvedValue({
      userName,
      password: hashedPassword,
      roleType,
      phoneNumber,
      mail,
      address,
    });

    hashPassword.mockResolvedValue(hashedPassword);

    // ================ Assert ==============================
    const result = await authService.createUser(
      userName,
      password,
      roleType,
      phoneNumber,
      mail,
      address
    );

    expect(userDAO.findByUserName).toHaveBeenCalledWith(userName);
    expect(hashPassword).toHaveBeenCalledWith(password);
    expect(userDAO.create).toHaveBeenCalledWith({
      userName,
      password: hashedPassword,
      roleType,
      phoneNumber,
      mail,
      address,
    });
    expect(result).toEqual({
      userName,
      password: hashedPassword,
      roleType,
      phoneNumber,
      mail,
      address,
    });
  });

  test("should throw an error if the user already exists", async () => {
    const userName = "john123";
    const password = "abc123456789";
    const roleType = "user";
    const phoneNumber = "123-1234-5678";
    const mail = "john123@example.com";
    const address = "서울시 동작구";

    userDAO.findByUserName.mockResolvedValue({
      userName,
      password,
      roleType,
      phoneNumber,
      mail,
      address,
    });

    await expect(
      authService.createUser(
        userName,
        password,
        roleType,
        phoneNumber,
        mail,
        address
      )
    ).rejects.toThrow(AppError);
  });
});

describe("authenticateUser", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("authenticate user if userName and password is matched", async () => {
        // ================ ACT ==============================
        const userName = "john123";
        const password = "abc123456789";
        const roleType = "user";
        const phoneNumber = "123-1234-5678";
        const mail = "john123@example.com";
        const address = "서울시 동작구";
        const hashedPasswordForFind = "mocked_hashed_password_for_find";
        const hashedPasswordForCreate = "hashed_password_for_create";
      
        hashPassword.mockResolvedValue(hashedPasswordForCreate);
        comparePassword.mockResolvedValue(true);
      
        userDAO.findByUserName.mockResolvedValue({
          userName,
          password: hashedPasswordForFind,
          roleType,
          phoneNumber,
          mail,
          address,
        });
        userDAO.create.mockResolvedValue({
          userName,
          password: hashedPasswordForCreate,
          roleType,
          phoneNumber,
          mail,
          address,
        });
      
        // ================ Assert ==============================
        const result = await authService.authenticateUser(userName, password);
        expect(userDAO.findByUserName).toHaveBeenCalledWith(userName);
        expect(comparePassword).toHaveBeenCalledWith(
          password,
          hashedPasswordForFind
        );  
        expect(result).toEqual(undefined);
    });
});
