import { kv } from "@vercel/kv";
import initialData from "@/data/projects.json";
import { isKvAvailable } from "./kv";

export type Project = {
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

export const KV_KEY = "projects";

export async function getProjects(): Promise<Project[]> {
  if (!isKvAvailable()) return initialData as Project[];
  const data = await kv.get<Project[]>(KV_KEY);
  if (!data) {
    await kv.set(KV_KEY, initialData);
    return initialData as Project[];
  }
  return data;
}
