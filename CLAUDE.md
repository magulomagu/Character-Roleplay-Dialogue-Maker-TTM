# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web application for character roleplay dialogue generation using Google's Gemini AI. The app implements a Test-Time-Matching (TTM) methodology for generating more natural character responses.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

The application requires a `GEMINI_API_KEY` environment variable. Create a `.env.local` file:
```
GEMINI_API_KEY=your_api_key_here
```

## Architecture Overview

The application follows a component-based architecture with clear separation of concerns:

- **`/components`**: React UI components
  - `CharacterSetup.tsx`: Character configuration interface
  - `ChatWindow.tsx`: Main chat interface container
  - `ChatMessage.tsx`: Individual message display
  - `StepIndicator.tsx`: Visual progress indicator for TTM steps
  - `LoadingSpinner.tsx`: Loading state component

- **`/services`**: Business logic layer
  - `geminiService.ts`: Handles all Google Gemini AI interactions and implements the TTM methodology

- **Core Files**:
  - `App.tsx`: Main application component that orchestrates the UI flow
  - `types.ts`: TypeScript type definitions for Character, Message, and other domain objects
  - `constants.ts`: Application-wide constants

## Key Implementation Details

### Test-Time-Matching (TTM) Methodology
The app uses a three-step process for generating character responses:
1. **Character Analysis**: Extracts personality traits from input text
2. **Content Generation**: Creates a styleless response based on character personality
3. **Style Application**: Applies the character's language style to the response

This is implemented in `services/geminiService.ts` through three separate API calls to Gemini.

### State Management
- Uses React's built-in `useState` for local component state
- Character and conversation data flow through props
- No external state management library

### Type System
All major data structures are defined in `types.ts`:
- `Character`: Defines character attributes (name, personality, language style)
- `Message`: Chat message structure
- `StepStatus`: TTM process step tracking

## Technical Stack

- **React** 19.1.1 with TypeScript
- **Vite** 6.2.0 for bundling and development
- **Google Generative AI SDK** 1.12.0 (@google/genai)
- **TypeScript** 5.8.2 with strict mode enabled

## Important Notes

- The UI is primarily in Japanese
- No testing framework is currently configured
- No linting or formatting tools are set up
- Path aliasing is configured: `@/` maps to the project root