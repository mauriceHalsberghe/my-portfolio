import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type TechEntry = {
  name: string;
  info: string;
  rating: number;
};

type AboutData = {
  intro: string;
  tech: TechEntry[];
};

const filePath = path.join(process.cwd(), "src", "data", "about.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data) as AboutData);
}

export async function PUT(req: Request) {
  const body = await req.json() as AboutData;
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
  return NextResponse.json(body);
}