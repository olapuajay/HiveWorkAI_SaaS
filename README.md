# WorkHiveAI Backend API Documentation

A comprehensive multi-tenant Human Resource Management (HRMS) SaaS backend built with Node.js, Express, and MongoDB. Includes AI-powered insights, real-time notifications, attendance tracking, leave management, payroll processing, and performance reviews.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [Authentication & Authorization](#authentication--authorization)
- [API Documentation](#api-documentation)
- [Socket.io Real-time Events](#socketio-real-time-events)
- [Error Handling](#error-handling)
- [Postman Collection](#postman-collection)
- [Common Request/Response Patterns](#common-requestresponse-patterns)
- [Development & Deployment](#development--deployment)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js v5.2.1 |
| **Database** | MongoDB 9.0.2 |
| **Authentication** | JWT (jsonwebtoken 9.0.3) |
| **Password Hashing** | bcryptjs 3.0.3 |
| **Real-time Communication** | Socket.io 4.8.1 |
| **File Upload** | Multer 2.0.2 |
| **Cloud Storage** | Cloudinary 2.8.0 |
| **PDF Generation** | PDFKit 0.17.2 |
| **AI Integration** | Google Gemini AI (@google/genai 1.34.0) |
| **Email** | Nodemailer 7.0.11 |
| **HTTP Client** | Axios 1.13.2 |
| **Logging** | Morgan 1.10.1 |
| **Environment** | dotenv 17.2.3 |
| **CORS** | cors 2.8.5 |

---

## 📁 Project Structure

```
backend/
├── server.js                    # Server entry point
├── package.json                 # Dependencies & scripts
├── src/
│   ├── app.js                  # Express app configuration
│   ├── config/                 # Configuration files
│   │   ├── db.js              # MongoDB connection
│   │   ├── socket.js          # Socket.io setup
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── gemini.js          # Gemini AI configuration
│   ├── controllers/            # Request handlers
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   ├── attendanceController.js
│   │   ├── leaveController.js
│   │   ├── payrollController.js
│   │   ├── performanceController.js
│   │   ├── aiController.js
│   │   ├── adminController.js
│   │   └── notificationController.js
│   ├── models/                 # Database schemas
│   │   ├── User.js
│   │   ├── Company.js
│   │   ├── Attendance.js
│   │   ├── Leave.js
│   │   ├── Payroll.js
│   │   ├── Payslip.js
│   │   ├── Performance.js
│   │   └── Notification.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── performanceRoutes.js
│   │   └── aiRoutes.js
│   ├── middlewares/            # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── tenantMiddleware.js
│   │   └── errorHandler.js
│   ├── services/               # Business logic
│   │   ├── aiService.js
│   │   ├── attendanceService.js
│   │   ├── leaveService.js
│   │   ├── payrollService.js
│   │   └── pdfService.js
│   └── utils/                  # Utility functions
│       └── generateToken.js
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Clone and Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

### Step 3: Configure Environment Variables
Edit `.env` file with your credentials (see [Environment Variables](#environment-variables))

### Step 4: Start Development Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will be running on `http://localhost:5001` (or your configured PORT)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URL=mongodb://localhost:27017/workhive_ai

# JWT & Authentication
JWT_SECRET=your_jwt_secret_key_here_make_it_strong
JWT_EXPIRES_IN=7d

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Email Configuration (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@workhive.com

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000

# Socket.io Configuration
SOCKET_URL=http://localhost:5001
```

---

## 📊 Database Models

### 1. **Company Model**
```javascript
{
  _id: ObjectId,
  name: String (required),
  domain: String (required, unique), // e.g., "acmecorp"
  subscriptionPlan: String // "FREE", "PRO", "ENTERPRISE"
  emailConfig: {
    fromEmail: String,
    provider: String,
    isVerified: Boolean
  },
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **User Model**
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: Company, required),
  name: String (required),
  email: String (required),
  password: String (required, hashed),
  role: String // "EMPLOYEE", "ADMIN", "HR" (default: "EMPLOYEE")
  isActive: Boolean (default: true),
  department: String,
  designation: String,
  salary: {
    base: Number (default: 0),
    hra: Number (default: 0),
    allowances: Number (default: 0)
  },
  shift: {
    startTime: String, // "09:00"
    endTime: String    // "17:00"
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **Attendance Model**
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: Company, required),
  employee: ObjectId (ref: User, required),
  date: String (format: "YYYY-MM-DD", required),
  clockIn: Date,
  clockOut: Date,
  totalHours: Number (default: 0),
  status: String // "PRESENT", "ABSENT", "LATE"
  createdAt: Date,
  updatedAt: Date
}

// Unique Index: { company: 1, employee: 1, date: 1 }
```

### 4. **Leave Model**
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: Company, required),
  employee: ObjectId (ref: User, required),
  type: String // "CASUAL", "SICK", "PAID", "UNPAID" (required)
  reason: String,
  startDate: Date (required),
  endDate: Date (required),
  totalDays: Number (required),
  status: String // "PENDING", "APPROVED", "REJECTED" (default: "PENDING")
  reviewedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **Payroll Model**
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: Company, required),
  employee: ObjectId (ref: User, required),
  month: Number (required), // 1-12
  year: Number (required), // 2024
  grossSalary: Number (required),
  deductions: Number (default: 0),
  netSalary: Number (required),
  lopDays: Number (default: 0), // Loss of Pay
  status: String // "GENERATED", "PAID" (default: "GENERATED")
  createdAt: Date,
  updatedAt: Date
}

// Unique Index: { company: 1, employee: 1, month: 1, year: 1 }
```

### 6. **Payslip Model**
```javascript
{
  _id: ObjectId,
  payroll: ObjectId (ref: Payroll, required),
  pdfUrl: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### 7. **Performance Model**
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: Company, required),
  employee: ObjectId (ref: User, required),
  period: String // "MONTHLY", "QUARTERLY" (required)
  month: Number, // 1-12 (for monthly reviews)
  year: Number (required),
  metrics: {
    attendanceScore: Number (0-10),
    taskCompletionScore: Number (0-10),
    punctualityScore: Number (0-10),
    teamworkScore: Number (0-10)
  },
  overallScore: Number (0-10),
  feedback: String,
  reviewedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}

// Unique Index: { company: 1, employee: 1, period: 1, month: 1, year: 1 }
```

### 8. **Notification Model**
```javascript
{
  _id: ObjectId,
  company: ObjectId (ref: Company),
  user: ObjectId (ref: User),
  type: String // "NOTIFICATION", "ALERT", "SYSTEM"
  title: String,
  message: String,
  isRead: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure
```javascript
{
  userId: ObjectId,
  companyId: ObjectId,
  role: String, // "EMPLOYEE", "ADMIN", "HR"
  expiresIn: "7d"
}
```

### Token Format
- **Location**: `Authorization` header
- **Format**: `Bearer <token>`
- **Example**: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Role-Based Access Control

| Route | ADMIN | HR | EMPLOYEE |
|-------|-------|----|----|
| **Auth** | | | |
| POST `/api/auth/register` | ✓ | - | - |
| POST `/api/auth/login` | ✓ | ✓ | ✓ |
| **Employees** | | | |
| POST `/api/employees` | ✓ | ✓ | - |
| GET `/api/employees` | ✓ | ✓ | - |
| GET `/api/employees/:id` | ✓ | ✓ | - |
| PUT `/api/employees/:id` | ✓ | ✓ | - |
| DELETE `/api/employees/:id` | ✓ | - | - |
| GET `/api/employees/me/profile` | - | - | ✓ |
| **Attendance** | | | |
| POST `/api/attendance/clock-in` | - | - | ✓ |
| POST `/api/attendance/clock-out` | - | - | ✓ |
| GET `/api/attendance/me` | - | - | ✓ |
| GET `/api/attendance` | ✓ | ✓ | - |
| **Leaves** | | | |
| POST `/api/leaves` | - | - | ✓ |
| GET `/api/leaves/me` | - | - | ✓ |
| GET `/api/leaves` | ✓ | ✓ | - |
| PUT `/api/leaves/:id/review` | ✓ | ✓ | - |
| **Payroll** | | | |
| POST `/api/payroll/generate` | ✓ | ✓ | - |
| GET `/api/payroll` | ✓ | ✓ | - |
| GET `/api/payroll/me` | - | - | ✓ |
| GET `/api/payroll/payslips` | - | - | ✓ |
| **Performance** | | | |
| POST `/api/performance/review` | ✓ | ✓ | - |
| GET `/api/performance` | ✓ | ✓ | - |
| GET `/api/performance/me` | - | - | ✓ |
| **AI Features** | | | |
| GET `/api/ai/attendance-summary` | - | - | ✓ |
| GET `/api/ai/payslip/:id/explain` | - | - | ✓ |
| GET `/api/ai/performance-insights` | ✓ | ✓ | - |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5001/api
```

---

## Auth Routes

### 1. Register Company
Register a new company and create an admin user.

**Endpoint**: `POST /auth/register`
**Authentication**: No (Public)

**Request**:
```json
{
  "companyName": "Acme Corporation",
  "domain": "acmecorp",
  "name": "John Doe",
  "email": "admin@acmecorp.com",
  "password": "SecurePassword123"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "role": "ADMIN"
  },
  "company": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Acme Corporation",
    "domain": "acmecorp",
    "subscriptionPlan": "FREE",
    "isActive": true,
    "createdAt": "2024-02-09T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login
Login as any user (Employee, HR, or Admin).

**Endpoint**: `POST /auth/login`
**Authentication**: No (Public)

**Request**:
```json
{
  "email": "admin@acmecorp.com",
  "password": "SecurePassword123"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "role": "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Employee Routes

### 1. Create Employee
Create a new employee in the company.

**Endpoint**: `POST /employees`
**Authentication**: Required | **Roles**: ADMIN, HR

**Request**:
```json
{
  "name": "Alice Smith",
  "email": "alice@acmecorp.com",
  "password": "SecurePassword123",
  "role": "EMPLOYEE",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": {
    "base": 50000,
    "hra": 5000,
    "allowances": 2000
  },
  "shift": {
    "startTime": "09:00",
    "endTime": "17:00"
  }
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "employee": {
    "_id": "507f1f77bcf86cd799439013",
    "company": "507f1f77bcf86cd799439012",
    "name": "Alice Smith",
    "email": "alice@acmecorp.com",
    "role": "EMPLOYEE",
    "isActive": true,
    "department": "Engineering",
    "designation": "Software Engineer",
    "salary": {
      "base": 50000,
      "hra": 5000,
      "allowances": 2000
    },
    "shift": {
      "startTime": "09:00",
      "endTime": "17:00"
    },
    "createdAt": "2024-02-09T10:35:00Z",
    "updatedAt": "2024-02-09T10:35:00Z"
  }
}
```

---

### 2. Get All Employees
Retrieve all employees in the company (excluding Admins).

**Endpoint**: `GET /employees`
**Authentication**: Required | **Roles**: ADMIN, HR

**Response** (200 OK):
```json
{
  "success": true,
  "employees": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Alice Smith",
      "email": "alice@acmecorp.com",
      "role": "EMPLOYEE",
      "department": "Engineering",
      "designation": "Software Engineer",
      "isActive": true,
      "createdAt": "2024-02-09T10:35:00Z"
    }
  ]
}
```

---

### 3. Get Employee by ID
Retrieve a specific employee details.

**Endpoint**: `GET /employees/:id`
**Authentication**: Required | **Roles**: ADMIN, HR
**Path Parameters**:
- `id` (string, required) - Employee's MongoDB ID

**Response** (200 OK):
```json
{
  "success": true,
  "employee": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Alice Smith",
    "email": "alice@acmecorp.com",
    "role": "EMPLOYEE",
    "department": "Engineering",
    "designation": "Software Engineer",
    "salary": {
      "base": 50000,
      "hra": 5000,
      "allowances": 2000
    },
    "shift": {
      "startTime": "09:00",
      "endTime": "17:00"
    },
    "isActive": true,
    "createdAt": "2024-02-09T10:35:00Z"
  }
}
```

---

### 4. Update Employee
Update employee details.

**Endpoint**: `PUT /employees/:id`
**Authentication**: Required | **Roles**: ADMIN, HR

**Request** (partial update):
```json
{
  "designation": "Senior Software Engineer",
  "salary": {
    "base": 60000,
    "hra": 6000,
    "allowances": 3000
  },
  "department": "Engineering"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "employee": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Alice Smith",
    "email": "alice@acmecorp.com",
    "role": "EMPLOYEE",
    "department": "Engineering",
    "designation": "Senior Software Engineer",
    "salary": {
      "base": 60000,
      "hra": 6000,
      "allowances": 3000
    },
    "updatedAt": "2024-02-09T11:00:00Z"
  }
}
```

---

### 5. Deactivate Employee
Deactivate an employee (soft delete).

**Endpoint**: `DELETE /employees/:id`
**Authentication**: Required | **Roles**: ADMIN

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Employee deactivated successfully",
  "employee": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Alice Smith",
    "isActive": false,
    "updatedAt": "2024-02-09T11:05:00Z"
  }
}
```

---

### 6. Get My Profile
Get the current logged-in employee's profile.

**Endpoint**: `GET /employees/me/profile`
**Authentication**: Required | **Roles**: EMPLOYEE

**Response** (200 OK):
```json
{
  "success": true,
  "profile": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Alice Smith",
    "email": "alice@acmecorp.com",
    "role": "EMPLOYEE",
    "department": "Engineering",
    "designation": "Senior Software Engineer",
    "salary": {
      "base": 60000,
      "hra": 6000,
      "allowances": 3000
    },
    "shift": {
      "startTime": "09:00",
      "endTime": "17:00"
    },
    "isActive": true,
    "createdAt": "2024-02-09T10:35:00Z"
  }
}
```

---

## Attendance Routes

### 1. Clock In
Record clock-in time (start of work day).

**Endpoint**: `POST /attendance/clock-in`
**Authentication**: Required | **Roles**: EMPLOYEE

**Request**:
```json
{}  // No body required
```

**Response** (200 OK):
```json
{
  "success": true,
  "attendance": {
    "_id": "507f1f77bcf86cd799439014",
    "employee": "507f1f77bcf86cd799439013",
    "company": "507f1f77bcf86cd799439012",
    "date": "2024-02-09",
    "clockIn": "2024-02-09T09:15:30Z",
    "clockOut": null,
    "totalHours": 0,
    "status": "PRESENT",
    "createdAt": "2024-02-09T09:15:30Z"
  }
}
```

---

### 2. Clock Out
Record clock-out time (end of work day).

**Endpoint**: `POST /attendance/clock-out`
**Authentication**: Required | **Roles**: EMPLOYEE

**Request**:
```json
{}  // No body required
```

**Response** (200 OK):
```json
{
  "success": true,
  "attendance": {
    "_id": "507f1f77bcf86cd799439014",
    "employee": "507f1f77bcf86cd799439013",
    "company": "507f1f77bcf86cd799439012",
    "date": "2024-02-09",
    "clockIn": "2024-02-09T09:15:30Z",
    "clockOut": "2024-02-09T17:45:25Z",
    "totalHours": 8.5,
    "status": "PRESENT",
    "updatedAt": "2024-02-09T17:45:25Z"
  }
}
```

---

### 3. Get My Attendance
Get logged-in employee's attendance records.

**Endpoint**: `GET /attendance/me`
**Authentication**: Required | **Roles**: EMPLOYEE

**Query Parameters** (optional):
- `month` - Filter by month (1-12)
- `year` - Filter by year

**Response** (200 OK):
```json
{
  "success": true,
  "records": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "employee": "507f1f77bcf86cd799439013",
      "date": "2024-02-09",
      "clockIn": "2024-02-09T09:15:30Z",
      "clockOut": "2024-02-09T17:45:25Z",
      "totalHours": 8.5,
      "status": "PRESENT"
    },
    {
      "_id": "507f1f77bcf86cd799439015",
      "employee": "507f1f77bcf86cd799439013",
      "date": "2024-02-08",
      "clockIn": "2024-02-08T09:00:00Z",
      "clockOut": "2024-02-08T17:30:00Z",
      "totalHours": 8.5,
      "status": "PRESENT"
    }
  ]
}
```

---

### 4. Get Company Attendance
Get all employees' attendance records (Admin/HR only).

**Endpoint**: `GET /attendance`
**Authentication**: Required | **Roles**: ADMIN, HR

**Query Parameters** (optional):
- `date` - Filter by specific date (YYYY-MM-DD)
- `month` - Filter by month
- `year` - Filter by year
- `status` - Filter by status (PRESENT, ABSENT, LATE)

**Response** (200 OK):
```json
{
  "success": true,
  "records": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "employee": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Alice Smith",
        "department": "Engineering"
      },
      "date": "2024-02-09",
      "clockIn": "2024-02-09T09:15:30Z",
      "clockOut": "2024-02-09T17:45:25Z",
      "totalHours": 8.5,
      "status": "PRESENT"
    }
  ]
}
```

---

## Leave Routes

### 1. Apply for Leave
Employee applies for a leave.

**Endpoint**: `POST /leaves`
**Authentication**: Required | **Roles**: EMPLOYEE

**Request**:
```json
{
  "type": "CASUAL",
  "reason": "Family event",
  "startDate": "2024-02-12T00:00:00Z",
  "endDate": "2024-02-14T00:00:00Z"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "leave": {
    "_id": "507f1f77bcf86cd799439016",
    "employee": "507f1f77bcf86cd799439013",
    "company": "507f1f77bcf86cd799439012",
    "type": "CASUAL",
    "reason": "Family event",
    "startDate": "2024-02-12T00:00:00Z",
    "endDate": "2024-02-14T00:00:00Z",
    "totalDays": 3,
    "status": "PENDING",
    "createdAt": "2024-02-09T12:00:00Z"
  }
}
```

---

### 2. Get My Leaves
Get logged-in employee's leave applications.

**Endpoint**: `GET /leaves/me`
**Authentication**: Required | **Roles**: EMPLOYEE

**Query Parameters** (optional):
- `status` - Filter by status (PENDING, APPROVED, REJECTED)

**Response** (200 OK):
```json
{
  "success": true,
  "leaves": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "type": "CASUAL",
      "reason": "Family event",
      "startDate": "2024-02-12T00:00:00Z",
      "endDate": "2024-02-14T00:00:00Z",
      "totalDays": 3,
      "status": "PENDING",
      "createdAt": "2024-02-09T12:00:00Z"
    }
  ]
}
```

---

### 3. Get Company Leaves
Get all leave applications (Admin/HR only).

**Endpoint**: `GET /leaves`
**Authentication**: Required | **Roles**: ADMIN, HR

**Query Parameters** (optional):
- `status` - Filter by status
- `month` - Filter by month
- `year` - Filter by year

**Response** (200 OK):
```json
{
  "success": true,
  "leaves": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "employee": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Alice Smith",
        "department": "Engineering"
      },
      "type": "CASUAL",
      "startDate": "2024-02-12T00:00:00Z",
      "endDate": "2024-02-14T00:00:00Z",
      "totalDays": 3,
      "status": "PENDING",
      "createdAt": "2024-02-09T12:00:00Z"
    }
  ]
}
```

---

### 4. Review Leave
Approve or reject a leave application.

**Endpoint**: `PUT /leaves/:id/review`
**Authentication**: Required | **Roles**: ADMIN, HR

**Request**:
```json
{
  "status": "APPROVED"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "leave": {
    "_id": "507f1f77bcf86cd799439016",
    "employee": "507f1f77bcf86cd799439013",
    "type": "CASUAL",
    "startDate": "2024-02-12T00:00:00Z",
    "endDate": "2024-02-14T00:00:00Z",
    "totalDays": 3,
    "status": "APPROVED",
    "reviewedBy": "507f1f77bcf86cd799439011",
    "updatedAt": "2024-02-09T13:00:00Z"
  }
}
```

---

## Payroll Routes

### 1. Generate Payroll
Generate payroll for an employee for a specific month.

**Endpoint**: `POST /payroll/generate`
**Authentication**: Required | **Roles**: ADMIN, HR

**Request**:
```json
{
  "employeeId": "507f1f77bcf86cd799439013",
  "month": 2,
  "year": 2024
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "payroll": {
    "_id": "507f1f77bcf86cd799439017",
    "employee": "507f1f77bcf86cd799439013",
    "company": "507f1f77bcf86cd799439012",
    "month": 2,
    "year": 2024,
    "grossSalary": 57000,
    "lopDays": 0,
    "deductions": 0,
    "netSalary": 57000,
    "status": "GENERATED",
    "createdAt": "2024-02-09T14:00:00Z"
  },
  "payslip": {
    "_id": "507f1f77bcf86cd799439018",
    "payroll": "507f1f77bcf86cd799439017",
    "pdfUrl": "https://res.cloudinary.com/...",
    "createdAt": "2024-02-09T14:00:00Z"
  }
}
```

---

### 2. Get My Payroll
Get logged-in employee's payroll records.

**Endpoint**: `GET /payroll/me`
**Authentication**: Required | **Roles**: EMPLOYEE

**Response** (200 OK):
```json
{
  "success": true,
  "payrolls": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "month": 2,
      "year": 2024,
      "grossSalary": 57000,
      "deductions": 0,
      "netSalary": 57000,
      "lopDays": 0,
      "status": "GENERATED",
      "createdAt": "2024-02-09T14:00:00Z"
    }
  ]
}
```

---

### 3. Get Company Payroll
Get all company payroll records (Admin/HR only).

**Endpoint**: `GET /payroll`
**Authentication**: Required | **Roles**: ADMIN, HR

**Query Parameters** (optional):
- `month` - Filter by month
- `year` - Filter by year
- `status` - Filter by status (GENERATED, PAID)

**Response** (200 OK):
```json
{
  "success": true,
  "payrolls": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "employee": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Alice Smith",
        "department": "Engineering"
      },
      "month": 2,
      "year": 2024,
      "grossSalary": 57000,
      "deductions": 0,
      "netSalary": 57000,
      "status": "GENERATED",
      "createdAt": "2024-02-09T14:00:00Z"
    }
  ]
}
```

---

### 4. Get My Payslips
Get logged-in employee's payslips (PDF documents).

**Endpoint**: `GET /payroll/payslips`
**Authentication**: Required | **Roles**: EMPLOYEE

**Response** (200 OK):
```json
{
  "success": true,
  "payslips": [
    {
      "_id": "507f1f77bcf86cd799439018",
      "payroll": {
        "_id": "507f1f77bcf86cd799439017",
        "month": 2,
        "year": 2024,
        "grossSalary": 57000,
        "netSalary": 57000
      },
      "pdfUrl": "https://res.cloudinary.com/workhive/image/upload/...",
      "createdAt": "2024-02-09T14:00:00Z"
    }
  ]
}
```

---

## Performance Routes

### 1. Create/Update Performance Review
Create or update performance review for an employee.

**Endpoint**: `POST /performance/review`
**Authentication**: Required | **Roles**: ADMIN, HR

**Request**:
```json
{
  "employeeId": "507f1f77bcf86cd799439013",
  "period": "MONTHLY",
  "month": 2,
  "year": 2024,
  "metrics": {
    "attendanceScore": 9,
    "taskCompletionScore": 8,
    "punctualityScore": 9,
    "teamworkScore": 8
  },
  "feedback": "Excellent performance this month. Keep up the good work!"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "performance": {
    "_id": "507f1f77bcf86cd799439019",
    "employee": "507f1f77bcf86cd799439013",
    "company": "507f1f77bcf86cd799439012",
    "period": "MONTHLY",
    "month": 2,
    "year": 2024,
    "metrics": {
      "attendanceScore": 9,
      "taskCompletionScore": 8,
      "punctualityScore": 9,
      "teamworkScore": 8
    },
    "overallScore": 8.5,
    "feedback": "Excellent performance this month. Keep up the good work!",
    "reviewedBy": "507f1f77bcf86cd799439011",
    "createdAt": "2024-02-09T15:00:00Z"
  }
}
```

---

### 2. Get My Performance
Get logged-in employee's performance reviews.

**Endpoint**: `GET /performance/me`
**Authentication**: Required | **Roles**: EMPLOYEE

**Response** (200 OK):
```json
{
  "success": true,
  "records": [
    {
      "_id": "507f1f77bcf86cd799439019",
      "period": "MONTHLY",
      "month": 2,
      "year": 2024,
      "metrics": {
        "attendanceScore": 9,
        "taskCompletionScore": 8,
        "punctualityScore": 9,
        "teamworkScore": 8
      },
      "overallScore": 8.5,
      "feedback": "Excellent performance this month. Keep up the good work!",
      "createdAt": "2024-02-09T15:00:00Z"
    }
  ]
}
```

---

### 3. Get Company Performance
Get all employees' performance reviews (Admin/HR only).

**Endpoint**: `GET /performance`
**Authentication**: Required | **Roles**: ADMIN, HR

**Query Parameters** (optional):
- `period` - Filter by period (MONTHLY, QUARTERLY)
- `month` - Filter by month
- `year` - Filter by year

**Response** (200 OK):
```json
{
  "success": true,
  "records": [
    {
      "_id": "507f1f77bcf86cd799439019",
      "employee": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Alice Smith",
        "department": "Engineering"
      },
      "period": "MONTHLY",
      "month": 2,
      "year": 2024,
      "metrics": {
        "attendanceScore": 9,
        "taskCompletionScore": 8,
        "punctualityScore": 9,
        "teamworkScore": 8
      },
      "overallScore": 8.5,
      "feedback": "Excellent performance this month. Keep up the good work!",
      "createdAt": "2024-02-09T15:00:00Z"
    }
  ]
}
```

---

## AI Routes

### 1. Get Attendance Summary (AI)
Get AI-generated insights about employee attendance.

**Endpoint**: `GET /ai/attendance-summary`
**Authentication**: Required | **Roles**: EMPLOYEE

**Response** (200 OK):
```json
{
  "success": true,
  "summary": "Employee has been consistently present with an average of 8.5 hours per day. Attendance rate is 95%. No major issues detected. Keep maintaining the same commitment."
}
```

---

### 2. Explain Payslip (AI)
Get AI-generated explanation of payslip breakdown.

**Endpoint**: `GET /ai/payslip/:id/explain`
**Authentication**: Required | **Roles**: EMPLOYEE
**Path Parameters**:
- `id` (string, required) - Payroll ID

**Response** (200 OK):
```json
{
  "success": true,
  "explanation": "Your payslip for February 2024 shows:\n- Gross Salary: ₹57,000 (Base: ₹50,000 + HRA: ₹5,000 + Allowances: ₹2,000)\n- Deductions: ₹0\n- Net Salary: ₹57,000\n\nYou have not taken any unpaid leave this month, so no Loss of Pay (LOP) has been deducted. Your salary is fully processed and ready for transfer."
}
```

---

### 3. Get Performance Insights (AI)
Get AI-generated insights about company-wide performance.

**Endpoint**: `GET /ai/performance-insights`
**Authentication**: Required | **Roles**: ADMIN, HR

**Response** (200 OK):
```json
{
  "success": true,
  "insights": "Overall company performance is strong with an average score of 8.2/10. Key observations:\n1. Attendance is excellent across most departments\n2. Task completion rates are above expectations\n3. Engineering department shows slightly lower punctuality scores - consider mentioning flexible timing\n4. Team collaboration is outstanding\n\nRecommendations: Continue current incentive programs and consider team-building activities."
}
```

---

## Socket.io Real-time Events

Socket.io enables real-time communication. Connect using:
```javascript
const socket = io('http://localhost:5001', {
  auth: {
    token: 'your_jwt_token'
  }
});
```

### Listening to Events

```javascript
// After connecting, join your user room
socket.emit('join', userId);

// Listen to events
socket.on('attendance:clockIn', (data) => {
  console.log(`${data.name} clocked in`);
});

socket.on('attendance:clockOut', (data) => {
  console.log(`Employee clocked out - ${data.hours} hours worked`);
});

socket.on('leave:applied', (data) => {
  console.log(`Leave applied for ${data.totalDays} days`);
});

socket.on('leave:reviewed', (data) => {
  console.log(`Leave ${data.status}`);
});

socket.on('notification:new', (data) => {
  console.log(`New notification: ${data.title}`);
});
```

### Broadcasting Events

**Attendance Events**:
```
attendance:clockIn - When employee clocks in
attendance:clockOut - When employee clocks out

Data: { employeeId, name, hours }
```

**Leave Events**:
```
leave:applied - When leave is applied
leave:reviewed - When leave is reviewed

Data: { leaveId, totalDays, status }
```

**Notification Events**:
```
notification:new - When new notification is created

Data: { title, message }
```

---

## Error Handling

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| **400** | Bad Request | Missing required fields, Invalid data format |
| **401** | Unauthorized | No token provided, Invalid token, Invalid credentials |
| **403** | Forbidden | Insufficient permissions, Access denied |
| **404** | Not Found | Employee not found, Leave not found |
| **409** | Conflict | Duplicate entry, Already clocked in |
| **500** | Server Error | Internal server error |

### Common Error Responses

**Missing Authentication Token**:
```json
{
  "message": "Unauthorized"
}
```

**Invalid Token**:
```json
{
  "message": "Invalid token"
}
```

**Insufficient Permissions**:
```json
{
  "message": "Access denied"
}
```

**Already Clocked In**:
```json
{
  "message": "Already clocked in"
}
```

**Employee Not Found**:
```json
{
  "message": "Employee not found"
}
```

---

## Postman Collection

### Setup Instructions

1. **Import the collection** into Postman
2. **Create environment variables**:
   - `base_url`: `http://localhost:5001/api`
   - `token`: Your JWT token (set after login)
   - `companyId`: Your company ID
   - `employeeId`: Employee's MongoDB ID

---

### Authentication Requests

#### Register Company
```
POST {{base_url}}/auth/register
Content-Type: application/json

{
  "companyName": "Acme Corporation",
  "domain": "acmecorp",
  "name": "John Doe",
  "email": "admin@acmecorp.com",
  "password": "SecurePassword123"
}
```

**Save in Postman**: After response, run this script to save token:
```javascript
var token = pm.response.json().token;
pm.environment.set("token", token);
```

#### Login
```
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "admin@acmecorp.com",
  "password": "SecurePassword123"
}
```

---

### Employee Management Requests

#### Create Employee
```
POST {{base_url}}/employees
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "name": "Alice Smith",
  "email": "alice@acmecorp.com",
  "password": "SecurePassword123",
  "role": "EMPLOYEE",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": {
    "base": 50000,
    "hra": 5000,
    "allowances": 2000
  },
  "shift": {
    "startTime": "09:00",
    "endTime": "17:00"
  }
}
```

#### Get All Employees
```
GET {{base_url}}/employees
Authorization: Bearer {{token}}
```

#### Get Employee by ID
```
GET {{base_url}}/employees/{{employeeId}}
Authorization: Bearer {{token}}
```

#### Update Employee
```
PUT {{base_url}}/employees/{{employeeId}}
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "designation": "Senior Software Engineer",
  "salary": {
    "base": 60000,
    "hra": 6000,
    "allowances": 3000
  }
}
```

#### Get My Profile
```
GET {{base_url}}/employees/me/profile
Authorization: Bearer {{token}}
```

---

### Attendance Requests

#### Clock In
```
POST {{base_url}}/attendance/clock-in
Authorization: Bearer {{token}}
```

#### Clock Out
```
POST {{base_url}}/attendance/clock-out
Authorization: Bearer {{token}}
```

#### Get My Attendance
```
GET {{base_url}}/attendance/me
Authorization: Bearer {{token}}
```

#### Get Company Attendance
```
GET {{base_url}}/attendance
Authorization: Bearer {{token}}
```

---

### Leave Requests

#### Apply for Leave
```
POST {{base_url}}/leaves
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "type": "CASUAL",
  "reason": "Family event",
  "startDate": "2024-02-12T00:00:00Z",
  "endDate": "2024-02-14T00:00:00Z"
}
```

#### Get My Leaves
```
GET {{base_url}}/leaves/me
Authorization: Bearer {{token}}
```

#### Get Company Leaves
```
GET {{base_url}}/leaves
Authorization: Bearer {{token}}
```

#### Review Leave
```
PUT {{base_url}}/leaves/{{leaveId}}/review
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "status": "APPROVED"
}
```

---

### Payroll Requests

#### Generate Payroll
```
POST {{base_url}}/payroll/generate
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "employeeId": "{{employeeId}}",
  "month": 2,
  "year": 2024
}
```

#### Get My Payroll
```
GET {{base_url}}/payroll/me
Authorization: Bearer {{token}}
```

#### Get Company Payroll
```
GET {{base_url}}/payroll
Authorization: Bearer {{token}}
```

#### Get My Payslips
```
GET {{base_url}}/payroll/payslips
Authorization: Bearer {{token}}
```

---

### Performance Requests

#### Create Performance Review
```
POST {{base_url}}/performance/review
Content-Type: application/json
Authorization: Bearer {{token}}

{
  "employeeId": "{{employeeId}}",
  "period": "MONTHLY",
  "month": 2,
  "year": 2024,
  "metrics": {
    "attendanceScore": 9,
    "taskCompletionScore": 8,
    "punctualityScore": 9,
    "teamworkScore": 8
  },
  "feedback": "Excellent performance this month!"
}
```

#### Get My Performance
```
GET {{base_url}}/performance/me
Authorization: Bearer {{token}}
```

#### Get Company Performance
```
GET {{base_url}}/performance
Authorization: Bearer {{token}}
```

---

### AI Requests

#### Get Attendance Summary
```
GET {{base_url}}/ai/attendance-summary
Authorization: Bearer {{token}}
```

#### Get Payslip Explanation
```
GET {{base_url}}/ai/payslip/{{payrollId}}/explain
Authorization: Bearer {{token}}
```

#### Get Performance Insights
```
GET {{base_url}}/ai/performance-insights
Authorization: Bearer {{token}}
```

---

## Common Request/Response Patterns

### Request with Bearer Token
All authenticated endpoints require this header:
```
Authorization: Bearer <your_jwt_token>
```

**curl example**:
```bash
curl -X GET http://localhost:5001/api/employees \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Pagination (Future Enhancement)
Standard query parameters for list endpoints:
```
?page=1&limit=10&sort=-createdAt
```

### Filtering
Apply filters via query parameters:
```
GET /attendance?status=LATE&month=2&year=2024
GET /payroll?status=PAID&year=2024
```

### Sorting
Sort by any field using minus prefix for descending:
```
GET /employees?sort=-createdAt
GET /leaves?sort=startDate
```

---

## Development & Deployment

### Running in Development Mode
```bash
npm run dev
```
Uses `nodemon` for auto-reload on file changes.

### Running in Production Mode
```bash
npm start
```

### Environment Considerations

**Development (.env)**:
```env
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/workhive_ai
JWT_SECRET=dev_secret_key
PORT=5001
```

**Production (.env)**:
```env
NODE_ENV=production
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/workhive_ai
JWT_SECRET=strong_production_secret_key
PORT=5001
FRONTEND_URL=https://yourdomain.com
```

### Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Configure MongoDB Atlas or similar managed service
- [ ] Set up Cloudinary account for file uploads
- [ ] Configure Gemini AI API key
- [ ] Set up email service credentials
- [ ] Enable HTTPS for socket.io
- [ ] Configure CORS for production domain
- [ ] Set up appropriate MongoDB indexes
- [ ] Enable rate limiting (recommended)
- [ ] Set up monitoring and logging
- [ ] Configure automated backups

### Deployment Platforms

**Recommended options**:
1. **Railway** - Simple deployment with MongoDB
2. **Heroku** - Easy scaling with add-ons
3. **AWS EC2** - Full control and flexibility
4. **DigitalOcean** - Affordable VPS hosting
5. **Render** - Modern alternative to Heroku

---

## API Response Status Codes Summary

| Endpoint | Method | Code | Response |
|----------|--------|------|----------|
| /auth/register | POST | 201 | User, Company, Token |
| /auth/login | POST | 200 | User, Token |
| /employees | POST | 201 | Employee |
| /employees | GET | 200 | [Employees] |
| /employees/:id | GET | 200 | Employee |
| /employees/:id | PUT | 200 | Employee |
| /employees/:id | DELETE | 200 | Message |
| /attendance/clock-in | POST | 200 | Attendance |
| /attendance/clock-out | POST | 200 | Attendance |
| /attendance/me | GET | 200 | [Attendance] |
| /leaves | POST | 201 | Leave |
| /leaves/:id/review | PUT | 200 | Leave |
| /payroll/generate | POST | 201 | Payroll, Payslip |
| /performance/review | POST | 201 | Performance |
| /ai/* | GET | 200 | AI Response |

---

## Support & Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```
Check MONGO_URL in .env
Ensure MongoDB is running
Verify connection string permissions
```

**Invalid Token Error**
```
Token may have expired (7 days)
Re-login to get a new token
Check JWT_SECRET matches between auth and verification
```

**CORS Error**
```
Update FRONTEND_URL in .env
Ensure frontend domain is correct
Check CORS configuration in app.js
```

**Socket.io Connection Issues**
```
Verify token is included in auth
Check socket URL matches server URL
Ensure WebSocket is not blocked by firewall
```

### Getting Help

1. Check logs in terminal for error messages
2. Verify all environment variables are set
3. Test endpoints using Postman
4. Check MongoDB data in MongoDB Atlas/Compass
5. Review error messages in response body

---

## License

ISC

---

## Version

**Current Version**: 1.0.0
**Last Updated**: February 2024

---

## Key Features Summary

✅ **Multi-tenant Architecture** - Separate companies with isolated data
✅ **Role-based Access Control** - ADMIN, HR, EMPLOYEE roles
✅ **Attendance Tracking** - Clock in/out with late detection
✅ **Leave Management** - Apply, approve, track leaves by type
✅ **Payroll Processing** - Generate payslips with deductions
✅ **Performance Reviews** - Monthly/Quarterly reviews with scores
✅ **AI Integration** - Google Gemini for insights
✅ **Real-time Updates** - Socket.io for instant notifications
✅ **PDF Generation** - Auto-generated payslips
✅ **Cloud Storage** - Cloudinary integration
✅ **Email Notifications** - Nodemailer integration
✅ **JWT Authentication** - Secure token-based auth

---

## Contact & Support

For issues, questions, or feature requests, please contact the development team or create an issue in the repository.

