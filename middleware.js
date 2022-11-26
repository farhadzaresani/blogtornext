import { NextResponse } from "next/server";
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const cookie = request.cookies.get("ut", {})?.value;
    if (!cookie) {
      return NextResponse.rewrite(new URL("/LoginSignUp", request.url));
    }
  }
}
