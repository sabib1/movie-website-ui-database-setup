import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { movies } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single movie by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: 'Valid ID is required',
            code: 'INVALID_ID' 
          },
          { status: 400 }
        );
      }

      const movie = await db.select()
        .from(movies)
        .where(eq(movies.id, parseInt(id)))
        .limit(1);

      if (movie.length === 0) {
        return NextResponse.json(
          { error: 'Movie not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(movie[0], { status: 200 });
    }

    // List movies with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(movies);

    if (search) {
      query = query.where(
        or(
          like(movies.title, `%${search}%`),
          like(movies.description, `%${search}%`)
        )
      );
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, poster, rating, duration, description } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { 
          error: 'Title is required',
          code: 'MISSING_TITLE' 
        },
        { status: 400 }
      );
    }

    if (!poster) {
      return NextResponse.json(
        { 
          error: 'Poster is required',
          code: 'MISSING_POSTER' 
        },
        { status: 400 }
      );
    }

    if (rating === undefined || rating === null) {
      return NextResponse.json(
        { 
          error: 'Rating is required',
          code: 'MISSING_RATING' 
        },
        { status: 400 }
      );
    }

    if (!duration) {
      return NextResponse.json(
        { 
          error: 'Duration is required',
          code: 'MISSING_DURATION' 
        },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { 
          error: 'Description is required',
          code: 'MISSING_DESCRIPTION' 
        },
        { status: 400 }
      );
    }

    // Validate rating is between 1 and 5
    const ratingNum = parseInt(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { 
          error: 'Rating must be between 1 and 5',
          code: 'INVALID_RATING' 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      title: title.trim(),
      poster: poster.trim(),
      rating: ratingNum,
      duration: duration.trim(),
      description: description.trim()
    };

    const newMovie = await db.insert(movies)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newMovie[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const movieId = parseInt(id);

    // Check if movie exists
    const existingMovie = await db.select()
      .from(movies)
      .where(eq(movies.id, movieId))
      .limit(1);

    if (existingMovie.length === 0) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, poster, rating, duration, description } = body;

    // Validate rating if provided
    if (rating !== undefined && rating !== null) {
      const ratingNum = Number(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json(
          { 
            error: 'Rating must be between 1 and 5',
            code: 'INVALID_RATING' 
          },
          { status: 400 }
        );
      }
    }

    // Build update object with only provided fields
    const updates: Record<string, any> = {};

    if (title !== undefined) {
      updates.title = String(title).trim();
    }

    if (poster !== undefined) {
      updates.poster = String(poster).trim();
    }

    if (rating !== undefined && rating !== null) {
      updates.rating = Number(rating);
    }

    if (duration !== undefined) {
      updates.duration = String(duration).trim();
    }

    if (description !== undefined) {
      updates.description = String(description).trim();
    }

    // If no fields to update, return current movie
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(existingMovie[0], { status: 200 });
    }

    const updatedMovie = await db.update(movies)
      .set(updates)
      .where(eq(movies.id, movieId))
      .returning();

    return NextResponse.json(updatedMovie[0], { status: 200 });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const movieId = parseInt(id);

    // Check if movie exists
    const existingMovie = await db.select()
      .from(movies)
      .where(eq(movies.id, movieId))
      .limit(1);

    if (existingMovie.length === 0) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }

    const deleted = await db.delete(movies)
      .where(eq(movies.id, movieId))
      .returning();

    return NextResponse.json(
      { 
        message: 'Movie deleted successfully',
        movie: deleted[0]
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}