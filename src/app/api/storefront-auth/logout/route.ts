import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { STOREFRONT_AUTH_COOKIE_NAME } from "@/storefront/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(STOREFRONT_AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
