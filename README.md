# Full Stack Food Ordering App

## Project Description
This is a Full Stack Food Ordering Application designed to provide users with an intuitive interface for ordering food online. Built with **React.js** for the front-end, styled using **Material-UI** and **Tailwind CSS**, this application ensures a sleek, responsive, and user-friendly design. The backend is powered by a robust server-side setup that handles user requests, manages the database, and ensures a seamless ordering experience.

## Features
- User authentication and registration.
- Browse available food items with detailed descriptions and images.
- Add items to the cart and manage orders.
- Checkout functionality with real-time updates.
- Admin panel for managing menu items and tracking orders.
- Fully responsive design using Material-UI and Tailwind CSS.

## Technologies Used
### Frontend:
- **React.js**: For building the user interface.
- **Material-UI**: For component-based styling.
- **Tailwind CSS**: For custom styling and responsiveness.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For database management.

### Deployment:
- Deployed on **Render** for both front-end and back-end. The application is hosted entirely on Render, ensuring seamless integration between the frontend and backend components.
- **Live Project:** [TastyGo Food Ordering App](https://tastygo-food-ordering-app.onrender.com/)

## Setup Instructions

### Prerequisites
Make sure you have the following installed:
- Node.js (v14 or above)
- MongoDB (local or cloud setup)
- Git

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/rishabhchowkikar/full-stack-food-ordering-app.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd full-stack-food-ordering-app/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd full-stack-food-ordering-app/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the backend directory with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Connecting Frontend and Backend
1. Update the API endpoint in the frontend configuration file (e.g., `.env` or a constants file) to point to the deployed backend or localhost:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

## Limitations and Challenges

### Limitations:
1. **Deadline Constraints:** Due to time limitations, some functionalities couldn't be implemented or polished to the desired level.
2. **Scalability:** The current implementation might face challenges under high traffic without further optimization.

### Challenges Faced:
1. **Deployment Issues:** Deploying both the frontend and backend on Render required troubleshooting various configuration and connection issues.
2. **Styling Conflicts:** Using both Material-UI and Tailwind CSS occasionally resulted in class conflicts and required additional effort to resolve.
3. **Time Management:** Balancing feature development with bug fixing under strict deadlines was a significant challenge.

Despite these challenges, this project was a valuable learning experience and successfully delivers a functional and visually appealing food ordering application.

## Conclusion
This Full Stack Food Ordering App is a robust and user-friendly platform for managing online food orders. While there are areas for improvement, it demonstrates strong foundational work and serves as a solid starting point for future enhancements. Your feedback and contributions are welcome!

