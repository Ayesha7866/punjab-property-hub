import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { uploadDir } from "@/lib/uploads";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const image = await prisma.propertyImage.findUnique({
    where: { id },
    include: { property: true },
  });
  if (!image) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const isPublic = image.property.status === "APPROVED";
  if (!isPublic) {
    const user = await getSessionUser();
    const allowed = user && (user.id === image.property.ownerId || user.role === "ADMIN");
    if (!allowed) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  const fileName = path.basename(image.fileName);
  try {
    const bytes = await readFile(path.join(uploadDir(), fileName));
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": image.mimeType,
        "Cache-Control": isPublic ? "public, max-age=86400" : "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
