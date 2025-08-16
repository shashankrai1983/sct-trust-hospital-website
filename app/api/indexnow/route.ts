import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '55a5521d0a6846b693720dc0c7ba3e4e';
const DOMAIN = 'dramitashukla.com';
const KEY_LOCATION = `https://${DOMAIN}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

interface IndexNowRequest {
  urls: string | string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: IndexNowRequest = await request.json();
    
    if (!body.urls) {
      return NextResponse.json(
        { error: 'URLs are required' },
        { status: 400 }
      );
    }

    // Normalize URLs to array
    const urlList = Array.isArray(body.urls) ? body.urls : [body.urls];
    
    // Validate URLs
    const validatedUrls = urlList
      .filter(url => {
        try {
          const parsedUrl = new URL(url);
          return parsedUrl.hostname === DOMAIN || parsedUrl.hostname === `www.${DOMAIN}`;
        } catch {
          return false;
        }
      })
      .slice(0, 1000); // IndexNow limit per request

    if (validatedUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs for this domain' },
        { status: 400 }
      );
    }

    // Prepare IndexNow payload
    const payload: IndexNowPayload = {
      host: DOMAIN,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: validatedUrls
    };

    // Submit to IndexNow
    const response = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Dr. Amita Shukla Website/1.0'
      },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text();
    
    // Log for monitoring
    console.log(`IndexNow submission:`, {
      urls: validatedUrls,
      status: response.status,
      response: responseText
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        submitted: validatedUrls.length,
        urls: validatedUrls
      });
    } else {
      // Handle IndexNow errors
      let errorMessage = 'Unknown error';
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid format - check URL structure';
          break;
        case 403:
          errorMessage = 'Invalid key - verification failed';
          break;
        case 422:
          errorMessage = 'URLs do not match the specified host';
          break;
        case 429:
          errorMessage = 'Too many requests - rate limit exceeded';
          break;
        default:
          errorMessage = `HTTP ${response.status}: ${responseText}`;
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          status: response.status,
          details: responseText
        },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to test the service
export async function GET() {
  return NextResponse.json({
    service: 'IndexNow Integration',
    domain: DOMAIN,
    keyLocation: KEY_LOCATION,
    status: 'operational',
    usage: {
      endpoint: '/api/indexnow',
      method: 'POST',
      payload: {
        urls: 'string | string[] - URLs to submit for indexing'
      }
    }
  });
}