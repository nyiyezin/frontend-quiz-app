export function getClassname(
  title:
    | "html"
    | "css"
    | "javascript"
    | "accessability"
    | "react"
    | string
    | undefined,
) {
  if (title === undefined) return;
  switch (title.toLowerCase()) {
    case "html":
      return "bg-[#fff1e9]";
    case "css":
      return "bg-[#e0fdef]";
    case "javascript":
      return "bg-[#ebf0ff]";
    case "accessability":
      return "bg-[#f6e7ff]";
    case "react":
      return "bg-[#e6f8fc]";
    default:
      return "bg-[#f6e7ff]";
  }
}
