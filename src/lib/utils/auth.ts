import { decodeAccessToken } from "@/lib/utils/jwt";
import { findByFilter } from "@/models/auth/authModel";

export async function requireAuth(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return { message: "Unauthorized", status: 401 };
  }

  try {
    const decoded = decodeAccessToken(authHeader);

    const user = await findByFilter({ email: decoded.email });

    if (!user) {
      return { message: "Unauthorized", status: 401 };
    }

    delete user.password;
    return { user };
  } catch (err: any) {
    console.log(err.message);
    return { message: err.message ?? "Unauthorized", status: 401 };
  }
}
