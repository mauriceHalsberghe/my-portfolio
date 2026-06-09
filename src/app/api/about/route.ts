import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import initialData from "@/data/about.json";
import { isKvAvailable } from "@/lib/kv";

type TechEntry = {
  name: string;
  info: string;
  rating: number;
};

type AboutData = {
  intro: string;
  tech: TechEntry[];
};

const KV_KEY = "about";

async function getAbout(): Promise<AboutData> {
  if (!isKvAvailable()) return initialData as AboutData;
  const data = await kv.get<AboutData>(KV_KEY);
  if (!data) {
    await kv.set(KV_KEY, initialData);
    return initialData as AboutData;
  }
  return data;
}

async function isAuthorized(): Promise<boolean> {
  const store = await cookies();
  return store.get("admin_auth")?.value === process.env.ADMIN_SECRET;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const data = await getAbout();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  if (!isKvAvailable())
    return NextResponse.json({ error: "KV not available" }, { status: 503 });
  if (!(await isAuthorized())) return unauthorized();
  const body = (await req.json()) as AboutData;
  await kv.set(KV_KEY, body);
  return NextResponse.json(body);
}
