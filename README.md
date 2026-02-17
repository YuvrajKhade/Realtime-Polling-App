# 🗳️ Real-Time Poll Rooms

<div align="center">

![Poll Rooms Banner](https://img.shields.io/badge/Real--Time-Polling-667eea?style=for-the-badge&logo=polling&logoColor=white)

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Railway](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://railway.app/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

**Create polls. Share links. Watch results update live.**

</div>

---

## 📸 Screenshots

| Home Page | Create Poll | Live Results |
|-----------|-------------|--------------|
| Landing page with features overview | Form to create polls with multiple options | Real-time updating progress bars |

---

## 🚀 Live Demo


🌐 **Project Url** => https://yuvraj-khade-realtime-polling-app.vercel.app/


---

## ✨ Features

- 🗳️ **Create Polls** — Add a question with 2–10 customizable options
- 🔗 **Shareable Links** — Every poll gets a unique URL to share instantly
- ⚡ **Real-Time Updates** — Votes appear live via WebSocket — no page refresh needed
- 🛡️ **Anti-Abuse Protection** — Two mechanisms prevent duplicate and spam voting
- 💾 **Persistent Storage** — Polls and votes survive page refreshes and sessions
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile
- 🎨 **Beautiful UI** — Gradient design with animated progress bars and toast notifications

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Java 21** | Core language |
| **Spring Boot 4.0.2** | REST API framework |
| **Spring WebSocket (STOMP)** | Real-time communication |
| **Spring Data JPA** | Database ORM |
| **MySQL 8.0** | Persistent data storage |
| **Hibernate** | ORM implementation |
| **Lombok** | Boilerplate reduction |
| **Maven** | Dependency management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18.3.1** | UI framework |
| **Vite** | Build tool |
| **Bootstrap 5.3.3** | CSS framework |
| **React Bootstrap** | Bootstrap React components |
| **Axios** | HTTP client |
| **@stomp/stompjs** | WebSocket STOMP client |
| **SockJS** | WebSocket fallback |
| **React Router v6** | Client-side routing |
| **React Toastify** | Toast notifications |

### DevOps & Deployment
| Service | Purpose |
|---------|---------|
| **Railway** | Backend + MySQL hosting |
| **Vercel** | Frontend hosting |
| **GitHub** | Version control & CI/CD |

---

## 📁 Project Structure

```
Realtime-Polling-App/
│
├── 📂 realTimePollRooms_backend/         # Spring Boot Backend
│   ├── src/main/java/com/pollApp/
│   │   ├── config/
│   │   │   ├── WebSocketConfig.java      # STOMP WebSocket configuration
│   │   │   └── CorsConfig.java           # CORS configuration
│   │   ├── controller/
│   │   │   └── PollController.java       # REST API endpoints
│   │   ├── entity/
│   │   │   ├── Poll.java                 # Poll entity
│   │   │   ├── PollOption.java           # Option entity
│   │   │   └── Vote.java                 # Vote entity
│   │   ├── repository/
│   │   │   ├── PollRepository.java
│   │   │   ├── PollOptionRepository.java
│   │   │   └── VoteRepository.java
│   │   ├── service/
│   │   │   └── PollService.java          # Business logic
│   │   └── io/
│   │       ├── CreatePollRequest.java    # Request DTOs
│   │       ├── VoteRequest.java
│   │       ├── PollResponse.java         # Response DTOs
│   │       └── OptionResponse.java
│   └── src/main/resources/
│       └── application.yaml              # App configuration
│
└── 📂 realTimePollRooms_frontend/        # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx                # Navigation bar
    │   │   └── ShareLink.jsx             # Copy share link
    │   ├── pages/
    │   │   ├── Home.jsx                  # Landing page
    │   │   ├── CreatePoll.jsx            # Poll creation form
    │   │   └── ViewPoll.jsx              # Vote + results page
    │   ├── services/
    │   │   ├── api.js                    # Axios API calls
    │   │   └── websocket.js              # WebSocket connection
    │   └── utils/
    │       └── fingerprint.js            # Browser fingerprinting
    └── public/
        └── vercel.json                   # Vercel routing config
```

---

## ⚙️ Local Setup

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Realtime-Polling-App.git
cd Realtime-Polling-App
```

---

### 2️⃣ Backend Setup

```bash
cd realTimePollRooms_backend
```

**Create MySQL database:**
```sql
CREATE DATABASE polling_db;
```

**Update `application.yaml`** for local development:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/polling_db?createDatabaseIfNotExist=true
    username: root
    password: your_password
```

**Run the backend:**
```bash
./mvnw spring-boot:run
```

Backend starts at: `http://localhost:8080`

---

### 3️⃣ Frontend Setup

```bash
cd realTimePollRooms_frontend
```

**Create `.env` file:**
```env
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=http://localhost:8080/ws
```

**Install dependencies and run:**
```bash
npm install
npm run dev
```

Frontend starts at: `http://localhost:3000`

---

## 📋 API Documentation

### Base URL
```
https://realtime-polling-app-production.up.railway.app/api
```

### Endpoints

#### ➕ Create Poll
```http
POST /api/polls
Content-Type: application/json

{
  "question": "Which is your favorite programming language?",
  "options": ["Java", "Python", "JavaScript", "Go"]
}
```

**Response `201 Created`:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "quest": "Which is your favorite programming language?",
  "opts": [
    { "id": 1, "text": "Java", "voteCount": 0 },
    { "id": 2, "text": "Python", "voteCount": 0 },
    { "id": 3, "text": "JavaScript", "voteCount": 0 },
    { "id": 4, "text": "Go", "voteCount": 0 }
  ],
  "totalVotes": 0,
  "createdAt": "2026-02-15T19:00:00"
}
```

---

#### 🔍 Get Poll
```http
GET /api/polls/{pollId}
```

**Response `200 OK`:** Same structure as above with current vote counts.

---

#### 🗳️ Submit Vote
```http
POST /api/polls/{pollId}/vote
Content-Type: application/json

{
  "optId": 1,
  "voterId": "fp_123456789_1234567890"
}
```

**Response `200 OK`:** Updated poll with new vote counts.

**Response `409 Conflict`:**
```json
{
  "error": "You have already voted in this poll"
}
```

---

#### 🔌 WebSocket
```
wss://realtime-polling-app-production.up.railway.app/ws
```

**Subscribe to poll updates:**
```javascript
client.subscribe(`/topic/poll/${pollId}`, (message) => {
  const updatedPoll = JSON.parse(message.body);
  // Update UI with new vote counts
});
```

---

## 🛡️ Fairness & Anti-Abuse Mechanisms

### Mechanism 1 — Browser Fingerprinting + LocalStorage

**What it prevents:**
Stops the same browser/device from voting multiple times in the same poll.

**How it works:**
A unique `voterId` is generated using browser characteristics (screen resolution, timezone, language) and stored in `localStorage`. When a vote is submitted, this `voterId` is sent to the backend. The backend checks the `votes` table for a record with the same `pollId + voterId` combination. If found, a `409 Conflict` is returned.

```javascript
// fingerprint.js — generates unique persistent browser ID
const data = `${screenResolution}-${timezone}-${language}`
let hash = generateHash(data)
localStorage.setItem('voterId', `fp_${hash}_${Date.now()}`)
```

**Limitation:**
Clearing `localStorage` or using a different browser generates a new ID, allowing a repeat vote from the same person.

---

### Mechanism 2 — IP Address Tracking

**What it prevents:**
Stops multiple votes from the same network/device, even if different browsers or incognito windows are used.

**How it works:**
The backend captures the voter's IP address from the HTTP request (checking `X-Forwarded-For`, `X-Real-IP`, and `getRemoteAddr()` headers). Before saving a vote, it checks if any vote already exists for the same `pollId + IP` combination. If found, voting is blocked.

```java
// PollController.java — extract real client IP
String ip = request.getHeader("X-Forwarded-For");
if (ip == null) ip = request.getRemoteAddr();

// PollService.java — check for duplicate IP vote
if (voteRepo.existsByPollIdAndVoterIp(pollId, voterIp)) {
    throw new AlreadyVotedException("A vote from your network already exists");
}
```

**Limitation:**
Users behind VPNs or proxies can bypass this. In shared networks (offices, universities), the first voter blocks everyone else on the same IP.

---

## 🧩 Edge Cases Handled

| Edge Case | How It's Handled |
|-----------|-----------------|
| **Empty poll options** | Validation rejects polls with fewer than 2 options |
| **Blank question** | Backend `@NotBlank` validation returns 400 error |
| **Duplicate vote (same browser)** | Blocked by `voterId` uniqueness check in DB |
| **Duplicate vote (same IP)** | Blocked by IP address uniqueness check in DB |
| **Poll not found** | Returns friendly "Poll not found" UI message |
| **Network failure during vote** | Axios catches error, shows toast notification |
| **WebSocket disconnects** | STOMP client auto-reconnects every 5 seconds |
| **Refreshing poll page** | `localStorage` preserves voted state across refreshes |
| **Concurrent votes** | DB unique constraint prevents race conditions |
| **Max options exceeded** | Frontend blocks adding more than 10 options |
| **Long question/options** | Character limits enforced (500 / 200 chars) |
| **Invalid option selected** | Backend verifies option belongs to the poll |
| **Page refresh clears vote** | LocalStorage persists `voted_{pollId}` flag |
| **CORS across domains** | CORS config allows frontend Vercel domain |

---

## ⚠️ Known Limitations

| Limitation | Description |
|-----------|-------------|
| **No user authentication** | Anyone with the link can vote; no login required |
| **VPN bypass** | IP tracking can be circumvented using a VPN or proxy |
| **Shared IP blocking** | Users on the same network (e.g., office Wi-Fi) — only one can vote per poll |
| **LocalStorage reset** | Clearing browser data allows re-voting from the same browser |
| **No poll expiration** | Polls exist indefinitely; no auto-close feature |
| **No poll editing** | Once created, a poll's question and options cannot be modified |
| **Single choice only** | Multi-choice voting is not supported |
| **No poll deletion** | Poll creators cannot delete their polls |
| **In-memory WebSocket broker** | Using simple broker; not suitable for multi-instance deployments |
| **No rate limiting** | No API rate limiting implemented (can be abused via rapid requests) |

---

## 🔮 Future Improvements

- [ ] 🔐 User authentication (JWT-based)
- [ ] ⏰ Poll expiration / auto-close dates
- [ ] ✏️ Poll editing and deletion by creator
- [ ] ☑️ Multi-choice voting support
- [ ] 📊 Advanced analytics and voting history
- [ ] 📧 Email notifications for poll results
- [ ] 🔒 Password-protected polls
- [ ] 🚦 API rate limiting (Redis-based)
- [ ] 🌐 Multi-language support
- [ ] 📱 Progressive Web App (PWA) support

---

## 🚀 Deployment

### Backend — Railway

| Variable | Value |
|----------|-------|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DATABASE_URL` | `jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false` |
| `SPRING_DATASOURCE_USERNAME` | `${{MySQL.MYSQLUSER}}` |
| `SPRING_DATASOURCE_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

### Frontend — Vercel

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://realtime-polling-app-production.up.railway.app/api` |
| `VITE_WS_URL` | `https://realtime-polling-app-production.up.railway.app/ws` |

---

## 📂 Database Schema

```sql
-- Polls table
CREATE TABLE polls (
  id          VARCHAR(36) PRIMARY KEY,
  quest       VARCHAR(500) NOT NULL,
  creator_ip  VARCHAR(45) NOT NULL,
  created_at  DATETIME NOT NULL
);

-- Poll Options table
CREATE TABLE poll_options (
  id       BIGINT AUTO_INCREMENT PRIMARY KEY,
  text     VARCHAR(200) NOT NULL,
  poll_id  VARCHAR(36) NOT NULL,
  FOREIGN KEY (poll_id) REFERENCES polls(id)
);

-- Votes table
CREATE TABLE votes (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  poll_id    VARCHAR(36) NOT NULL,
  option_id  BIGINT NOT NULL,
  voter_id   VARCHAR(100) NOT NULL,
  voter_ip   VARCHAR(45) NOT NULL,
  voted_at   DATETIME NOT NULL,
  UNIQUE KEY uk_poll_voter (poll_id, voter_id),
  UNIQUE KEY uk_poll_ip    (poll_id, voter_ip)
);
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Yuvraj Khade**

[![GitHub](https://img.shields.io/badge/GitHub-YuvrajKhade-181717?style=flat-square&logo=github)](https://github.com/YuvrajKhade)

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ using Spring Boot & React

⭐ Star this repo if you found it helpful!

</div>
