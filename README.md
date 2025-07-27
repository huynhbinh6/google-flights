## App Architecture

```├── .gitignore
├── README.md
├── app.json
├── babel.config.js
├── index.ts
├── package.json
├── src
    ├── App.tsx
    ├── assets
    │   ├── adaptive-icon.png
    │   ├── favicon.png
    │   ├── icon.png
    │   └── splash-icon.png
    ├── components
    │   ├── CustomModal.tsx
    │   ├── Flight.tsx
    │   ├── FlightDateHeader.tsx
    │   ├── FlightTicket.tsx
    │   ├── Header.tsx
    │   ├── Input.tsx
    │   └── PassengersModal.tsx
    ├── helpers
    │   ├── firebaseConfig.ts
    │   └── mockData.ts
    ├── middleware
    │   ├── airportStore.ts
    │   ├── authStore.ts
    │   └── searchStore.ts
    ├── routes
    │   └── MainNavigation.tsx
    ├── screens
    │   ├── booking
    │   │   └── BookingScreen.tsx
    │   ├── home
    │   │   ├── HomeScreen.tsx
    │   │   ├── styles.ts
    │   │   ├── types.ts
    │   │   └── viewModel.ts
    │   ├── login
    │   │   ├── LoginScreen.tsx
    │   │   ├── styles.ts
    │   │   ├── types.ts
    │   │   └── viewModel.ts
    │   ├── profile
    │   │   └── ProfileScreen.tsx
    │   ├── result
    │   │   ├── ResultsScreen.tsx
    │   │   └── types.ts
    │   ├── search
    │   │   ├── SearchScreen.tsx
    │   │   ├── types.ts
    │   │   └── viewModel.ts
    │   └── sign-up
    │   │   ├── SignUpScreen.tsx
    │   │   ├── styles.ts
    │   │   ├── types.ts
    │   │   └── viewModel.ts
    ├── services
    │   └── api
    │   │   ├── airportService.ts
    │   │   ├── axiosClient.ts
    │   │   └── config.ts
    └── utils
    │   ├── colors.ts
    │   ├── convertMinsToHours.ts
    │   └── responsive.ts
├── tsconfig.json
└── yarn.lock
```

# FlightFinder - React Native Expo App

A comprehensive flight booking mobile application built with React Native and Expo, featuring user authentication and flight search capabilities using the Sky Scraper API.

## Features

- **User Authentication**: Complete sign-up and login system with persistent sessions
- **Flight Search**: Search for flights with flexible options (round trip, one way)
- **Real-time Results**: Integration with Sky Scraper API for live flight data
- **Booking System**: Complete booking flow with passenger details
- **User Profile**: Profile management and booking history
- **Responsive Design**: Optimized for both iOS and Android devices

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Expo CLI (`npm install -g expo-cli`)
- RapidAPI account with Sky Scraper API subscription

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

   Or use Yarn:

   ```bash
   yarn i
   ```

3. Configure API Key:

   - Open `services/SkyScrapperAPI.js`
   - Replace `'YOUR_RAPIDAPI_KEY_HERE'` with your actual RapidAPI key

4. Start the development server:
   ```bash
   expo start
   ```

### Running the App

- **iOS Simulator**: Press `i` in the terminal or scan QR code with Expo Go app
- **Android Emulator**: Press `a` in the terminal or scan QR code with Expo Go app
- **Physical Device**: Install Expo Go app and scan the QR code

## API Integration

The app uses the Sky Scraper API from RapidAPI for:

- Flight search and availability
- Airport suggestions and autocomplete
- Flight details and pricing
- Real-time flight data

### API Endpoints Used:

- `/api/v1/flights/search` - Search for flights
- `/api/v1/flights/searchAirport` - Get airport suggestions
- `/api/v1/flights/details` - Get detailed flight information

### Navigation Structure:

- **Authentication Stack**: Login/Sign-up screens
- **Main Tab Navigator**: Home, Search, Profile tabs
- **Flight Stack**: Search → Results → Booking flow

### Key Components:

- `AuthContext`: Manages authentication state
- `SkyScrapperAPI`: Handles all API communications
- `AsyncStorage`: Persists user data and sessions

### Data Flow:

1. User authenticates through login/signup
2. Search parameters are collected in SearchScreen
3. API call made to Sky Scraper API
4. Results displayed in ResultsScreen
5. Booking flow initiated from selected flight

## Customization

### Styling:

- All styles are defined in the main component file
- Color scheme uses iOS blue (#007AFF) as primary
- Consistent spacing and typography throughout

### Adding Features:

- Booking history integration
- Push notifications for flight updates
- Price alerts and tracking
- Multiple passenger support
- Seat selection interface

## Development Notes

### State Management:

- Uses Zustand for authentication
- Component-level state for UI interactions
- AsyncStorage for data persistence

### Error Handling:

- Comprehensive try-catch blocks
- User-friendly error messages
- Network error handling

### Performance:

- Lazy loading for large flight lists
- Efficient re-renders with proper keys
- Optimized API calls with caching

## Deployment

### Building for Production:

```bash
expo build:android
expo build:ios
```

### Publishing Updates:

```bash
expo publish
```

## Support

For issues with the Sky Scraper API integration, refer to the RapidAPI documentation or contact their support team.

## License

This project is for educational purposes. Please ensure you comply with the Sky Scraper API terms of service when using in production.
