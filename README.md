# Airport API

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd airport-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Sync the database:
    ```sh
    npm run sync
    ```

4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### GET /airport

Fetch airport details by IATA code.

**Parameters:**

- `iata_code` (required): The IATA code of the airport.

**Response:**

- `name`: Name of the airport.
- `iata_code`: IATA code of the airport.
- `city`: Name of the city where the airport is located.
- `country`: Name of the country where the airport is located (null if not available).

**Example:**

```sh
curl http://localhost:3000/airport?iata_code=JFK
