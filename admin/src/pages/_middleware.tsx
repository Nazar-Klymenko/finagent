import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: any, ev: any) {
  const { pathname } = req.nextUrl;
  // if (pathname == "/") {
  //   return NextResponse.redirect("/dashboard/insurance");
  // } else if (pathname == "/dashboard") {
  //   return NextResponse.redirect("/dashboard/insurance");
  // } else if (pathname == "/settings") {
  //   return NextResponse.redirect("/settings/personal");
  // }
  return NextResponse.next();
}
