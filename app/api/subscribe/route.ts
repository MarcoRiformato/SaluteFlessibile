import { NextResponse } from 'next/server';
import { subscribeToMailchimp, SubscriptionType } from '@/lib/mailchimp';

export async function POST(request: Request) {
  try {
    console.log('Received subscription request');
    const { email, type } = await request.json();
    console.log('Subscription data:', { email, type });

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
    const result = await subscribeToMailchimp(email, type as SubscriptionType);
    console.log('Mailchimp API response:', result);

    if (!result.success) {
      console.log('Mailchimp subscription failed:', result.error);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    console.log('Subscription successful');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 