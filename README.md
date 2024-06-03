Online version: https://github.com/rciesielski3/Pokedex

POKEDEX
This application summarizes the knowledge gained during a React course and is based on the PokéAPI (https://pokeapi.co/).

REQUIREMENTS

1. Main Page: Contains a Pokémon list with data fetched from PokéAPI.
2. Register/Login: Includes error handling via Zod.
3. Favorites Page: Collects Pokémon marked via a heart icon on the Pokémon card.
4. Arena Page: Handles battles between selected Pokémon.
5. Statistics Page: Displays Pokémon with options to sort them.
6. Edition Page: Allows logged-in users to modify Pokémon attributes and create new Pokémon.

FEATURES

- useState, useEffect: For state manipulation.
- React Router: For managing subpages.
- Context API: For handling login and theme.
- Custom Hooks: For handling data fetching.
- Services: Responsible for pagination, loading, and message handling using Material-UI (MUI).
- Local DB: Using json-server.

RUNNING THE APPLICATION
To run both the front-end and back-end applications simultaneously, open the terminal and execute the following commands:
npm install
npm run dev

The applications will be available at:
Front-end: http://localhost:5173/
Back-end: http://localhost:3000/

Enjoy exploring the world of Pokémon!
