/**
 * Sanitizes input text to prevent raw HTML execution inside the email template.
 */
function sanitize(text) {
  if (text === undefined || text === null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Returns HTML template for the internal billing notification email.
 */
export function getBillingEmailTemplate(data) {
  const {
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
    answers = [],
    additionalInfo
  } = data;

  const dateStr = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

  let answersHtml = '';
  if (answers && answers.length > 0) {
    answersHtml = `
      <h3 style="color: #1f4e5a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px;">Onboarding / Survey Answers</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f7fafc;">
            <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left; font-size: 13px; font-weight: 700; color: #4a5568;">Question</th>
            <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left; font-size: 13px; font-weight: 700; color: #4a5568;">Answer</th>
          </tr>
        </thead>
        <tbody>
          ${answers.map(item => `
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 13px; color: #2d3748; font-weight: 600; width: 40%;">${sanitize(item.question)}</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 13px; color: #4a5568;">${sanitize(item.answer)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Account Request</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; padding: 20px 10px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <div style="background-color: #1f4e5a; padding: 24px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">New PrepSumit Account Request</h2>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 24px;">
          <p style="margin-top: 0; font-size: 15px; color: #4a5568;">
            A new user has submitted an account registration request. The account is currently set to <strong>pending_payment</strong> status. Please review the details below and contact the user for payment and validation instructions.
          </p>

          <h3 style="color: #1f4e5a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px;">User Profile Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568; width: 35%;">Full Name:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${sanitize(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Email Address:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;"><a href="mailto:${sanitize(email)}" style="color: #00829a; text-decoration: underline;">${sanitize(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Phone Number (Input):</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${phone ? sanitize(phone) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Phone Country Code:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${phoneCountryCode ? sanitize(phoneCountryCode) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Phone Number (Local):</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${phoneNumber ? sanitize(phoneNumber) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Full Phone Number:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;"><strong>${fullPhoneNumber ? sanitize(fullPhoneNumber) : '<em>Not provided</em>'}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Country:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${country ? sanitize(country) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">City:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${city ? sanitize(city) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">State / Region:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${state ? sanitize(state) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">ZIP / Postal Code:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${zipCode ? sanitize(zipCode) : '<em>Not provided</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Selected Plan:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748; font-weight: bold; color: #10b981;">${sanitize(selectedPlan)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Billing Cycle:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748;">${billingCycle ? sanitize(billingCycle) : 'Monthly'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Account/Role Type:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748; text-transform: capitalize;">${accountType ? sanitize(accountType) : 'Student'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 700; color: #4a5568;">Submission Date:</td>
                <td style="padding: 8px 0; font-size: 14px; color: #2d3748; font-style: italic;">${dateStr}</td>
              </tr>
            </tbody>
          </table>

          ${answersHtml}

          ${additionalInfo ? `
            <h3 style="color: #1f4e5a; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 24px;">Additional Information</h3>
            <p style="background-color: #f7fafc; padding: 12px; border-left: 4px solid #13809c; font-size: 13px; color: #4a5568; margin-top: 10px; white-space: pre-wrap;">
              ${sanitize(additionalInfo)}
            </p>
          ` : ''}

          <!-- Action block -->
          <div style="margin-top: 36px; padding: 18px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; text-align: center;">
            <p style="margin: 0; font-size: 14px; color: #b45309; font-weight: 700;">
              Action Required:
            </p>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #78350f;">
              Please contact this user directly at <a href="mailto:${sanitize(email)}" style="color: #b45309; font-weight: 700; text-decoration: underline;">${sanitize(email)}</a> to send invoice links, secure payment validation forms, and validation guidelines.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f7fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0;">
          PrepSumit Automation System &copy; 2026. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Returns HTML template for the customer confirmation email.
 */
export function getCustomerEmailTemplate(data) {
  const { fullName, selectedPlan } = data;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>We received your PrepSumit account request</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #2d3748; background-color: #f7fafc; padding: 20px 10px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <!-- Header -->
        <div style="background-color: #1f4e5a; padding: 32px 24px; text-align: center; border-bottom: 4px solid #ffb627;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Welcome to PrepSumit!</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 24px;">
          <p style="margin-top: 0; font-size: 16px; color: #2d3748; font-weight: 600;">
            Hello ${sanitize(fullName)},
          </p>
          
          <p style="font-size: 14.5px; color: #4a5568;">
            Thank you for creating an account request with PrepSumit! We are excited to help you achieve your learning, degree, and examination goals.
          </p>

          <p style="font-size: 14.5px; color: #4a5568;">
            We have successfully received your selected plan request: <strong style="color: #1f4e5a;">${sanitize(selectedPlan)}</strong>. Your registration profile has been forwarded to our billing department for validation.
          </p>

          <div style="margin: 24px 0; padding: 20px; background-color: #eef6f8; border-left: 4px solid #00829a; border-radius: 4px;">
            <h4 style="margin: 0 0 8px 0; color: #1f4e5a; font-size: 15px; font-weight: 700;">What Happens Next?</h4>
            <p style="margin: 0; font-size: 13.5px; color: #2d3748; line-height: 1.5;">
              A representative from our billing team will review your application details and contact you shortly through <a href="mailto:billing@prepsumit.com" style="color: #00829a; font-weight: bold; text-decoration: none;">billing@prepsumit.com</a> with payment instructions and account validation guidelines.
            </p>
          </div>

          <h4 style="color: #1f4e5a; font-size: 14px; font-weight: 700; margin-top: 24px;">Important Security Reminders:</h4>
          <ul style="padding-left: 20px; margin: 8px 0; font-size: 13.5px; color: #4a5568; line-height: 1.6;">
            <li style="margin-bottom: 8px;">Please check both your <strong>inbox</strong> and <strong>spam/junk folder</strong> for emails from <a href="mailto:billing@prepsumit.com" style="color: #00829a; text-decoration: none;">billing@prepsumit.com</a>.</li>
            <li style="margin-bottom: 8px;"><strong>Do not make payment</strong> to anyone claiming to represent PrepSumit unless the communication originates from an official, validated email address ending in <strong>@prepsumit.com</strong>.</li>
            <li style="margin-bottom: 8px;">Our customer support team is always available to help verify messages at <a href="mailto:support@prepsumit.com" style="color: #00829a; text-decoration: none;">support@prepsumit.com</a>.</li>
          </ul>

          <p style="font-size: 14px; color: #4a5568; margin-top: 30px;">
            Thank you for choosing PrepSumit as your learning companion. We look forward to helping you succeed!
          </p>
          
          <p style="font-size: 14px; color: #4a5568; margin-bottom: 0;">
            Best regards,<br>
            <strong>PrepSumit Student Success Team</strong><br>
            <a href="mailto:support@prepsumit.com" style="color: #00829a; text-decoration: none;">support@prepsumit.com</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f7fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0;">
          This is an automated request notification. Please hold for incoming validated payment setup instructions from our billing team.
        </div>
      </div>
    </body>
    </html>
  `;
}
