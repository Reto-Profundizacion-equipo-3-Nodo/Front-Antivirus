import { redirect } from "@remix-run/node";
import { tokenCookie } from "~/utils/cookies";

export const action = async () => {
    return redirect("/register", {
        headers: {
            "Set-Cookie": await tokenCookie.serialize("", {
                maxAge: 0,
                expires: new Date(0),
                path: "/",
                httpOnly: true
            }),
        },
    });
};
