# Software Requirements Specification: User Feedback Feature

**Version:** 1.2
**Date:** 2025-03-27

## 1. Overview

This document outlines the requirements for implementing a user feedback mechanism within the application. The feature allows logged-in users to submit feedback, bug reports, and optional screenshots via a dedicated button and modal interface. Feedback submissions will be stored in the application database (Supabase/Postgres) using Prisma ORM.

## 2. Functional Requirements

*   **FR-01: Feedback Button Visibility**
    *   A "Feedback" button shall be displayed in the application's top bar.
    *   The visibility of this button shall be restricted to users who are currently logged in.
    *   The display of the feedback button shall be controlled via an environment variable (specified in the `.env` file). If the variable dictates the feature is disabled, the button shall not be rendered.

*   **FR-02: Feedback Modal Trigger**
    *   Clicking the "Feedback" button shall trigger the display of a modal dialog.

*   **FR-03: Feedback Modal Interface (UI: See Section 5)**
    *   The modal shall provide input fields for the user to submit their feedback.
    *   The modal shall include:
        *   A text input field for the feedback title.
        *   A button to trigger AI-based title generation.
        *   A textarea input field for the detailed feedback or bug report.
        *   An area for attaching an image (via pasting or drag-and-drop).
        *   A "Submit" button.
        *   A "Cancel" button.

*   **FR-04: Data Input - Title**
    *   Users shall be able to manually enter a title for their feedback in the designated title input field.
    *   Alternatively, users can click a dedicated "Generate Title" button.
    *   Clicking this button shall trigger an AI generation process (using the `CizzleMagicText` component logic or similar).
    *   The generation process will use the current content of the feedback textarea as input, guided by a prompt (e.g., "Please generate a concise title based on the following user feedback: [feedback text]").
    *   The generated text output shall automatically populate the title input field, overwriting any existing content in the title field.

*   **FR-05: Data Input - Feedback Text**
    *   Users shall be required to enter text into the feedback textarea. This field is mandatory for submission.
    *   The content of this field serves as the input for the AI title generation process when triggered (FR-04).

*   **FR-06: Data Input - Image Attachment (Optional)**
    *   Users shall have the option to attach a single image to their feedback.
    *   Image attachment shall support pasting directly into the designated area or using drag-and-drop functionality.
    *   If an image is provided, it shall be converted to Base64 format before submission.
    *   *(See TR-05 for Image Constraints)*

*   **FR-07: Submission Process**
    *   Clicking the "Submit" button shall initiate the feedback submission process. Client-side validation should ensure the mandatory `feedback` field is populated. The `title` field should also likely be mandatory (confirm if auto-generation makes it implicitly required or if submission is allowed without a title). Assuming Title is also mandatory.
    *   The submission shall include:
        *   The title from the title input field.
        *   The user-entered feedback text.
        *   The Base64 encoded image data (if provided).
        *   The identifier of the currently logged-in user.
        *   A timestamp indicating the creation time.

*   **FR-08: Data Persistence**
    *   Upon successful submission, a new feedback entry shall be created and saved in the backend Supabase/Postgres database via Prisma.
    *   The entry shall conform to the schema defined in Section 4.

*   **FR-09: Modal Dismissal and Feedback**
    *   Clicking the "Cancel" button shall close the feedback modal without submitting any data.
    *   Upon successful submission (after the data is confirmed saved by the backend), a success notification shall be displayed to the user using the application's existing `react-hot-toast` notification system. The modal shall then close automatically.

*   **FR-10: Error Handling**
    *   If an error occurs during the submission process (e.g., validation failure, network error, server-side error), an appropriate error notification shall be displayed to the user using the `react-hot-toast` notification system. The modal should remain open, allowing the user to correct potential issues or retry. Error messages related to AI generation failure should also use this system.

## 3. Technical Requirements

*   **TR-01: Database ORM & Provider**
    *   Prisma shall be used as the Object-Relational Mapper (ORM).
    *   The database provider is Supabase/Postgres.

*   **TR-02: UI Components Library**
    *   The feedback modal and its internal components (inputs, buttons, text area) shall be implemented using the `shadcn/ui` library.

*   **TR-03: Styling**
    *   Styling for the feedback button and modal shall utilize Tailwind CSS.

*   **TR-04: Image Encoding**
    *   User-provided images shall be encoded into Base64 format on the client-side before being sent to the backend for storage.

*   **TR-05: Image Constraints**
    *   The system shall accept images in common web formats (e.g., PNG, JPG, GIF, WEBP).
    *   A maximum file size limit of **5MB** (configurable, TBD) shall be enforced on the client-side before Base64 encoding. Clear feedback using `react-hot-toast` should be provided if the image exceeds the size limit or is an unsupported type.
    *   *Consideration:* Storing large Base64 strings directly in the database `TEXT` field can impact performance and storage. Supabase Storage or a similar object storage solution is a recommended alternative for future scalability, but Base64 in the `TEXT` field is acceptable for this iteration.

*   **TR-06: Title Generation Component**
    *   The AI-based title generation functionality shall be implemented using a mechanism similar to the provided `CizzleMagicText` example.
    *   A button click will trigger a function that:
        *   Reads the current value from the feedback textarea state variable.
        *   Invokes the AI generation service/component (e.g., `CizzleMagicText`'s underlying logic) with the feedback text and an appropriate prompt (see FR-04).
        *   Updates the title input field's state variable with the received AI response.

## 4. Data Model

*   **DM-01: Feedback Database Table (PostgreSQL)**
    *   A database table named `Feedback` (or similar, following Prisma conventions) shall store feedback entries.
    *   The Prisma schema definition shall include:
        ```prisma
        model Feedback {
          id                String   @id @default(cuid()) // Or use Int @id @default(autoincrement()) if preferred
          title             String
          feedback          String   @db.Text // Explicitly use TEXT for potentially long feedback
          image_data        String?  @db.Text // Use TEXT for Base64 data, nullable
          azdo_work_item_id String?           // Nullable, for future use
          userId            String            // Assuming user IDs are strings (e.g., from Supabase Auth)
          createdAt         DateTime @default(now())

          // Optional: Define relation to User model if it exists
          // user User @relation(fields: [userId], references: [id])

          // Optional: Add index for querying by user
          // @@index([userId])
        }
        ```
    *   **Field Explanations:**
        *   `id`: Primary Key (CUID recommended for distributed systems).
        *   `title`: String (Standard `VARCHAR` is likely sufficient, length constraints TBD).
        *   `feedback`: Use PostgreSQL `TEXT` type via `@db.Text` for unrestricted length. Not Null.
        *   `image_data`: Use PostgreSQL `TEXT` type via `@db.Text` for Base64 string. Nullable.
        *   `azdo_work_item_id`: Standard `VARCHAR`. Nullable.
        *   `userId`: String, Not Null. Foreign key to the user table/identifier. Ensure type matches user ID type.
        *   `createdAt`: Timestamp with time zone, handled by Prisma/Postgres.

## 5. User Interface (UI) / User Experience (UX)

*   **UI-01: Feedback Button**
    *   Located in the application's top bar.
    *   Clearly labeled (e.g., "Feedback").
    *   Only visible to logged-in users when enabled via `.env`.

*   **UI-02: Feedback Modal**
    *   Shall be a large modal dialog (`shadcn/ui` Dialog) overlaying the main application content.
    *   Styled with Tailwind CSS.
    *   Contains the following elements in a logical flow (e.g., top to bottom):
        *   **Title Input:** `shadcn/ui` Input component. Labeled "Title".
        *   **Generate Title Button:** `shadcn/ui` Button component positioned near the Title input, labeled "✨ Generate Title" or similar. Triggers the AI generation (FR-04). Consider adding a loading state to this button during generation.
        *   **Feedback Textarea:** `shadcn/ui` Textarea component. Labeled clearly (e.g., "Feedback Details*"). Indicated as mandatory. Sufficiently large height (e.g., `min-h-[200px]`).
        *   **Image Area:** A designated area (e.g., a dashed-border box using `shadcn/ui` layout components) indicating where users can paste or drag-and-drop an image. Label: "Attach Screenshot (Optional)". Should provide visual feedback upon successful paste/drop (e.g., showing a thumbnail preview or file name) and display errors (size/type) via toast notifications.
        *   **Action Buttons:** Grouped at the bottom of the modal:
            *   **Submit Button:** `shadcn/ui` Button component (primary style). Labeled "Submit Feedback". Should show a loading state during submission. Disabled if mandatory fields (Title, Feedback) are empty.
            *   **Cancel Button:** `shadcn/ui` Button component (e.g., secondary or outline style). Labeled "Cancel". Closes the modal.

## 6. Non-Functional Requirements

*   **NFR-01: Security**
    *   Only authenticated (logged-in) users shall be able to access the feedback submission functionality. Backend API endpoints must validate user sessions/tokens and ensure submitted `userId` matches the authenticated user.
*   **NFR-02: Configuration**
    *   Feature enablement must be configurable via an environment variable (`.env`). AI generation endpoints/keys should also be configured via environment variables.
*   **NFR-03: Usability**
    *   Notifications for success (FR-09) and errors (FR-10, TR-05) must be clear, concise, and non-intrusive, using `react-hot-toast`.
    *   The image upload area should provide intuitive feedback.
    *   Loading states on the "Generate Title" and "Submit" buttons are crucial for good UX.

## 7. Open Questions / TBD

*   **Title Mandatory?:** Confirm if the `title` field is strictly mandatory for submission, even if the user doesn't manually enter one or generate one. (Requirement FR-07 assumes yes).
*   **Image Size Limit:** Confirm the final maximum image file size (TR-05). Defaulting to 5MB.
*   **Title Length Constraint:** Define if any max length should be applied to the `title` field in the database/validation.
*   **`CizzleMagicText` Integration Details:** Specific API/props needed if using the component directly vs. triggering its underlying logic.