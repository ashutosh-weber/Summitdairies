# Summit Diaries - The Green Pin Journey Across Himalayas

A living cinematic Himalayan explorer dashboard where mountain pins evolve automatically based on exploration status, planned journeys, completed expeditions, and personal travel memories.

## Features

### 🗺️ Dynamic Smart Pin System
- **Red Pin** = Not Explored Yet
- **Yellow Pin** = Planned Journey
- **Green Pin** = Explored Successfully

### 🏔️ Interactive 3D Globe
- Ultra realistic cinematic 3D Earth map
- Himalayan terrain rendering
- Smooth globe movement with realistic elevation
- Animated clouds and atmospheric fog
- Glowing expedition routes

### 📍 Location Management
Each location supports:
- Name, coordinates, region, altitude
- Trek difficulty level
- Status tracking (unexplored/planned/explored)
- Planned and explored dates
- Best season information
- Weather conditions
- Route information
- Preparation checklist
- Suggested equipment
- Travel notes and memories

### 📝 Memory System
For explored locations:
- Personal travel stories
- Weather conditions and temperature
- Emotional memories
- Lessons learned
- Photo galleries (summit, camp, village, night sky)
- Video footage (drone, reels, timelapses)
- Trek statistics

### 📊 Journey Dashboard
- Total locations tracked
- Explored vs planned vs unexplored counts
- Highest altitude reached
- Regions explored
- Total trekking distance
- Yearly expedition timeline

### 🤖 Smart Automation
- Automatic pin color changes based on status
- Date-based completion reminders
- When planned date arrives, app asks: "Is your trip completed?"
- Seamless status transitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Globe**: react-globe.gl + Three.js
- **Icons**: Lucide React

## Installation

1. **Clone the repository**
```bash
cd summit-diaries
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
The `.env.local` file is already configured with your MongoDB connection:
```
MONGODB_URI=mongodb+srv://ashu:ashu123%40@aashu.sobjepu.mongodb.net/summit-diaries?retryWrites=true&w=majority
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

6. **Initialize Locations**
Click the "Initialize Locations" button to populate the database with 12 pre-configured Himalayan locations including:
- Tungnath
- Kedarnath
- Kedartal
- Roopkund
- Valley of Flowers
- Har Ki Dun
- Nanda Devi Base Camp
- Triund
- Hampta Pass
- Pin Parvati Pass
- Chadar Trek
- Markha Valley

## Usage

### Exploring Locations
1. Click on any pin on the 3D globe
2. View detailed information about the location
3. See altitude, region, difficulty, best season, route info, etc.

### Planning a Trek (Red → Yellow)
1. Click on a red (unexplored) pin
2. Click "Plan This Trek"
3. Select a planned date
4. Add planning notes
5. Save - pin automatically turns yellow

### Completing a Trek (Yellow → Green)
1. When the planned date arrives, a popup asks: "Is your trip completed?"
2. Click "Yes, Completed!"
3. Add your memories:
   - Completion date
   - Personal story
   - Weather conditions
   - Temperature
   - Emotional notes
4. Save - pin automatically turns green

### Viewing Explored Treks
1. Click on a green (explored) pin
2. View your complete expedition memory:
   - Completion date
   - Your personal story
   - Weather experience
   - Photos and videos
   - Trek statistics

### Dashboard Stats
- Click "Show Stats" to view comprehensive journey statistics
- See explored count, planned journeys, unexplored locations
- View highest altitude reached
- Track expeditions by year
- Monitor total trek distance

## API Endpoints

### Locations
- `GET /api/locations` - Get all locations
- `POST /api/locations` - Create new location
- `GET /api/locations/[id]` - Get specific location
- `PUT /api/locations/[id]` - Update location
- `DELETE /api/locations/[id]` - Delete location
- `POST /api/locations/init` - Initialize default locations

### Stats
- `GET /api/stats` - Get dashboard statistics

## Database Schema

### Location Model
```typescript
{
  name: String (required)
  coordinates: { lat: Number, lng: Number } (required)
  region: String (required)
  altitude: Number (required)
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Extreme'
  status: 'unexplored' | 'planned' | 'explored'
  exploredDate: Date
  exploredYear: Number
  plannedDate: Date
  bestSeason: [String]
  weatherInfo: String
  routeInformation: String
  estimatedDuration: String
  preparationChecklist: [String]
  suggestedEquipment: [String]
  travelNotes: String
  planningNotes: String
  memories: {
    story: String
    weatherConditions: String
    temperature: String
    emotionalNotes: String
    lessonLearned: String
    campingExperience: String
  }
  images: [{
    url: String
    caption: String
    type: 'summit' | 'camp' | 'village' | 'nightsky' | 'other'
  }]
  videos: [{
    url: String
    caption: String
    type: 'drone' | 'reel' | 'timelapse' | 'other'
  }]
  trekDistance: String
  trekDuration: String
  highestPointReached: Number
  createdAt: Date
  updatedAt: Date
}
```

## Supported Regions

- Uttarakhand (Garhwal & Kumaon Himalayas)
- Himachal Pradesh (Dhauladhar & Pir Panjal Range)
- Ladakh (Zanskar Valley)
- Kashmir
- Nepal border regions

## Design Philosophy

The application is designed to feel like:
- A cinematic expedition documentary
- A living Himalayan memory archive
- A premium mountain storytelling platform
- An intelligent trekking journey dashboard

### UI Features
- Premium cinematic explorer dashboard
- Dark mountain aesthetic
- Realistic terrain atmosphere
- Glowing animated markers
- Glassmorphism popup cards
- Elegant typography
- Immersive scrolling animations
- Smooth Framer Motion transitions

## Build for Production

```bash
npm run build
npm start
```

## Contributing

Feel free to add more Himalayan locations, enhance the memory system, or improve the 3D visualization!

## License

MIT

---

**Happy Trekking! 🏔️**
