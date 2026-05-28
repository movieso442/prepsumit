import { NextResponse } from 'next/server';
import { getResendClient } from '@/lib/resend';
import { validateAccountRequest } from '@/lib/validators';
import { getBillingEmailTemplate, getCustomerEmailTemplate } from '@/lib/email-templates';

export async function POST(request) {
  try {
    console.log("Account request API route called at:", new Date().toISOString());

    // 1. Check environment variables
    console.log("Environment check: BILLING_EMAIL exists:", !!process.env.BILLING_EMAIL, "| SUPPORT_EMAIL exists:", !!process.env.SUPPORT_EMAIL);
    if (!process.env.BILLING_EMAIL || !process.env.SUPPORT_EMAIL) {
      console.error("Server Configuration Error: BILLING_EMAIL or SUPPORT_EMAIL is not configured.");
      return NextResponse.json({ 
        error: "Server email settings are not configured. Please contact support@prepsumit.com." 
      }, { status: 500 });
    }

    // 2. Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    // 3. Validate request fields
    const validation = validateAccountRequest(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const {
      fullName,
      email,
      phone,
      phoneCountryCode,
      phoneNumber,
      fullPhoneNumber,
      selectedPlan,
      billingCycle = 'Monthly',
      accountType = 'Student',
      country = 'United States',
      city = '',
      state = '',
      zipCode = '',
      answers = [],
      additionalInfo = ''
    } = body;

    // 4. Retrieve Resend client
    let resend;
    try {
      resend = getResendClient();
    } catch (err) {
      console.error("Resend initialization error:", err.message);
      return NextResponse.json({ 
        error: "Our registration mail service is temporarily offline. Please try again in a few minutes or contact support." 
      }, { status: 500 });
    }

    const billingEmail = process.env.BILLING_EMAIL;
    const supportEmail = process.env.SUPPORT_EMAIL;

    // 5. Send internal notification email to billing team (CC: support team)
    const billingHtml = getBillingEmailTemplate({
      fullName,
      email,
      phone,
      phoneCountryCode,
      phoneNumber,
      fullPhoneNumber,
      selectedPlan,
      billingCycle,
      accountType,
      country,
      city,
      state,
      zipCode,
      answers,
      additionalInfo
    });

    console.log(`Attempting to send internal notification email - To: ${billingEmail} | CC: ${supportEmail}`);
    const billingEmailResult = await resend.emails.send({
      from: `PrepSumit Support <${supportEmail}>`,
      to: billingEmail,
      cc: supportEmail,
      replyTo: email,
      subject: `New PrepSumit Account Request - ${selectedPlan}`,
      html: billingHtml,
    });

    if (billingEmailResult.error) {
      console.error("Resend Billing/Support Internal Email Error:", billingEmailResult.error);
      return NextResponse.json({ 
        error: "Failed to send notification email to billing/support team. Request not submitted." 
      }, { status: 500 });
    }

    console.log("Resend internal notification email succeeded. ID:", billingEmailResult.data?.id);

    // 6. Send confirmation email to the customer
    const customerHtml = getCustomerEmailTemplate({
      fullName,
      selectedPlan
    });

    console.log(`Attempting to send customer confirmation email to: ${email}`);
    const customerEmailResult = await resend.emails.send({
      from: `PrepSumit Support <${supportEmail}>`,
      to: email,
      replyTo: supportEmail,
      subject: "We received your PrepSumit account request",
      html: customerHtml,
    });

    if (customerEmailResult.error) {
      console.warn("Resend Customer Confirmation Email Warning (Logged but non-fatal):", customerEmailResult.error);
    } else {
      console.log("Resend customer confirmation email succeeded. ID:", customerEmailResult.data?.id);
    }

    // 7. Database Account Status Logic Placeholder (pending_payment / pending_validation)
    // TODO: persist user request to database

    return NextResponse.json({ 
      success: true, 
      message: "Thank you! Your account request has been received successfully. Our billing team will review your selected plan and contact you through billing@prepsumit.com with payment and account validation instructions. Please also check your email for confirmation." 
    });

  } catch (error) {
    console.error("Account request API unexpected error:", error);
    return NextResponse.json({ 
      error: "An unexpected error occurred while processing your request. Please try again." 
    }, { status: 500 });
  }
}
