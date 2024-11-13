# PayEase Frontend

This is the frontend application for the PayEase. It provides a user interface for managing accounts, performing transactions, and viewing user information. The frontend is built using React(vite) and Tailwind CSS.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pratish10/payments-app.git
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```


### Running the App

To start the development server, use the following command:

```bash
npm run dev
```

The app will be running on \`http://localhost:5173/`.

## Pages

### Dashboard

- **Path:** \`/dashboard\`
- **Description:** Displays the user's balance, user information, and allows access to other features of the app.
- **Components Used:**
  - \`Appbar\`
  - \`Balance\`
  - \`Users\`

### Home

- **Path:** \`/\`
- **Description:** The landing page of the application, providing options to sign up or sign in.
- **Components Used:**
  - \`Home\`

### Send Money

- **Path:** \`/send\`
- **Description:** Allows the user to send money to another user.
- **Components Used:**
  - \`Card\`
  - \`Input\`

### Settings

- **Path:** \`/settings\`
- **Description:** Allows the user to update their credentials.
- **Components Used:**
  - \`Card\`
  - \`Appbar\`

### Signin

- **Path:** \`/signin\`
- **Description:** Allows the user to sign in to their account.
- **Components Used:**
  - \`Card\`
  - \`Input\`

### Signup

- **Path:** \`/signup\`
- **Description:** Allows the user to create a new account.
- **Components Used:**
  - \`Card\`
  - \`Input\`

## Components

The frontend application uses a variety of reusable components, including:

- \`Appbar\`
- \`Balance\`
- \`Users\`
- \`Card\`
- \`Input\`

## Contributing

Feel free to open issues or submit pull requests if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.