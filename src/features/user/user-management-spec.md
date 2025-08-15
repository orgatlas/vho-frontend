# Property Video Editor Specification

I am building a project that extracts property information and generates a video. I want you to create the user management section of the project.

## User Journey
1. **User clicks on the 'My Properties' dropdown on the user menu in the navbar**
2. **User sees a list of tiles displaying a brief summary of the property details (address, beds, baths, cars)**
3. **User clicks on selected property**
4. **User can see all the property details as well as a list of videos associated with the property**
5. **Can click on the select video which will take them to a view video screen**
6. **The user can play the video or select an option to edit, share, download the video

## Requirements

1. **Data and state management**
   - Use the api service to handle all apis
   - Get video details from the 'video/details' endpoint
   - Get a list of properties using the 'property/list' endpoint
   - Get a list of videos for the property using the 'video/list' endpoint
      - Request: property (property id to filter by)
      - Response: list of Video objects


2. **Features**
   - Listings of properties and videos should be in a modern tile style component
   - Listings should be filterable for both the property and the video (by name and date created and date modified for listings and date created and date modified for videos).
   - Ability to sort properties and videos by any of the filterable fields (ascending/descending).
   - Property and video tiles should support pagination or infinite scroll for improved performance on large datasets.
   - Each property tile should include a thumbnail image (if available), and key stats such as price, location, and features (beds, baths, cars).
   - Each video tile should display a thumbnail, title, creation date, and last modified date.
   - Ability to select multiple videos or properties for batch actions (e.g., delete, share, download).
   - A responsive design that adapts seamlessly to mobile, tablet, and desktop viewports.
   - A search bar with live filtering for quick navigation to specific properties or videos.
   - Integration of action buttons (Edit, Share, Download) directly on video tiles for quick access.
   - Smooth animations for tile hover effects.

3. **Development considerations**
   - Use api services file
   - Use types.ts
   - Use modular components
   - Ensure structure is consistent with the rest of the project and logically ordered
   - Ensure the theme is consistent with the rest of the project and the Mui theme.
   - For any reusable theme components place them in src/theme/components
