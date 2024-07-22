import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./data/services/getUserMeLoader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  console.log(user);
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/board") && user.ok === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
