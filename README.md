# Mistral AI Chatbot - Deployment

A full-stack chatbot built with Next.js and the Mistral API.
This README explains how to run it locally and how to deploy it to production.

> Link to this project in prod : [https://chatbot.maxime-rouard.fr](https://chatbot.maxime-rouard.fr)

> Check out my other projects at : [My projects](https://maxime-rouard.fr/creations)

---


##  Table of Contents


### General
- [Overview](#overview)
- [Tech Stack](#tech-stack)

### Local run
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Run Locally](#run-locally)

### Deployment - Vercel
- [Overview](#deployment-with-vercel)
- [Requirements](#requirements)
- [Steps to follow](#deployment-steps)

### Deployment - Ubuntu
- [Overview](#deployment-with-ubuntu)
- [Requirements](#requirements-1)
- [Steps to follow](#deployment-steps-1)

---

## Overview

This project is a full-stack Next.js application that implements a chatbot using the **Mistral** API.
Main technologies used:

--- 

## Tech Stack

* **Next.js** (app fully fullstack)
* **NextAuth** for SSO authentication (GitHub & Google)
* **PostgreSQL** for persistent storage
* **Redis** for background tasks
* **Prisma** as ORM for PostgreSQL
* **Mistral API** as the LLM back-end

---

# Quickstart — Local development

## Prerequisites

* Node.js
* npm (or pnpm/yarn)
* PostgreSQL
* Redis

##  Installation

### 1. OAuth Application Setup

Create and register OAuth applications:

- **GitHub**: [GitHub OAuth Apps](https://github.com/settings/developers)
- **Google**: [Google Cloud Console](https://console.cloud.google.com/)

### 2. Database Setup

- **PostgreSQL**: Create a database and obtain the connection URL
- **Redis**: Set up a Redis instance and get the connection URL

### 3. NextAuth Secret

Generate a secret key for NextAuth:

```bash
openssl rand -base64 32
```

---

## Configuration

Create a `.env` file in the project root with the following structure:

```env
# NextAuth Configuration
AUTH_SECRET=your_random_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret

# Access control (emails / domains allowed)
ALLOW_EMAILS='["email@domain.com","email2@domain.com"]'
ALLOW_DOMAINS='["domain.com","domain2.com"]'

# Mistral API 
API_KEY_MISTRAL=your_mistral_api_key

# Databases
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port
```


## Run locally

```bash
# install dependencies
npm install

# generate Prisma client
npx prisma generate
# If you have migrations:
# npx prisma migrate dev --name init

# run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Once the application is running successfully, you can customize the code to match your specific requirements before proceeding to deployment.

---

# Deployment — production guide

This guide covers two deployment options:
- **Vercel**
- **Ubuntu server**

---
## Deployment with Vercel
### Requirements
### Deployment Steps

*In coming*

---

## Deployment with Ubuntu
### Requirements

To deploy this project following these instructions, you'll need:

- An [Ubuntu Server](https://ubuntu.com/download/server) with:
    - SSH access
    - Basic server configuration completed
    - Sudo privileges

- **Network Access**:
    - Access to your router/internet box for port forwarding configuration

### Deployment Steps

*In coming*

---

## Author

**Maxime Rouard** - [Website](https://maxime-rouard.fr)

---

## Show Your Support

Give a ⭐️ if this project helped you!

---

# Links

* Next.js — [https://nextjs.org](https://nextjs.org)
* NextAuth — [https://authjs.dev/](https://authjs.dev/)
* Prisma — [https://www.prisma.io](https://www.prisma.io)
* PostgreSQL — [https://www.postgresql.org](https://www.postgresql.org)
* Redis — [https://redis.io](https://redis.io)
* Mistral — [https://console.mistral.ai](https://console.mistral.ai)


