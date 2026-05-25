import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMemory {
  story?: string;
  weatherConditions?: string;
  temperature?: string;
  emotionalNotes?: string;
  lessonLearned?: string;
  campingExperience?: string;
}

export interface IImage {
  url: string;
  caption?: string;
  type: 'summit' | 'camp' | 'village' | 'nightsky' | 'other';
}

export interface IVideo {
  url: string;
  caption?: string;
  type: 'drone' | 'reel' | 'timelapse' | 'other';
}

export interface ILocation extends Document {
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  region: string;
  altitude: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Extreme';
  status: 'unexplored' | 'planned' | 'explored';
  exploredDate?: Date;
  exploredYear?: number;
  plannedDate?: Date;
  bestSeason: string[];
  weatherInfo?: string;
  routeInformation?: string;
  estimatedDuration?: string;
  preparationChecklist?: string[];
  suggestedEquipment?: string[];
  travelNotes?: string;
  planningNotes?: string;
  memories?: IMemory;
  images?: IImage[];
  videos?: IVideo[];
  trekDistance?: string;
  trekDuration?: string;
  highestPointReached?: number;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    region: {
      type: String,
      required: true,
    },
    altitude: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Difficult', 'Extreme'],
      default: 'Moderate',
    },
    status: {
      type: String,
      enum: ['unexplored', 'planned', 'explored'],
      default: 'unexplored',
    },
    exploredDate: {
      type: Date,
    },
    exploredYear: {
      type: Number,
    },
    plannedDate: {
      type: Date,
    },
    bestSeason: {
      type: [String],
      default: [],
    },
    weatherInfo: {
      type: String,
    },
    routeInformation: {
      type: String,
    },
    estimatedDuration: {
      type: String,
    },
    preparationChecklist: {
      type: [String],
      default: [],
    },
    suggestedEquipment: {
      type: [String],
      default: [],
    },
    travelNotes: {
      type: String,
    },
    planningNotes: {
      type: String,
    },
    memories: {
      story: String,
      weatherConditions: String,
      temperature: String,
      emotionalNotes: String,
      lessonLearned: String,
      campingExperience: String,
    },
    images: [
      {
        url: String,
        caption: String,
        type: {
          type: String,
          enum: ['summit', 'camp', 'village', 'nightsky', 'other'],
          default: 'other',
        },
      },
    ],
    videos: [
      {
        url: String,
        caption: String,
        type: {
          type: String,
          enum: ['drone', 'reel', 'timelapse', 'other'],
          default: 'other',
        },
      },
    ],
    trekDistance: {
      type: String,
    },
    trekDuration: {
      type: String,
    },
    highestPointReached: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for efficient queries
LocationSchema.index({ status: 1 });
LocationSchema.index({ region: 1 });
LocationSchema.index({ exploredYear: 1 });

const Location: Model<ILocation> =
  mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);

export default Location;
