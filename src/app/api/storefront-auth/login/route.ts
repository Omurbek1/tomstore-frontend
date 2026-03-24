import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getBackendUrl } from "@/storefront/site";
import {
  STOREFRONT_AUTH_COOKIE_NAME,
  normalizeStorefrontAuthToken,
} from "@/storefront/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { login?: string; password?: string }
    | null;
  const login = String(body?.login || "").trim();
  const password = String(body?.password || "").trim();

  if (!login || !password) {
    return NextResponse.json(
      { message: "Укажите логин и пароль" },
      { status: 400 },
    );
  }

  const response = await fetch(`${getBackendUrl()}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | { accessToken?: string; user?: { name?: string }; message?: string }
    | null;

  if (!response.ok) {
    return NextResponse.json(
      { message: payload?.message || "Не удалось выполнить вход" },
      { status: response.status },
    );
  }

  const token = normalizeStorefrontAuthToken(payload?.accessToken);
  if (!token) {
    return NextResponse.json(
      { message: "Backend не вернул accessToken" },
      { status: 502 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(STOREFRONT_AUTH_COOKIE_NAME, token, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    success: true,
    userName: payload?.user?.name || login,
  });
}
