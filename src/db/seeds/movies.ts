import { db } from '@/db';
import { movies } from '@/db/schema';

async function main() {
    const sampleMovies = [
        {
            title: 'Christmas Carols',
            poster: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=400&h=600&fit=crop',
            rating: 4,
            duration: '2 Hours',
            description: 'It is based on Charles Dickens 1843 novel of the same name and stars Guy Pearce, Andy Serkis, and Stephen Graham. The film tells the story of Ebenezer Scrooge, an elderly miser who is visited by the ghost of his former business partner.',
        },
        {
            title: 'Aladdin',
            poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
            rating: 4,
            duration: '2 Hour',
            description: 'Aladdin is a poor yet kind street urchin who is smitten by a princess. During his adventures he discovers a magical lamp with a genie inside who can grant him three wishes.',
        },
        {
            title: 'Princess Frog',
            poster: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=600&fit=crop',
            rating: 4,
            duration: '1 Hour 37 Minutes',
            description: 'A waitress, desperate to fulfill her dreams as a restaurant owner, is set on a journey to turn a frog prince back into a human being, but she has to face the same problem after she kisses him.',
        },
        {
            title: 'Onward',
            poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
            rating: 4,
            duration: '1 Hour 42 Minutes',
            description: 'Two elven brothers embark on a quest to bring their father back for one day using magic.',
        },
        {
            title: 'Descendants 3',
            poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
            rating: 3,
            duration: '1 Hour 46 Minutes',
            description: 'The teenagers of Disney\'s most infamous villains return to the Isle of the Lost to recruit a new batch of villainous offspring to join them at Auradon Prep.',
        },
    ];

    await db.insert(movies).values(sampleMovies);
    
    console.log('✅ Movies seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});