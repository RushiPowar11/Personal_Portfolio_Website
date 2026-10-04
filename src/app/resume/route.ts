import { NextResponse } from "next/server";

const resumeDownloadUrl =
  "https://drive.google.com/uc?export=download&id=1ENSQCAJkIDpNPXk0vJ4Xc7cYRu_8flq1";

export function GET() {
  return NextResponse.redirect(resumeDownloadUrl, { status: 302 });
}
