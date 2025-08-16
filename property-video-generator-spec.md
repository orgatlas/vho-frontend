# Property Video Generator Site Specification

I am building a website that takes in a URL, extracts the property information and generates a video. I want you to create the whole site based on the `@src/components/theme/theme.tsx`. For now, you can mock APIs and functionality.

## User Journey

1. **Landing Page**
   - Shows the logo at the top left hand corner.
   - Shows a sleek minimal menu from the top right hand corner that grows to the left. This should link to other sections of the page.
   - Shows a conversion-focused headline in a h2 style.
   - Contains a focused input field for the user's URL this should be the focus of the page, and full width.
   - Includes demonstration videos in a gallery style and a "How it works" section.
   - Followed by an FAQ section

2. **Property Details Page**
   - Triggered when a user enters a URL.
   - Fields for:
     - Address
     - Number of bedrooms, bathrooms, and car spaces
     - Property area
     - Asking price
     - Real estate agent name and contact details
     - Company name
     - Background music selection (with audio preview)
   - Images section:
     - Managed using Dropzone (drag and drop uploader integrated with site theme)
     - Display thumbnails of the uploaded images (with options to remove them)
   - The details should be on the left and image selection widget on the right
   - A **Create Video** button at the bottom.

3. **Pricing Options Page**
   - Displays pricing based on number of scenes (mocked API for now).
   - Includes:
     - Basic plan: video generation only
     - Premium plan: voice selection, 1080p HD video, company logo, no Virtual Home Open branding

4. **Payments Page**
   - Uses Stripe Elements for payment collection.
   - Includes fields for:
     - First name
     - Last name
     - Email

5. **Post-Payment Flow**
   - **Premium Plan**: User is taken to a premium configuration page.
   - **Basic Plan**: User is taken to a page showing:

6. **Premium Options Page**
   - Displays options for voice selection (with an audio preview)
   - Shows an export in HD marker/indicator
   - Dropzone for company logo, and an option to select a placement option (top right, top left, bottom right, bottom left) this should be a visual selection

6. **Creating video screen**
   - Displays the Virtual Home Open logo
   - Shows a "Creating Video" message
   - Shows a "It is safe to leave this page, you will receive an email when your video is ready"
   - Option to enter another url to create a new video and restart the workflow

---

Create this entire site and workflow with a modern SaaS approach.
