import handler from "../../../../api/captcha.js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request) {
  let status = 200;
  let payload = null;
  let cookie = null;
  const req = { method: "GET", headers: Object.fromEntries(request.headers.entries()) };
  const res = {
    status(code) { status = code; return this; },
    json(data) { payload = data; return this; },
    setHeader(name, value) { if (name.toLowerCase() === "set-cookie") cookie = value; },
  };
  await handler(req, res);
  const response = NextResponse.json(payload, { status });
  if (cookie) response.headers.set("Set-Cookie", cookie);
  return response;
}
