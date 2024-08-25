## README

### Project Overview
This project is a profile management application that allows users to update and manage their personal information, social links, experience, and achievements. The application is built using React, Firebase, and Bootstrap, and it includes features like image uploads, form handling, and section-based UI using accordions.

### Design Choices and Technical Approach

#### 1. **Backend Structure:**
   - **Firebase Firestore:** We utilize Firebase Firestore as our backend to store and retrieve user data. Firestore provides a flexible and scalable database solution, allowing real-time updates with `onSnapshot`, which listens to changes in the data.
   - **Firebase Authentication:** Firebase Authentication is used to manage user sessions and ensure that only authorized users can access or modify their profiles.

#### 2. **Model and API Design:**
   - **User Data Model:** The user data model in Firestore includes fields like `name`, `email`, `profilePicture`, `bannerImage`, `socialLinks`, `experience`, and `achievements`. This design enables a comprehensive user profile that covers personal details, professional experience, and accomplishments.
   - **Firestore API Integration:** The integration with Firestore is achieved using the `onSnapshot` method to fetch real-time updates and `updateUserDocument` for updating user data. The API is designed to be simple and straightforward, focusing on CRUD operations (Create, Read, Update, Delete).

#### 3. **Frontend Structure:**
   - **React Components:** The app is structured into reusable React components. For example, `ProfileImage` and `BannerImage` components handle the display of user images, while `AlertComponent` provides feedback to the user during form submission.
   - **React Bootstrap:** Bootstrap is used for styling and layout, particularly with the `Accordion`, `Form`, `Button`, and `Container` components. This ensures a responsive and user-friendly interface.

#### 4. **Rationale for Design Choices:**
   - **Real-Time Updates:** The decision to use `onSnapshot` for real-time data fetching was made to ensure that users see the most up-to-date information without needing to refresh the page.
   - **Accordion UI:** The accordion structure allows for a clean and organized display of user profile sections, making it easy to navigate through different parts of the profile.
   - **User Authorization:** Using Firebase Authentication ensures that only the rightful owner of a profile or an admin can make changes, providing security and privacy.

#### 5. **Challenges Faced:**
   - **Image Upload and Display:** One challenge was handling image uploads for the profile picture and banner image. Ensuring the images are correctly uploaded, stored, and displayed required careful management of file inputs and state.
   - **Form Handling:** Managing form state across multiple sections (e.g., user information, social links, experience) while keeping the UI responsive and the data consistent was a challenge. This was addressed by centralizing the form state management and using event handlers effectively.

---

## API Documentation

### Base URL
The application uses Firebase Firestore, so the endpoints correspond to Firestore document paths. There isn't a traditional REST API, but interactions are handled through Firebase SDK functions.

### Authentication
Firebase Authentication is used to secure the API. Users must be authenticated to interact with the API. Authentication is managed via Firebase's Auth SDK.

### Endpoints

#### 1. **Get User Profile**
   - **Endpoint:** `GET /users/{userId}`
   - **Description:** Fetches the user profile for the given `userId`.
   - **Request Parameters:** 
     - `userId` (string): The unique identifier for the user.
   - **Response:**
     ```json
     {
       "name": "John Doe",
       "email": "johndoe@example.com",
       "profilePicture": "url_to_profile_picture",
       "bannerImage": "url_to_banner_image",
       "socialLinks": {
         "github": "https://github.com/johndoe",
         "linkedin": "https://linkedin.com/in/johndoe"
       },
       "experience": "Work experience details...",
       "achievements": {
         "hackathons": "Hackathon details...",
         "certifications": "Certification details..."
       }
     }
     ```

#### 2. **Update User Profile**
   - **Endpoint:** `PUT /users/{userId}`
   - **Description:** Updates the user profile for the given `userId`.
   - **Request Parameters:** 
     - `userId` (string): The unique identifier for the user.
   - **Request Body:**
     ```json
     {
       "name": "John Doe",
       "profilePicture": "url_to_profile_picture",
       "bannerImage": "url_to_banner_image",
       "socialLinks": {
         "github": "https://github.com/johndoe",
         "linkedin": "https://linkedin.com/in/johndoe"
       },
       "experience": "Updated work experience...",
       "achievements": {
         "hackathons": "Updated hackathon details...",
         "certifications": "Updated certification details..."
       }
     }
     ```
   - **Response:**
     ```json
     {
       "message": "Profile updated successfully"
     }
     ```

### Usage Examples

#### Example: Fetch User Profile
```javascript
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";

const fetchUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    console.log(userDoc.data());
  } else {
    console.log("No such document!");
  }
};
```

#### Example: Update User Profile
```javascript
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";

const updateUserProfile = async (userId, data) => {
  await setDoc(doc(db, "users", userId), data, { merge: true });
  console.log("Profile updated successfully");
};
```

---

