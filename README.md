# Project Name

Scaffolding

## Getting Started

These instructions will give you how set up the project and run on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your local machine.
- [pnpm](https://pnpm.io/) package manager installed.
- [Docker](https://www.docker.com/) installed if running Docker-based services.
-

### Installing

To get a local copy up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/pritambiswas00/production_grade.git
   ```

2. Change into the project directory:

   ```bash
   cd production_grade
   ```

3. Install PNPM package Manager:

   ```bash
   npm install - g pnpm
   ```

4. Install Dependencies:

   ```bash
   pnpm install
   ```

5. Set up environment variables:

   Create a `.env` file in the <rootDir>/apps/server and configure the required environment variables. Refer to the `.env.example` file for guidance.

6. Database Migration for development

Goto <rootDir>/apps/server

```bash
npx knex migrate:latest
```

7. Start the application:

   From the root directory

   ```bash
   pnpm start:app
   ```

8. API Documentation:

   After running the server

   goto http://localhost:<PORT>/docs

### Running Tests

Explain how to run the automated tests for this system:

From <rootDir>

```bash
pnpm test:all
```

### CI/CD Pipeline Reference

- [Github Actions](https://drive.google.com/file/d/1W35AkRdSuc7NBGalt7qEIvEBpwJGuzrc/view?usp=sharing/) CI/CD pipeline of the system

### Server LLD Architecture

- [Inner Architecture](https://drive.google.com/file/d/182w9WX0JYnq77XEwsSv_qLEBI6VeN3Es/view?usp=sharing)

### Deployment Architecture

-[Google Cloud](https://drive.google.com/file/d/1UCTV_l9BCbiniRnfVFe_kVCz_d0SGrZA/view?usp=sharing)
