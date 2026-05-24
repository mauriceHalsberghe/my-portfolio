import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { kv } from "@vercel/kv";
import { getProjects, KV_KEY, type Project } from "@/lib/projects";

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
  revalidatePath("/projects");
  revalidatePath("/projects/[id]", "page");
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const body = (await req.json()) as Project;
  let data = await getProjects();
  data = data.map((p) => (p.id === body.id ? body : p));
  await kv.set(KV_KEY, data);
  revalidatePath("/projects");
  revalidatePath("/projects/[id]", "page");
  return NextResponse.json(body);
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const { id } = (await req.json()) as { id: number };
  let data = await getProjects();
  data = data.filter((p) => p.id !== id);
  await kv.set(KV_KEY, data);
  revalidatePath("/projects");
  revalidatePath("/projects/[id]", "page");
  return NextResponse.json({ success: true });
}
