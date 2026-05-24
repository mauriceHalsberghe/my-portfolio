import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { kv } from "@vercel/kv";
import initialData from "@/data/projects.json";

type Project = {
  id: number;
  order: number;
  name: string;
  tags: string[];
  banner_img: string;
  images: string[];
  github_link: string;
  project_link?: string;
  description: string[];
};

const KV_KEY = "projects";

async function getProjects(): Promise<Project[]> {
  const data = await kv.get<Project[]>(KV_KEY);
  if (!data) {
    await kv.set(KV_KEY, initialData);
    return initialData as Project[];
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
  const data = await getProjects();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const body = (await req.json()) as Omit<Project, "id">;
  const data = await getProjects();
  const newProject: Project = { ...body, id: Date.now() };
  data.push(newProject);
  await kv.set(KV_KEY, data);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const body = (await req.json()) as Project;
  let data = await getProjects();
  data = data.map((p) => (p.id === body.id ? body : p));
  await kv.set(KV_KEY, data);
  return NextResponse.json(body);
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const { id } = (await req.json()) as { id: number };
  let data = await getProjects();
  data = data.filter((p) => p.id !== id);
  await kv.set(KV_KEY, data);
  return NextResponse.json({ success: true });
}
