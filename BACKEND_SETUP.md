# CArCRT Impact Stories - Backend Setup

## System Overview

This system allows community members to submit their stories with photos. Stories are permanently saved to a database and only admins can edit or delete them.

### How It Works

1. **User Submission**: Users fill out the form on `/impact-stories` with their story and photo
2. **Backend Processing**: The backend server (Node.js + Express) receives the data and saves it
3. **Image Storage**: Photos are stored in the `public/uploads` directory
4. **Database**: Story data is saved in `data/stories.json`
5. **Admin Approval**: New stories require admin approval before being displayed
6. **Admin Dashboard**: Admins can approve, edit, or delete stories via `/admin`

## Running the Application

### Prerequisites
- Node.js installed
- npm installed

### Installation

```bash
npm install
```

### Starting the Servers

**Option 1: Run Both Servers (Recommended)**
```bash
npm run dev:full
```
This runs both the backend server (port 3001) and frontend dev server (port 8080) concurrently.

**Option 2: Run Separately**
```bash
# Terminal 1: Backend server
node server.js

# Terminal 2: Frontend dev server
npm run dev
```

## Admin Access

**Admin Dashboard URL**: `http://localhost:8080/admin`

**Default Admin Password**: `carcrt_admin_2025`

### To Change Admin Password
Edit `server.js` and update the `ADMIN_PASSWORD` variable, or set the `ADMIN_PASSWORD` environment variable:

```bash
set ADMIN_PASSWORD=your_secure_password
node server.js
```

## Admin Features

1. **View All Stories**: See approved and pending stories
2. **Approve Stories**: Click "Approve" to display stories to the public
3. **Edit Stories**: Modify story name, content, or category
4. **Delete Stories**: Remove inappropriate or duplicate stories

## API Endpoints

### Public Endpoints
- `GET /api/stories` - Get all approved stories
- `POST /api/stories` - Submit a new story (with file upload)

### Admin Endpoints
- `GET /api/admin/stories?password=<password>` - Get all stories (approved and pending)
- `PUT /api/admin/stories/:id/approve` - Approve a story
- `DELETE /api/admin/stories/:id` - Delete a story
- `PUT /api/admin/stories/:id` - Update a story

## File Structure

```
carcrt-main/
├── server.js                 # Backend server
├── data/
│   └── stories.json         # Database with submitted stories
├── public/
│   ├── uploads/             # Uploaded images
│   └── favicon.png          # Site favicon
├── src/
│   ├── components/
│   │   ├── ShareStoryForm.tsx   # Story submission form
│   │   └── AdminDashboard.tsx   # Admin management panel
│   └── pages/
│       ├── ImpactStories.tsx    # Stories display page
│       └── Admin.tsx            # Admin page
```

## Data Persistence

- **Stories**: Saved in `data/stories.json` (JSON database)
- **Images**: Stored in `public/uploads/` directory
- Both directories are created automatically on first run

## Security Notes

- In production, use a secure admin password (long, random string)
- Set `ADMIN_PASSWORD` via environment variable, not in code
- Consider adding rate limiting for story submissions
- Add email verification for story submissions
- Implement image size and type validation

## Deployment

For production deployment:

1. Change admin password to a secure one
2. Use a proper database (MongoDB, PostgreSQL) instead of JSON file
3. Add authentication middleware
4. Implement HTTPS
5. Use environment variables for sensitive data
6. Add logging and monitoring
7. Set up proper error handling

## Troubleshooting

**Issue**: "Failed to submit story"
- Ensure backend server is running on port 3001
- Check browser console for CORS errors
- Verify image size is less than 5MB

**Issue**: Admin login fails
- Double-check the password (case-sensitive)
- Ensure backend server is running

**Issue**: Images not showing
- Check that uploads directory exists
- Verify image paths in `data/stories.json`
- Ensure backend is serving static files correctly
