# Property Video Editor Specification

I am building a project that extracts property information and generates a video. I want you to create the video editing section of the project.

## User Journey
1. **User clicks on the video edit button from the video listings on the property view page**
2. **User can edit the scenes by reordering them or clicking them individually and modifying the settings or script**
3. **User can preview the scene**
4. **User can save the video**
5. **User is returned to the property page after the video is saved**

## Requirements

1. **Data and state management**
   - Use the api service to handle all apis
   - Get video details from the 'video/details' endpoint
      - Request: video (video id)
      - Response: video object
   - Save and generate the new video using the 'video/save
   - Get list of scenes for the video from the 'video/scene/list' endpoint
      - Request: video (video id)
      - Response: list of Scene objects
   - Regenerate scene audio after the scenes script has been modified using the 'video/scene/update'
      - Request: scene (scene id)
      - Response: scene (object)
   - When a scene is reordered call the 'video/scene/update' endpoint
      - Request: scene (scene id), order (new order number)
      - Response: scene (object)
   - When a scene has animation toggled call the 'video/scene/animation/update'
      - Request: scene (id), animate (bool)
      - Response: scene (object)
   - When the background music is set use the 'video/music/list' and 'video/music/set' apis
   - When the narrator voice is set use the 'video/voice/list' and 'video/voice/set' apis


2. **Layout**
   - The list of scenes should be a vertical list on the left most panel
      - The scenes can be dragged to reorder (in the vertical axis only)
      - Each scene should display an image and be a rounded title
      - The selected (current) scene should display as darker to indicate its the current scene being modified
   - Below the list of scenes should be a tile for video settings
      - Video settings should include voice selection and background music selection
   - On the right panel it should be split into a top and bottom panel
      - On the top panel should be a video preview which will show a preview of the scene.
         - This should have a time slider, play and pause button.
      - On the bottom panel should be a settings grid
         - Each tile in the settings grid should trigger the bottom grid being split into a left and right section (to reveal the settings for that section on the new panel on the right side)
         - The settings tiles should include:
            - Script
                - Will display the current script, with the ability to edit the content. Including a Save button that will save the scene and run the 'video/scene/update' api
            - Animation
                - Just show an option to turn animation on or off (calling the video/scene/animation/update api)
   - At the top of the page, display the address of the property as the title for the page, with a button to save and generate the video.


3. **Development considerations**
   - Use api services file
   - Use types.ts
   - Use react resizable panels
   - Use modular components
   - Ensure structure is consistent with the rest of the project and logically ordered
   - Ensure the theme is consistent with the rest of the project and the Mui theme.
   - For any reusable theme components place them in src/theme/components
