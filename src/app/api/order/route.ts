import { NextResponse } from "next/server";
import ordersData from "@/components/Orders/ordersData";

export async function GET() {
  return NextResponse.json({
    orders: ordersData,
  });
}
