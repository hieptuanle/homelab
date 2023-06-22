import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // console.log(`Request for ${request.url}`);
  return response;
}
