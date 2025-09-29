function handlePlusButtonClick() {
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
			<button type="button" onClick={handlePlusButtonClick}>
				+
			</button>
		</div>
	);
}
