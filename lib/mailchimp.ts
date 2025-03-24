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
    console.log('Mailchimp config:', {
      apiKey: process.env.MAILCHIMP_API_KEY ? 'Present' : 'Missing',
      server: process.env.MAILCHIMP_SERVER_PREFIX,
      audienceId: AUDIENCE_ID,
    });

    if (!AUDIENCE_ID) {
      throw new Error('Mailchimp audience ID is not configured');
    }

    if (!process.env.MAILCHIMP_API_KEY) {
      throw new Error('Mailchimp API key is not configured');
    }

    if (!process.env.MAILCHIMP_SERVER_PREFIX) {
      throw new Error('Mailchimp server prefix is not configured');
    }

    console.log('Adding member to Mailchimp:', { email, type });
    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
      tags: [type],
    });

    console.log('Mailchimp API response:', response);
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Mailchimp subscription error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.body,
    });
    return { 
      success: false, 
      error: error.response?.body?.detail || error.message 
    };
  }
} 