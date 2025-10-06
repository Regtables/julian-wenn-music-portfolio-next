import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const { fullName, email, instagram, country, message } = formData;

    const emailData = await resend.emails.send({
      from: `Website Contact <reg@regtables.com>`,
      to: ["reghardt7@gmail.com", "julianwennbookings@gmail.com"],
      subject: `Contact Form Response from ${fullName}`,
      html: `<p><span style="font-family: arial, helvetica, sans-serif;">Hi Julian,</span></p>
      <p><span style="font-family: arial, helvetica, sans-serif;">You have received a response from the website contact form.</span></p>
      <p><span style="font-family: arial, helvetica, sans-serif;"><strong>Here are the person's details:</strong></span></p>
      <p>&nbsp;</p>
      <p><span style="font-family: arial, helvetica, sans-serif;"><strong>Name</strong>: ${fullName}</span></p>
      <p><span style="font-family: arial, helvetica, sans-serif;"><strong>Email</strong>: ${email}</span></p>
      ${instagram ? `<p><span style="font-family: arial, helvetica, sans-serif;"><strong>Instagram</strong>: ${instagram}</span></p>` : ""}
      ${country ? `<p><span style="font-family: arial, helvetica, sans-serif;"><strong>Country</strong>: ${country}</span></p>` : ""}
      <p>&nbsp;</p>
      <p><span style="font-family: arial, helvetica, sans-serif;"><strong>Message</strong>:</span></p>
      <p><span style="font-family: arial, helvetica, sans-serif;">"${message}"</span></p>`,
    });

    if (emailData.error) {
      console.error("Email sending error:", emailData.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data: emailData.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
