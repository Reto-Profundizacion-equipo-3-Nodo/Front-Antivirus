import { createCookie } from "@remix-run/node";

export const tokenCookie = createCookie("token", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
});