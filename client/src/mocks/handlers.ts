import { rest } from "msw";

export const dummyUser = {
  user: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "test@test.com",
    role: "CLIENT",
  },
  accessToken: "dummyAccessToken",
  refreshToken: "dummyRefreshToken",
};

const loginHandler = rest.post("/auth/login", (_, res, ctx) => {
  return res(ctx.json(dummyUser), ctx.status(200));
});

export const handlers = [loginHandler];
