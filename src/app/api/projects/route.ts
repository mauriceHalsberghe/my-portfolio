import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

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

const filePath = path.join(process.cwd(), "src/data/projects.json");

async function isAuthorized(): Promise<boolean> {
  const store = await cookies();
  return store.get("admin_auth")?.value === process.env.ADMIN_SECRET;
}

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const body = await req.json() as Omit<Project, "id">;
  const data: Project[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const newProject: Project = { ...body, id: Date.now() };
  data.push(newProject);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const body = await req.json() as Project;
  let data: Project[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.map((p) => (p.id === body.id ? body : p));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(body);
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized())) return unauthorized();
  const { id } = await req.json() as { id: number };
  let data: Project[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.filter((p) => p.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true });
}
