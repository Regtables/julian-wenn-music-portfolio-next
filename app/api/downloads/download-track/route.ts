import { NextRequest, NextResponse } from "next/server";

// Only ever proxy files actually hosted on Sanity's CDN —
// without this check, the route becomes an open proxy.
const ALLOWED_HOST = "cdn.sanity.io";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("url");
  const filename = searchParams.get("filename") ?? "track.mp3";

  if (!fileUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(fileUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsedUrl.hostname !== ALLOWED_HOST) {
    return NextResponse.json({ error: "Disallowed host" }, { status: 400 });
  }

  const sanityResponse = await fetch(parsedUrl.toString());

  if (!sanityResponse.ok || !sanityResponse.body) {
    return NextResponse.json({ error: "Failed to fetch file" }, { status: 502 });
  }

  const safeFilename = filename.replace(/[/\\?%*:|"<>]/g, "");

  return new NextResponse(sanityResponse.body, {
    headers: {
      "Content-Type": sanityResponse.headers.get("Content-Type") ?? "audio/mpeg",
      "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`,
      ...(sanityResponse.headers.get("Content-Length")
        ? { "Content-Length": sanityResponse.headers.get("Content-Length")! }
        : {}),
    },
  });
}