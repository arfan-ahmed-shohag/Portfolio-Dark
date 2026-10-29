import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // SMTP Credentials from environment variables
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587");
    const secure = process.env.SMTP_SECURE === "true"; // true for port 465, false for other ports
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || user;

    // Check if configuration exists
    if (!host || !user || !pass || !receiver) {
      console.error("[SMTP Error] Missing server SMTP environment variables config.");
      return NextResponse.json(
        { error: "Server email credentials are not configured." },
        { status: 500 }
      );
    }

    // Create SMTP Transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 1. Send Notification Email to the Owner (You)
    const ownerMailOptions = {
      from: `"${name} via Portfolio Uplink" <${user}>`,
      to: receiver,
      replyTo: email,
      subject: `[UPLINK_ALERT] New Message from ${name}`,
      text: `Secure Uplink Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #05050a; color: #f3f4f6; border: 1px solid #00f2fe; border-radius: 8px; max-width: 600px; margin: auto;">
          <h2 style="color: #00f2fe; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px; margin-top: 0;">[SECURE_UPLINK // INCOMING_TRANSMISSION]</h2>
          <p><strong>Candidate Name:</strong> ${name}</p>
          <p><strong>Uplink Email:</strong> <a href="mailto:${email}" style="color: #00f2fe; text-decoration: none;">${email}</a></p>
          <div style="background-color: rgba(255, 255, 255, 0.05); padding: 15px; border-left: 3px solid #9b51e0; border-radius: 4px; margin-top: 15px; font-family: sans-serif; line-height: 1.5;">
            <strong>Payload Message:</strong><br />
            <span style="white-space: pre-wrap;">${message}</span>
          </div>
          <div style="margin-top: 20px; font-size: 10px; color: #555; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 10px; text-align: center;">
            PROTOCOL_SECURED_SSL // AES-256
          </div>
        </div>
      `,
    };

    // 2. Send Confirmation Email to the Sender (Candidate)
    const senderMailOptions = {
      from: `"Arfan Ahmed" <${user}>`,
      to: email,
      subject: `[ACKNOWLEDGEMENT] Transmission Received - Arfan Ahmed`,
      text: `Hello ${name},\n\nThank you for reaching out via my Secure Uplink.\n\nYour message payload has been successfully decrypted and deposited into my core inbox.\n\nI will review your transmission and get back to you within 24 standard cycles.\n\nBest regards,\nArfan Ahmed\nFull-Stack Engineer`,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #05050a; color: #f3f4f6; border: 1px solid #00ff87; border-radius: 8px; max-width: 600px; margin: auto;">
          <h2 style="color: #00ff87; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 10px; margin-top: 0;">[UPLINK_ACKNOWLEDGEMENT]</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>This is an automated confirmation that your transmission has bypassed firewall checks and successfully landed in my inbox.</p>
          
          <div style="background-color: rgba(0, 255, 135, 0.05); border: 1px dashed rgba(0, 255, 135, 0.3); padding: 15px; border-radius: 4px; margin: 20px 0;">
            <span style="color: #00ff87; font-weight: bold;">[✓] STATUS: DEPOSITED_OK</span><br/>
            <span style="font-size: 11px; color: #888;">Response sweep window: Within 24 standard hours.</span>
          </div>

          <p>I appreciate you taking the time to connect. I will review your requirements shortly.</p>
          
          <p style="margin-top: 30px; font-weight: bold;">
            Best regards,<br/>
            <span style="color: #00f2fe;">Arfan Ahmed</span><br/>
            <span style="font-size: 12px; color: #888; font-weight: normal;">Web Developer & WordPress Architect</span>
          </p>
          
          <div style="margin-top: 20px; font-size: 10px; color: #555; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 10px; text-align: center;">
            SYSTEM_CORE // SECURE_SSL
          </div>
        </div>
      `,
    };

    // Dispatch emails with Promise.allSettled so auto-reply failures won't block main delivery
    const results = await Promise.allSettled([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    const ownerResult = results[0];
    const senderResult = results[1];

    if (ownerResult.status === "rejected") {
      console.error("[SMTP Owner Mail Error]:", ownerResult.reason);
      throw ownerResult.reason;
    }

    if (senderResult.status === "rejected") {
      console.warn("[SMTP Sender Auto-Reply Failed]:", senderResult.reason);
    }

    return NextResponse.json({ success: true, message: "Transmission complete" });
  } catch (error: unknown) {
    console.error("[SMTP Mail Error]:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Internal server error during email dispatch";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
