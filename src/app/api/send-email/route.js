import handler from "../../../../api/send-email.js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  let status = 200;
  let payload = null;
  let setCookie = null;
  const body = await request.json();
  const req = { method: "POST", body, headers: { cookie: request.headers.get("cookie") || "" } };
  const res = {
    status(code) { status = code; return this; },
    json(data) { payload = data; return this; },
    setHeader(name, value) { if (name.toLowerCase() === "set-cookie") setCookie = value; },
  };
  await handler(req, res);
  const response = NextResponse.json(payload, { status });
  if (setCookie) response.headers.set("Set-Cookie", setCookie);
  return response;
}
