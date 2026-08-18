import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STORE_PATH = path.join(process.cwd(), 'public', 'custom_products.json');

function readStore(): any[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

function writeStore(products: any[]) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

export async function GET() {
  const products = readStore();
  return NextResponse.json({ success: true, data: products }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || (!body.name && !body.title)) {
      return NextResponse.json({ success: false, error: 'Missing product name' }, { status: 400 });
    }

    const existing = readStore();
    const filtered = existing.filter(
      (p) => p.slug !== body.slug && p.id !== body.id
    );
    filtered.unshift(body);
    writeStore(filtered);

    return NextResponse.json({
      success: true,
      message: 'Product added to Nazara catalog!',
      data: body,
      totalCount: filtered.length,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to save product' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
