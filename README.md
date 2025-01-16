# ProductEval

This project demonstrates a product evaluation application built with Angular. It allows users to create, read and update product information.

# Key Features
Product Management: Provides a user interface for managing product data, including name, description, price, category and other relevant attributes.
Operations: Supports creating new products, viewing existing product details and updating product information.
Angular Framework: Leverages the Angular framework for building a dynamic and responsive web application.

# Getting Started
* **Step 1:** Install Docker Desktop Ensure Docker Desktop is installed and running on your local machine. This includes both the Docker engine and Docker Compose.
* **Step 2:** Clone the Repository: Clone the repository containing the Dockerfile and docker-compose.yaml file to your local machine using a Git client or download it as a zip archive and extract it.
* **Step 3:** Navigate to the Project Directory: Open a terminal or command prompt and navigate to the directory containing the Dockerfile and docker-compose.yaml file. This is the root directory of your project.
* **Step 4:** Build and Run with Docker Compose: Execute the command docker compose up.
* **Step 5:** Hit URL http://localhost:8081/products on the browser 

# Instruction to run both frontend and backend app
Prerequisites:
  Docker Desktop installed and running on your local machine. Verify installation with docker --version.
Steps:
  **Clone/Download:** Clone or download the project repository to your local machine.
  **Navigate:** Open a terminal and navigate to the project directory containing the docker-compose.yml file.
  **Start Application:** Run docker compose up -d. This command will build and start both the backend and frontend servers in detached mode.
  **Verify Backend:** Open a browser and navigate to http://localhost:8080. The message "Welcome to the Product Management System!!!" confirms successful backend deployment.
  **Access Frontend:** Open a browser and navigate to http://localhost:8081/products to access the product management interface.
