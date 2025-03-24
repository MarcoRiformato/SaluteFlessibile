import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
});

// Single audience ID
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

export type SubscriptionType = 'CLIENTS' | 'DOCTORS';

export async function subscribeToMailchimp(email: string, type: SubscriptionType) {
  try {
    if (!AUDIENCE_ID) {
      throw new Error('Mailchimp audience ID is not configured');
    }

    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      tags: [type],
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return { success: false, error };
  }
} 