### INTRODUTIION

This folder contains a server for managing Pokemon and users.
Locally, it uses json-server version ^1.0.0-alpha.23

### STARTING THE SERVER

To start the server in the terminal at the BE-service folder level, execute the commands:

```
npm i
npm run dev
```

Back-end: http://localhost:3000/

You can also run the same commands a level higher to run the server and frontend project at the same time.

### STRUCTURE

- **Users**
  Contain list of registered users.

- **Favorite Pokemons**
  Contain list of Pokemon mark by user as Favourite.

- **Arena Pokemons**
  Contain list of Pokemon select by user for Fight.
  List is cleared after remove Pokemon from arena or after Fight.

- **Pokemons**
  Contain list of created by user Pokemons.

- **Arena Fights**
  Contain information about Pokemons which take part in Arena Fight.

### DATA MODEL

- id - as unique key
- name - unique name
- height, weight, base_experience - attribiuts of Pokemon (numbers)
- url - endpoint for fetch data from pokeapi

Arena Fights endpoint additionally (only for pokemons take part in fight):

- win - number of win fight
- lose - number of lose fight

Pokemons endpoint:

- img - for display okemon image

- **Favorite & Arena Pokemons** are structured as follows:
  ```
    {
      "id": "54",
      "name": "psyduck",
      "height": 8,
      "weight": 196,
      "base_experience": 64,
      "url": "https://pokeapi.co/api/v2/pokemon/54"
    }
  ```
- **Pokemons** are structured as follows:

  ```
    {
      "id": "54",
      "name": "psyduck",
      "height": 8,
      "weight": 196,
      "base_experience": 64,
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/54.svg"

    }
  ```

- **Arena Fights** are structured as follows:
  ```
    {
      "id": "149",
      "name": "dragonite",
      "height": 22,
      "weight": 2100,
      "base_experience": 310,
      "win": 2,
      "lose": 0,
      "url": "https://pokeapi.co/api/v2/pokemon/149"
    }
  ```

### ENDPOINTS DESCRIPTION

| PATH                   | METHOD | DESC                                                                                                                                                                        |
| ---------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/favoritePokemons`    | GET    | Get all pokemons.                                                                                                                                                           |
| `/favoritePokemons`    | POST   | Add new pokemon to favorite. Required JSON, eg.: `{id: '1', name: 'dragonite', height: 50, weight: 150, base_experience: 150, url: 'https://pokeapi.co/api/v2/pokemon/1'}`. |
| `/favoritePokemons/ID` | DELETE | Remove pokemon with ID.                                                                                                                                                     |

### RESOURCES

`/users`
`/favoritePokemons`
`/arenaPokemons`
`/arenaFights`
`/pokemons`

### USAGE

- Get all Pokemons added to Arena: `[GET] - /arenaPokemons`
- Add new Pokemon to Arena: `[POST] - /arenaPokemons`
- Delete Pokemon from Arena: `[DELETE] - /arenaPokemons/1`
