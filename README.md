# Mercvenus - Room Rentals & Internet Solutions

A modern, full-stack Next.js application for managing room rentals and internet solutions in Thika, Kenya. Features Firebase backend integration, Cloudinary image management, and a comprehensive admin dashboard.

## Features

- 🏠 **Room Listings** - Dynamic room rental listings with detailed information
- 🌐 **Internet Solutions** - WiFi, CCTV, and network services showcase
- 🔐 **Admin Dashboard** - Complete content management system
- 📸 **Image Management** - Cloudinary integration for image uploads
- 🔥 **Firebase Backend** - Real-time database with Firestore
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 📱 **Responsive Design** - Mobile-first approach

## Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email/Password)
- **Image Storage**: Cloudinary
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ or npm/pnpm
- Firebase account
- Cloudinary account

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mercvenussolutions-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following content:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCcZhOIZuIc-DBsszUSj7R4GL7-9oLVcZo
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mercvenus-5bdb8.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=mercvenus-5bdb8
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mercvenus-5bdb8.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=797104419981
   NEXT_PUBLIC_FIREBASE_APP_ID=1:797104419981:web:b619016037d6ff54fcdec4
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-D6S88XVRRF

   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlvgrs5vp
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=mercvenus_preset
   NEXT_PUBLIC_CLOUDINARY_FOLDER=mercvenus
   ```

4. **Set up Firebase**
   
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Enable **Firestore Database**
   - Enable **Authentication** with Email/Password provider
   - Create an admin user in Firebase Authentication
   
   **Firestore Collections Structure:**
   ```
   - rooms/
     - id: string
     - title: string
     - price: string
     - period: string
     - image: string
     - location: string
     - features: string[]
     - amenities: { bed: number, bath: number, occupancy: number }
     - description: string
     - directions: string
     - phone: string
     - email: string
     - available: boolean
     - createdAt: timestamp
     - updatedAt: timestamp

   - services/
     - id: string
     - icon: string
     - title: string
     - description: string
     - price: string (optional)
     - features: string[]
     - popular: boolean
     - createdAt: timestamp
     - updatedAt: timestamp

   - settings/
     - hero/
       - title: string
       - highlightText: string
       - subtitle: string
       - updatedAt: timestamp
     - contact/
       - phone: string
       - email: string
       - location: string
       - updatedAt: timestamp
   ```

5. **Set up Cloudinary**
   
   - Go to [Cloudinary Dashboard](https://cloudinary.com/)
   - Create an unsigned upload preset named `mercvenus_preset`
   - Create a folder named `mercvenus` in your media library
   - Copy your cloud name to the `.env.local` file

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

1. Navigate to `/admin/login`
2. Sign in with your Firebase admin credentials
3. Access the dashboard at `/admin/dashboard`

### Admin Features:

- **Rooms Management**: Add, edit, delete room listings with image uploads
- **Services Management**: Manage internet solution services
- **Site Settings**: Update hero section and contact information

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Test the production build locally**
   ```bash
   npm start
   ```

## Deployment to Netlify

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Upload the `.next` folder to Netlify**
   - Go to your Netlify dashboard
   - Create a new site or select existing
   - Upload the `.next` folder

3. **Set environment variables in Netlify**
   - Go to Site Settings > Environment Variables
   - Add all variables from your `.env.local` file

4. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

## Project Structure

```
mercvenussolutions-main/
├── app/                      # Next.js app router pages
│   ├── admin/               # Admin pages
│   │   ├── login/          # Admin login
│   │   └── dashboard/      # Admin dashboard
│   ├── rooms/              # Rooms listing page
│   ├── internet-solutions/ # Services page
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── admin/              # Admin components
│   │   ├── rooms-manager.tsx
│   │   ├── services-manager.tsx
│   │   └── site-settings-manager.tsx
│   ├── ui/                 # shadcn/ui components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── room-listings.tsx
│   └── services.tsx
├── lib/                     # Utility functions
│   ├── firebase.ts         # Firebase configuration
│   ├── cloudinary.ts       # Cloudinary utilities
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
├── hooks/                   # Custom React hooks
│   └── useAuth.ts          # Authentication hook
├── public/                  # Static assets
├── styles/                  # Global styles
└── .env.local              # Environment variables (create this)
```

## Key Features Explained

### Dynamic Content
All content (rooms, services, hero text, contact info) is fetched from Firebase Firestore, making it easy to update without code changes.

### Image Management
Images are uploaded to Cloudinary through the admin dashboard, providing optimized delivery and storage.

### Authentication
Simple email/password authentication for admin access. Only authenticated users can access the admin dashboard.

### Responsive Design
The entire site is mobile-responsive with a modern, clean design using Tailwind CSS and shadcn/ui components.

## Troubleshooting

### Firebase Connection Issues
- Verify all Firebase environment variables are correct
- Check Firebase project settings match your `.env.local`
- Ensure Firestore and Authentication are enabled in Firebase Console

### Cloudinary Upload Errors
- Verify upload preset is set to "unsigned"
- Check cloud name and preset name match your configuration
- Ensure the `mercvenus` folder exists in Cloudinary

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check for TypeScript errors: `npm run lint`

## Support

For issues or questions, contact: info@mercvenus.co.ke

## License

© 2025 Mercvenus. All rights reserved.
