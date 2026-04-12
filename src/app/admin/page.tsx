"use client";
import { useEffect, useState } from "react";

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

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<ProjectDraft | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [status, setStatus] = useState("");

  const [tab, setTab] = useState<"projects" | "about">("projects");
  const [aboutIntro, setAboutIntro] = useState("");
  const [aboutTech, setAboutTech] = useState<{ name: string; info: string; rating: number }[]>([]);
  const [aboutStatus, setAboutStatus] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);

    fetch("/api/about")
      .then((r) => r.json())
      .then((data: { intro: string; tech: { name: string; info: string; rating: number }[] }) => {
        setAboutIntro(data.intro);
        setAboutTech(data.tech);
      });
  }, []);

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
    setSelected((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  async function handleSave() {
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selected),
    });
    const updated: Project = await res.json();

    if (isNew) {
      setProjects((prev) => [...prev, updated]);
    } else {
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }

    setSelected(updated);
    setIsNew(false);
    setStatus("✅ Saved!");
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
    setStatus("");
  }

  async function handleAboutSave() {
    await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ intro: aboutIntro, tech: aboutTech }),
    });
    setAboutStatus("✅ Saved!");
  }

  function updateTech(index: number, field: "info" | "rating", value: string | number) {
    setAboutTech((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    );
  }

  return (
    <div>
      <aside style={{ width: 260, borderRight: "1px solid #ddd", padding: "1rem", overflowY: "auto" }}>
        <h2 style={{ marginTop: 0 }}>Admin panel</h2>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          <button onClick={() => setTab("projects")} style={btnStyle(tab === "projects" ? "#0070f3" : "#888")}>
            Projects
          </button>
          <button onClick={() => setTab("about")} style={btnStyle(tab === "about" ? "#0070f3" : "#888")}>
            About
          </button>
        </div>
        {
          tab === "projects" && (
            <>
              <button onClick={handleNew} style={btnStyle("#0070f3")}>+ New Project</button>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                {projects.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    style={{
                      padding: "0.5rem 0.75rem",
                      marginBottom: "0.25rem",
                      borderRadius: 6,
                      cursor: "pointer",
                      background: selected?.id === p.id ? "#e8f0fe" : "transparent",
                      fontWeight: selected?.id === p.id ? 600 : 400,
                    }}
                  >
                    {p.name || "Untitled"}
                  </li>
                ))}
              </ul>
            </>
          )
        }
      </aside>

      {/* Editor */}
<main style={{ flex: 1, padding: "2rem", maxWidth: 700 }}>

  {/* Projects tab — your existing editor JSX goes here, unchanged */}
  {tab === "projects" && (
    <>
      {!selected ? (
        <p style={{ color: "#888" }}>Select a project or create a new one.</p>
      ) : (
        <>
          <h2 style={{ marginTop: 0 }}>{isNew ? "New Project" : "Edit Project"}</h2>

            <Field label="Name">
              <input
                value={selected.name}
                onChange={(e) => update("name", e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Order">
              <input
                type="number"
                value={selected.order}
                onChange={(e) => update("order", parseInt(e.target.value))}
                style={inputStyle}
              />
            </Field>

            <Field label="Tags (comma separated)">
              <input
                value={selected.tags.join(", ")}
                onChange={(e) => update("tags", e.target.value.split(",").map((t) => t.trim()))}
                style={inputStyle}
              />
            </Field>

            <Field label="Banner image filename">
              <input
                value={selected.banner_img}
                onChange={(e) => update("banner_img", e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Extra images (comma separated filenames)">
              <input
                value={selected.images.join(", ")}
                onChange={(e) => update("images", e.target.value.split(",").map((s) => s.trim()))}
                style={inputStyle}
              />
            </Field>

            <Field label="GitHub link  (optional)">
              <input
                value={selected.github_link}
                onChange={(e) => update("github_link", e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Project link (optional)">
              <input
                value={selected.project_link ?? ""}
                onChange={(e) => update("project_link", e.target.value)}
                style={inputStyle}
              />
            </Field>

            <Field label="Description paragraphs">
              {selected.description.map((desc, i) => (
                <textarea
                  key={i}
                  value={desc}
                  onChange={(e) => {
                    const updated = [...selected.description];
                    updated[i] = e.target.value;
                    update("description", updated);
                  }}
                  rows={3}
                  placeholder={`Paragraph ${i + 1}`}
                  style={{ ...inputStyle, display: "block", marginBottom: "0.5rem", resize: "vertical" }}
                />
              ))}
            </Field>

                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button onClick={handleSave} style={btnStyle("#0070f3")}>Save</button>
        {aboutStatus && <span style={{ color: "green" }}>{aboutStatus}</span>}
      </div>
        </>
      )}
    </>
  )}

  {/* About tab */}
  {tab === "about" && (
    <>
      <h2 style={{ marginTop: 0 }}>About Section</h2>

      <Field label="Intro paragraph">
        <textarea
          value={aboutIntro}
          onChange={(e) => setAboutIntro(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </Field>

      <h3>Tech stack</h3>
      {aboutTech.map((tech, i) => (
        <div key={tech.name} style={{ marginBottom: "1.25rem", padding: "1rem", border: "1px solid #eee", borderRadius: 8 }}>
          <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>{tech.name}</p>

          <Field label="Info">
            <input
              value={tech.info}
              onChange={(e) => updateTech(i, "info", e.target.value)}
              style={inputStyle}
            />
          </Field>

          <Field label="Rating (1–5)">
            <input
              type="number"
              min={1}
              max={5}
              value={tech.rating}
              onChange={(e) => updateTech(i, "rating", parseInt(e.target.value))}
              style={{ ...inputStyle, width: 80 }}
            />
          </Field>
        </div>
      ))}

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button onClick={handleAboutSave} style={btnStyle("#0070f3")}>Save</button>
        {aboutStatus && <span style={{ color: "green" }}>{aboutStatus}</span>}
      </div>
    </>
  )}
</main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem", fontSize: "0.9rem" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.4rem 0.6rem",
  fontSize: "0.95rem",
  border: "1px solid #ccc",
  borderRadius: 6,
  boxSizing: "border-box",
};

function btnStyle(bg: string): React.CSSProperties {
  return {
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "0.5rem 1.25rem",
    cursor: "pointer",
    fontSize: "0.95rem",
  };
}