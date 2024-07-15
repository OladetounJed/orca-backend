# Orca Backend

This project, Orca Backend, is designed to provide backend services for the Orca application. It's built with Node.js and TypeScript, leveraging Express for the server framework and MongoDB for data persistence. The application also integrates with Telegram for notifications, cloudflare image for image processing and Redis for caching.

## Technical Flow

Below is a simplified flowchart describing the technical flow of the Orca Backend:

```mermaid
sequenceDiagram
    participant Client as Client Request from Telegram bot
    participant Telegram as Telegram Command Handlers
    participant Auth as Authentication
    participant TokenValidation as Token Valid?
    participant Database as Database Operations
    participant Redis as Redis Caching
    participant Response as Return Response

    Client->>+Telegram: /start bot command
    Telegram->>+Redis: Check if session exists for user
    Redis-->>-Telegram: Session exists (if user already interacted)
    Telegram->>+Redis: Store new session in cache (if new user)
    Redis-->>-Telegram: SessionId returned
    Telegram->>Client: Return web URL with sessionId for registration
    Client->>+Auth: Access web URL, fill and submit registration form
    Auth->>+Database: Save new user details
    Database-->>-Auth: User saved
    Auth->>Client: User registered, proceed to login
    Client->>+Auth: Login with credentials
    Auth->>+TokenValidation: Validate provided token
    TokenValidation-->>-Auth: Token valid
    Auth->>+Database: Fetch user details
    Database-->>-Auth: User details fetched
    Auth->>Client: Login successful, return user details and token
    Client->>+Telegram: Send admin command (e.g., /adminhello)
    Telegram->>+Auth: Verify if user is admin
    Auth->>+Database: Check admin status
    Database-->>-Auth: Admin status verified
    Auth-->>-Telegram: Admin verified
    Telegram->>Client: Perform admin operation
    Telegram->>Response: Return response to client
```

This flowchart illustrates the process from receiving client requests, through authentication, database operations, and finally responding to the client. It also highlights the use of Telegram for notifications and Redis for caching within the application.

## Prerequisites

- Node.js 16+
- npm or Yarn
- MongoDB
- Redis

## Installation

1. Clone the repository:

```bash
git clone https://github.com/OladetounJed/orca-backend
Install dependencies:
Create and configure the .env file based on the .env.example template:
Start the application:
```

## Features
- User authentication and registration
- Session management
- Telegram notifications
- Data persistence with MongoDB
- Caching with Redis


## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.
