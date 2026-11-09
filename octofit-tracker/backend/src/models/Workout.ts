import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, min: 0 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, min: 1 },
        reps: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true, collection: 'workouts' },
)

export const Workout = mongoose.model('Workout', workoutSchema)
