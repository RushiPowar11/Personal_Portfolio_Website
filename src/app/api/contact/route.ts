import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/portfolio";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const message = sanitize(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio inquiry from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send your message. Please try again or email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
