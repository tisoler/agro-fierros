import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  'use server';
  const { secret, path, tags } = await request.json();

  // Verificar secret de seguridad
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  // Revalidar por path
  if (path) {
    revalidatePath(path);
    console.log(`Revalidated path: ${path}`);
  }

  // Revalidar por tags
  if (tags && Array.isArray(tags)) {
    tags.forEach(tag => {
      revalidateTag(tag, 'max');
      console.log(`Revalidated tag: ${tag}`);
    });
  }

  return NextResponse.json({ revalidated: true });
}
