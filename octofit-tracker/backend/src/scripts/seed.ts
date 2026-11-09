import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userIds = {
      alex: new mongoose.Types.ObjectId('665000000000000000000001'),
      sam: new mongoose.Types.ObjectId('665000000000000000000002'),
      jordan: new mongoose.Types.ObjectId('665000000000000000000003'),
    };
    const teamIds = {
      trailblazers: new mongoose.Types.ObjectId('666000000000000000000001'),
      paceMakers: new mongoose.Types.ObjectId('666000000000000000000002'),
    };
    const timestamps = {
      createdAt: new Date('2026-10-12T12:00:00.000Z'),
      updatedAt: new Date('2026-10-12T12:00:00.000Z'),
    };

    await User.bulkWrite([
      {
        replaceOne: {
          filter: { _id: userIds.alex },
          replacement: {
            ...timestamps,
            name: 'Alex Morgan',
            email: 'alex.morgan@example.com',
            teamId: teamIds.trailblazers,
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: userIds.sam },
          replacement: {
            ...timestamps,
            name: 'Sam Rivera',
            email: 'sam.rivera@example.com',
            teamId: teamIds.trailblazers,
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: userIds.jordan },
          replacement: {
            ...timestamps,
            name: 'Jordan Lee',
            email: 'jordan.lee@example.com',
            teamId: teamIds.paceMakers,
          },
          upsert: true,
        },
      },
    ]);

    await Team.bulkWrite([
      {
        replaceOne: {
          filter: { _id: teamIds.trailblazers },
          replacement: {
            ...timestamps,
            name: 'Trailblazers',
            memberIds: [userIds.alex, userIds.sam],
            points: 240,
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: teamIds.paceMakers },
          replacement: {
            ...timestamps,
            name: 'Pace Makers',
            memberIds: [userIds.jordan],
            points: 155,
          },
          upsert: true,
        },
      },
    ]);

    await Activity.bulkWrite([
      {
        replaceOne: {
          filter: { _id: new mongoose.Types.ObjectId('667000000000000000000001') },
          replacement: {
            ...timestamps,
            userId: userIds.alex,
            type: 'run',
            durationMinutes: 35,
            distanceKm: 5.2,
            points: 85,
            completedAt: new Date('2026-10-12T08:00:00.000Z'),
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: new mongoose.Types.ObjectId('667000000000000000000002') },
          replacement: {
            ...timestamps,
            userId: userIds.sam,
            type: 'cycling',
            durationMinutes: 50,
            distanceKm: 18,
            points: 95,
            completedAt: new Date('2026-10-12T09:30:00.000Z'),
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: new mongoose.Types.ObjectId('667000000000000000000003') },
          replacement: {
            ...timestamps,
            userId: userIds.jordan,
            type: 'strength',
            durationMinutes: 40,
            points: 75,
            completedAt: new Date('2026-10-12T10:00:00.000Z'),
          },
          upsert: true,
        },
      },
    ]);

    await Leaderboard.bulkWrite([
      {
        replaceOne: {
          filter: { _id: new mongoose.Types.ObjectId('668000000000000000000001') },
          replacement: {
            ...timestamps,
            userId: userIds.alex,
            teamId: teamIds.trailblazers,
            points: 130,
            rank: 1,
            period: 'all-time',
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: new mongoose.Types.ObjectId('668000000000000000000002') },
          replacement: {
            ...timestamps,
            userId: userIds.sam,
            teamId: teamIds.trailblazers,
            points: 110,
            rank: 2,
            period: 'all-time',
          },
          upsert: true,
        },
      },
      {
        replaceOne: {
          filter: { _id: new mongoose.Types.ObjectId('668000000000000000000003') },
          replacement: {
            ...timestamps,
            userId: userIds.jordan,
            teamId: teamIds.paceMakers,
            points: 155,
            rank: 1,
            period: 'weekly',
          },
          upsert: true,
        },
      },
    ]);

    const workouts = [
      new Workout({
        _id: new mongoose.Types.ObjectId('669000000000000000000001'),
        title: 'Beginner Full-Body Circuit',
        description: 'A balanced starter workout for building consistency.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squats', sets: 3, reps: 12 },
          { name: 'Push-ups', sets: 3, reps: 8 },
          { name: 'Plank', sets: 3, reps: 30 },
        ],
      }),
      new Workout({
        _id: new mongoose.Types.ObjectId('669000000000000000000002'),
        title: 'Tempo Run Builder',
        description: 'Intervals that build aerobic endurance and speed.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Easy warm-up run', sets: 1, reps: 10 },
          { name: 'Tempo intervals', sets: 4, reps: 5 },
          { name: 'Cool-down jog', sets: 1, reps: 10 },
        ],
      }),
    ];

    await Workout.bulkWrite(
      workouts.map((workout) => {
        const { _id, ...replacement } = workout.toObject();
        return {
          replaceOne: {
            filter: { _id },
            replacement,
            upsert: true,
          },
        };
      }),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from octofit_db:', error);
      process.exitCode = 1;
    }
  }
}

seedDatabase();
