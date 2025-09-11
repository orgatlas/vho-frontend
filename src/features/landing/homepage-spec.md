# Homepage Specification

This document specifies the structure, features, and styling guidelines for the homepage of the Property Video Editor platform.  
The homepage should clearly communicate the value proposition, guide the user to the main call-to-action (CTA), and present the product in a visually engaging, professional, and trustworthy manner appealing to real estate agents.

---

## Page Structure

1. **Hero / Main CTA Section**
    - **Purpose:** Immediately encourage users to enter a property listing URL and create a video.
    - **Components:**
        - Large, centered headline with a short tagline.
        - Subheading that explains the benefit (e.g., *"Turn your property listing into a stunning marketing video in minutes"*).
        - Input field (full width on mobile, centered and medium-width on desktop) to paste a property listing URL.
        - Primary CTA button labeled **"Create Video"** next to or below the input.
        - Background: Either a high-quality blurred property photo/video loop or a clean gradient overlay.
        - Optional: Add small "trusted by agents" badges/logos beneath the CTA for credibility.
    - **Behavior:**
        - When the user clicks **"Create Video"**, they are taken to the video generation flow.
        - Input validation: Ensure the URL format is correct before proceeding.

---

2. **How It Works Section**
    - **Purpose:** Quickly explain the 3-step process.
    - **Layout:**
        - 3 horizontally-aligned tiles (stacked vertically on mobile).
        - Each tile contains:
            - Icon or illustration.
            - Step number and title.
            - 1–2 sentences of explanation.
        - Example:
            1. **Paste Your Property Link** — Enter your listing URL from your real estate site.
            2. **We Extract the Details** — Our system automatically pulls property photos and descriptions.
            3. **Get Your Video** — Download, share, or edit your professional video instantly.
    - **Styling:**
        - Clean, minimalist icons with brand accent colors.
        - Subtle background variation (light gray or off-white).

---

3. **Demo Section**
    - **Purpose:** Show the transformation from a static listing to a polished video.
    - **Layout:**
        - Split-screen section.
            - **Left Side (Before):**
                - Static image gallery showing listing photos.
                - Carousel/slider with manual arrows and autoplay.
                - Label: "Before".
            - **Right Side (After):**
                - Embedded playable video preview (autoplay muted on hover for desktop, click-to-play on mobile).
                - Label: "After".
        - Responsive design: On mobile, stack “Before” above “After”.
    - **Styling:**
        - Light box-shadow and subtle borders around gallery and video frames.
        - Hover effects on images (slight zoom-in) for interactivity.

---

4. **FAQ Section**
    - **Purpose:** Address common user questions to build trust and reduce friction.
    - **Format:**
        - Accordion style (expand/collapse).
        - Example questions:
            - *What types of listings are supported?*
            - *Can I edit the video after it’s created?*
            - *Do I need to install any software?*
            - *Is there a free trial?*
            - *Can I use my own branding in the video?*
        - Keep answers concise and jargon-free.

---

5. **Footer**
    - **Contents:**
        - Logo and short tagline.
        - Links to About, Terms of Service, Privacy Policy, Contact.
        - Social media icons.
---

## Styling & Formatting Guidelines
**Animations**
    - Smooth fade-in on scroll for section transitions.
    - Hover scaling for interactive elements.
    - Avoid heavy animations that slow page load.

---

**Development considerations**
- Use api services file
- Use types.ts
- Use react resizable panels
- Use modular components
- Ensure structure is consistent with the rest of the project and logically ordered
- Ensure the theme is consistent with the rest of the project and the Mui theme.
- For any reusable theme components place them in src/theme/components
