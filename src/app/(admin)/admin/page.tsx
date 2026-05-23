"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminStyling from "./admin.module.css";

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

type ProjectDraft = Omit<Project, "id"> & { id?: number };

type Tech = { name: string; info: string; rating: number };

const emptyProject: ProjectDraft = {
  name: "",
  order: 0,
  tags: [],
  banner_img: "",
  images: [],
  github_link: "",
  project_link: "",
  description: ["", "", "", ""],
};

const emptyTech: Tech = { name: "", info: "", rating: 3 };

export default function AdminPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<ProjectDraft | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState("");

  const [tab, setTab] = useState<"projects" | "about">("about");
  const [aboutTech, setAboutTech] = useState<Tech[]>([]);
  const [selectedTech, setSelectedTech] = useState<(Tech & { index: number }) | null>(null);
  const [isNewTech, setIsNewTech] = useState(false);
  const [aboutStatus, setAboutStatus] = useState("");

  function redirectToLogin() {
    router.push("/admin/login");
  }

  useEffect(() => {
    async function load() {
      const [projRes, aboutRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/about"),
      ]);

      if (projRes.status === 401 || aboutRes.status === 401) {
        redirectToLogin();
        return;
      }

      setProjects(await projRes.json());
      const aboutData: { tech: Tech[] } = await aboutRes.json();
      setAboutTech(aboutData.tech);
    }
    load();
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function handleSelect(project: Project) {
    setSelected({ ...project });
    setIsNew(false);
    setStatus("");
  }

  function handleNew() {
    setSelected({ ...emptyProject });
    setIsNew(true);
    setStatus("");
  }

  function update<K extends keyof ProjectDraft>(field: K, value: ProjectDraft[K]) {
    setSelected((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleSave() {
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });

    if (res.status === 401) { redirectToLogin(); return; }

    const updated: Project = await res.json();

    if (isNew) {
      setProjects((prev) => [...prev, updated]);
    } else {
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }

    setSelected(updated);
    setIsNew(false);
    setStatus("Saved!");
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.status === 401) { redirectToLogin(); return; }

    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
    setStatus("");
  }

  function handleSelectTech(tech: Tech, index: number) {
    setSelectedTech({ ...tech, index });
    setIsNewTech(false);
    setAboutStatus("");
  }

  function handleNewTech() {
    setSelectedTech({ ...emptyTech, index: -1 });
    setIsNewTech(true);
    setAboutStatus("");
  }

  function updateSelectedTech(field: keyof Tech, value: string | number) {
    setSelectedTech((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function handleTechSave() {
    if (!selectedTech) return;
    const updatedTech = isNewTech
      ? [...aboutTech, { name: selectedTech.name, info: selectedTech.info, rating: selectedTech.rating }]
      : aboutTech.map((t, i) =>
          i === selectedTech.index
            ? { name: selectedTech.name, info: selectedTech.info, rating: selectedTech.rating }
            : t
        );

    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tech: updatedTech }),
    });

    if (res.status === 401) { redirectToLogin(); return; }

    setAboutTech(updatedTech);
    if (isNewTech) {
      setSelectedTech({
        name: selectedTech.name,
        info: selectedTech.info,
        rating: selectedTech.rating,
        index: updatedTech.length - 1,
      });
      setIsNewTech(false);
    }
    setAboutStatus("Saved!");
  }

  async function handleTechDelete() {
    if (!selectedTech || isNewTech) return;
    if (!confirm("Delete this skill?")) return;
    const updatedTech = aboutTech.filter((_, i) => i !== selectedTech.index);

    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tech: updatedTech }),
    });

    if (res.status === 401) { redirectToLogin(); return; }

    setAboutTech(updatedTech);
    setSelectedTech(null);
    setAboutStatus("");
  }

  return (
    <div className={AdminStyling.page}>
      <aside className={AdminStyling.aside}>
        <div className={AdminStyling.asideHeader}>
          <h2 className={AdminStyling.title}>Admin</h2>
          <button onClick={handleLogout} className={AdminStyling.logoutButton}>
            Logout
          </button>
        </div>

        <div className={AdminStyling.tabs}>
          <button
            className={`${AdminStyling.tab} ${tab === "about" ? AdminStyling.tabCurrent : ""}`}
            onClick={() => setTab("about")}
          >
            Skills
          </button>
          <button
            className={`${AdminStyling.tab} ${tab === "projects" ? AdminStyling.tabCurrent : ""}`}
            onClick={() => setTab("projects")}
          >
            Projects
          </button>
        </div>

        {tab === "projects" && (
          <>
            <button className={AdminStyling.button} onClick={handleNew}>
              + New Project
            </button>
            <ul className={AdminStyling.list}>
              {projects.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className={`${AdminStyling.listItem} ${selected?.id === p.id ? AdminStyling.listItemCurrent : ""}`}
                >
                  {p.name || "Untitled"}
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === "about" && (
          <>
            <button className={AdminStyling.button} onClick={handleNewTech}>
              + New Skill
            </button>
            <ul className={AdminStyling.list}>
              {aboutTech.map((tech, i) => (
                <li
                  key={tech.name}
                  onClick={() => handleSelectTech(tech, i)}
                  className={`${AdminStyling.listItem} ${selectedTech?.index === i ? AdminStyling.listItemCurrent : ""}`}
                >
                  {tech.name || "Untitled"}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <main className={AdminStyling.main}>
        {tab === "projects" && (
          <>
            {!selected ? (
              <p className={AdminStyling.empty}>Select a project or create a new one.</p>
            ) : (
              <>
                <h2 className={AdminStyling.subtitle}>{isNew ? "New Project" : "Edit Project"}</h2>

                <div className={AdminStyling.content}>
                  <div>
                    <Field label="Name">
                      <input
                        className={AdminStyling.input}
                        value={selected.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Project name"
                      />
                    </Field>

                    <Field label="Order">
                      <input
                        className={AdminStyling.input}
                        type="number"
                        value={selected.order}
                        onChange={(e) => update("order", parseInt(e.target.value))}
                      />
                    </Field>

                    <Field label="Tags (comma separated)">
                      <input
                        className={AdminStyling.input}
                        value={selected.tags.join(", ")}
                        onChange={(e) =>
                          update("tags", e.target.value.split(",").map((t) => t.trim()))
                        }
                      />
                    </Field>

                    <Field label="Banner image filename">
                      <input
                        className={AdminStyling.input}
                        value={selected.banner_img}
                        onChange={(e) => update("banner_img", e.target.value)}
                      />
                    </Field>

                    <Field label="Extra images (comma separated filenames)">
                      <input
                        className={AdminStyling.input}
                        value={selected.images.join(", ")}
                        onChange={(e) =>
                          update("images", e.target.value.split(",").map((s) => s.trim()))
                        }
                      />
                    </Field>

                    <Field label="GitHub link (optional)">
                      <input
                        className={AdminStyling.input}
                        value={selected.github_link}
                        onChange={(e) => update("github_link", e.target.value)}
                      />
                    </Field>

                    <Field label="Project link (optional)">
                      <input
                        className={AdminStyling.input}
                        value={selected.project_link ?? ""}
                        onChange={(e) => update("project_link", e.target.value)}
                      />
                    </Field>
                  </div>

                  <div className={AdminStyling.desc}>
                    <label className={AdminStyling.label}>Description paragraphs</label>
                    {selected.description.map((desc, i) => (
                      <textarea
                        className={AdminStyling.textarea}
                        key={i}
                        value={desc}
                        onChange={(e) => {
                          const updated = [...selected.description];
                          updated[i] = e.target.value;
                          update("description", updated);
                        }}
                        rows={3}
                        placeholder={`Paragraph ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className={AdminStyling.buttons}>
                  <button onClick={handleSave} className={AdminStyling.button}>
                    Save
                  </button>
                  <button
                    onClick={() => selected.id !== undefined && handleDelete(selected.id)}
                    className={AdminStyling.delButton}
                  >
                    Delete
                  </button>
                  {status && <span className={AdminStyling.statusMsg}>{status}</span>}
                </div>
              </>
            )}
          </>
        )}

        {tab === "about" && (
          <>
            {!selectedTech ? (
              <p className={AdminStyling.empty}>Select a skill or add a new one.</p>
            ) : (
              <>
                <h2 className={AdminStyling.subtitle}>{isNewTech ? "New Skill" : "Edit Skill"}</h2>

                <Field label="Name">
                  <input
                    className={AdminStyling.input}
                    value={selectedTech.name}
                    onChange={(e) => updateSelectedTech("name", e.target.value)}
                  />
                </Field>

                <Field label="Info">
                  <input
                    className={AdminStyling.input}
                    value={selectedTech.info}
                    onChange={(e) => updateSelectedTech("info", e.target.value)}
                  />
                </Field>

                <Field label="Rating (1–5)">
                  <input
                    className={AdminStyling.input}
                    type="number"
                    min={1}
                    max={5}
                    value={selectedTech.rating}
                    onChange={(e) => updateSelectedTech("rating", parseInt(e.target.value))}
                  />
                </Field>

                <div className={AdminStyling.buttons}>
                  <button onClick={handleTechSave} className={AdminStyling.button}>
                    Save
                  </button>
                  {!isNewTech && (
                    <button onClick={handleTechDelete} className={AdminStyling.delButton}>
                      Delete
                    </button>
                  )}
                  {aboutStatus && <span className={AdminStyling.statusMsg}>{aboutStatus}</span>}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={AdminStyling.field}>
      <label className={AdminStyling.label}>{label}</label>
      {children}
    </div>
  );
}
