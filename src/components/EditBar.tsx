function toggleEdit(): void {
	document.documentElement.classList.toggle("editing");
	window.dispatchEvent(new Event("edit-toggle"));
}

async function save() {
	// const nodes = document.querySelectorAll<HTMLElement>(
	// 	"[data-file][data-field]",
	// );
	// const byFile: Record<string, Record<string, string>> = {};
	// nodes.forEach((n) => {
	// 	const file = n.dataset.file!,
	// 		field = n.dataset.field!;
	// 	(byFile[file] ??= {})[field] = n.innerHTML; // if you want Markdown, convert server-side
	// });
	// const res = await fetch("/api/save", {
	// 	method: "POST",
	// 	headers: { "content-type": "application/json" },
	// 	body: JSON.stringify(byFile),
	// });
	// const msg = await res.text();
	alert("hi");
}

function navigateToNewPost() {
	location.href = "/api/new-post";
}

export default function EditBar() {
	return (
		<div
			style={{
				position: "fixed",
				right: 16,
				bottom: 16,
				display: "flex",
				gap: 8,
				padding: "8px 12px",
				background: "rgba(0,0,0,.85)",
				color: "#fff",
				borderRadius: 12,
				boxShadow: "0 6px 20px rgba(0,0,0,.25)",
				zIndex: 9999,
			}}
		>
			<button type="button" onClick={toggleEdit}>
				✏️ Edit
			</button>
			<button type="button" onClick={navigateToNewPost}>
				➕ New
			</button>
			<button type="button" onClick={save}>
				💾 Save
			</button>
		</div>
	);
}
