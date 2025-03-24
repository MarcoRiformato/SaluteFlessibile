import { NextResponse } from 'next/server';
import { subscribeToMailchimp, SubscriptionType } from '@/lib/mailchimp';

export async function POST(request: Request) {
  try {
    console.log('Received subscription request');
    const { email, type, merge_fields } = await request.json();
    console.log('Subscription data:', { email, type, merge_fields });

    if (!email || !type) {
      console.log('Missing email or type');
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    if (!['CLIENTS', 'DOCTORS'].includes(type)) {
      console.log('Invalid type:', type);
      return NextResponse.json(
        { error: 'Invalid subscription type' },
        { status: 400 }
      );
    }

    console.log('Calling Mailchimp API...');
    const result = await subscribeToMailchimp(email, type as SubscriptionType, merge_fields);
    console.log('Mailchimp API response:', result);

    if (!result.success) {
      console.log('Mailchimp subscription failed:', result.error);
      return NextResponse.json(
        { 
          error: result.error,
          details: result.errorDetails 
        },
        { status: 500 }
      );
    }

    console.log('Subscription successful');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        details: {
          message: error.message,
          stack: error.stack
        }
      },
      { status: 500 }
    );
  }
} 