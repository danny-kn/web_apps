# Presentation Evaluation System

## Quick Start Guide

### Prerequisites

-   Ruby 3.0.1 or higher
-   PostgreSQL 14 or higher
-   Node.js and Yarn

### First-Time Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd finalproject-team1
    ```

2. Install dependencies:

    ```bash
    bundle install
    yarn install
    ```

3. Database setup:

    ```bash
    # Create PostgreSQL user (if not exists)
    sudo -u postgres createuser -s your_username
    sudo -u postgres psql
    # In PostgreSQL prompt:
    ALTER USER your_username WITH PASSWORD 'your_password';
    \q
    # Set up the database
    rails db:create
    rails db:migrate
    ```

4. Start the server:

    ```bash
    rails server
    ```

5. Visit `http://localhost:3000` in your browser

### Running Tests

```bash
rails test
```

### Common Issues and Solutions

-   If you encounter database connection issues, check `config/database.yml` configuration
-   For "role does not exist" errors, ensure your PostgreSQL user is set up correctly
-   For tmp directory issues, you may need to run `rails tmp:clear`

## To-do's Steps

-   [x] **Initial Setup**

    -   [x] Install Ruby on Rails

    -   [x] Set up PostgreSQL database

    -   [x] Initialize Git repository

    -   [x] Create initial models and migrations

-  [x] **Authentication System**

    - [x] Install and configure Devise gem
    - [x] Set up user registration and login
    - [x] Create user roles (student, instructor, TA)

-  [x] **Course Management**

    [x] create and edit course functionality
    [x] Implement student enrollment system
    [x] Add course dashboard view


-  [x] **Presentation Management**

    - [ ] Build presentation student view
    - [ ] Build presentation instructor/TA view with grading
    - [ ] Build presentation creation system

-  [x] **Evaluation System**

    - [ ] Create presentation evaluation interface in student presentation view
    - [ ] Create feedback view for student for their own presentation
