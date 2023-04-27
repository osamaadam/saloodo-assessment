import { rest } from "msw";
import { Parcel } from "../api/types/Parcel";

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

export const dummyParcel: Partial<Parcel> = {
  id: 1,
  pickupAddress: "dummyPickupAddress",
  dropoffAddress: "dummyDropoffAddress",
  status: "PENDING",
  owner: dummyUser.user as any,
};

const loginHandler = rest.post("/auth/login", async (req, res, ctx) => {
  const { email } = await req.json<{ email: string; password: string }>();

  return res(ctx.json({ ...dummyUser, email }), ctx.status(200));
});

const createParcelHandler = rest.post("/parcel", async (req, res, ctx) => {
  const { pickupAddress, dropoffAddress } = await req.json<{
    pickupAddress: string;
    dropoffAddress: string;
  }>();
  return res(
    ctx.json({ ...dummyParcel, pickupAddress, dropoffAddress }),
    ctx.status(201)
  );
});

const registerHandler = rest.post("/auth/register", async (req, res, ctx) => {
  const { email, firstName, lastName } = await req.json<{
    email: string;
    firstName: string;
    lastName: string;
  }>();

  return res(
    ctx.json({
      ...dummyUser,
      user: { ...dummyUser.user, email, firstName, lastName },
    }),
    ctx.status(201)
  );
});

export const handlers = [loginHandler, createParcelHandler, registerHandler];
