# GHL Spacing Component

![preview](assets/spacing-component.png)

### To test this component in Production
- Go to the deployed url - [here](https://bhanuhanda.com/ghl-spacing-component/)
- This project is deployed using Github Pages

### Steps to run this project in local
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Features
- Interactive spacing component for margin and padding controls
- Real-time preview of spacing changes
- Custom suggestions support
- Disabled inputs functionality
- CSS value validation

### Component Roadmap [For development purpose only]
- [x] Project Structure Setup
- [x] UI Layout, Margin & Padding Components
- [x] Setup Data Structure, Context, Types
- [x] Handle Inputs 
  - [x] CSS Validation
  - [x] Handle Blur & Keypress of Input
- [x] Return changed values
- [x] Suggestions List Dialog UI
  - [x] Positioning
  - [x] Toggling Dialog State
- [x] Handle Suggestions Selection ('single' & 'all')
- [x] Allow passing Default value
- [x] Allow passing more suggestions
- [x] Allow passing Disabled options

### Architecture Decisions
- Using Context API instead of Prop Drilling
  - Using Compound Component Pattern to provide state to all child components in the parent(BoxModel) component
- Multiple useState with Context API instead of useReducer
  - simple update logics - useState has less overhead for simpler use cases
  - independent updates - no dependency on one another, all serve different purpose
- Kept reusable SpacingComponent with type="margin" or "padding" instead of hardcoding because
  - less redundancy in code
  - allows for adding another layer like border as a plug-n-play option
- Edge Cases
  - Handling user input with mouse move (blur) & Enter/Tab key press
  - Handling suggestion list dialog close on clicking outside of the dialog
  - Applying some css to all margin/padding sides would not update the disabled ones

### Tech Stack
- HTML, CSS, Javascript
- React, Typescript
- Vite, Eslint
- React Icons
