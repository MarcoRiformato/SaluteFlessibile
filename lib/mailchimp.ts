import mailchimp from '@mailchimp/mailchimp_marketing';
import type { Status } from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., 'us1'
});

// Single audience ID
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

export type SubscriptionType = 'CLIENTS' | 'DOCTORS';

interface MergeFields {
  FNAME: string;     // First Name
  LNAME: string;     // Last Name
  ADDRESS: string;   // Address/City
  PHONE: string;     // Phone
  TYPE: string;      // Type
  SPEC: string;      // Specialization
}

interface SubscribeData {
  email: string;
  type: SubscriptionType;
  tags?: string[];
  merge_fields: MergeFields;
}

export async function getMergeFields() {
  try {
    if (!AUDIENCE_ID) {
      throw new Error('Mailchimp audience ID is not configured');
    }
    const response = await mailchimp.lists.getListMergeFields(AUDIENCE_ID);
    console.log('Mailchimp merge fields:', response);
    return response;
  } catch (error: any) {
    console.error('Error getting merge fields:', error);
    throw error;
  }
}

export async function subscribeToMailchimp({ email, type, tags = [], merge_fields }: SubscribeData) {
  try {
    // Log full configuration for debugging
    const config = {
      apiKey: process.env.MAILCHIMP_API_KEY ? `${process.env.MAILCHIMP_API_KEY.slice(0, 5)}...` : 'Missing',
      server: process.env.MAILCHIMP_SERVER_PREFIX,
      audienceId: AUDIENCE_ID,
    };
    console.log('Mailchimp config:', config);

    // Get merge fields configuration for debugging
    const mergeFieldsConfig = await getMergeFields();
    console.log('Available merge fields:', mergeFieldsConfig);

    if (!AUDIENCE_ID) {
      throw new Error('Mailchimp audience ID is not configured');
    }

    if (!process.env.MAILCHIMP_API_KEY) {
      throw new Error('Mailchimp API key is not configured');
    }

    if (!process.env.MAILCHIMP_SERVER_PREFIX) {
      throw new Error('Mailchimp server prefix is not configured');
    }

    // Create final tags array with type and any additional tags
    const finalTags: string[] = [type];
    if (tags.length > 0) {
      finalTags.push(...tags);
    }

    // Log the exact request we're about to make
    const memberData = {
      email_address: email,
      status: 'subscribed' as Status,
      tags: finalTags,
      merge_fields: {
        ...merge_fields,
      }
    };
    console.log('Mailchimp request data:', memberData);

    const response = await mailchimp.lists.addListMember(AUDIENCE_ID, memberData);
    console.log('Mailchimp API response:', response);
    return { success: true, data: response };
  } catch (error: any) {
    // Enhanced error logging
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      response: error.response?.body,
      status: error.status,
      title: error.title,
      detail: error.detail,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      }
    };
    console.error('Detailed Mailchimp error:', errorDetails);

    // Return more detailed error information
    return { 
      success: false, 
      error: error.response?.body?.detail || error.detail || error.message,
      errorDetails 
    };
  }
} 