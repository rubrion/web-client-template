# Vite + React + TypeScript Template with ESLint & Prettier

This template provides a consistent starting point for frontend projects built with Vite, React, and TypeScript. It integrates ESLint and Prettier to enforce code quality and style consistency across multiple development environments.

## Features

- **Vite**: A fast and modern build tool for development.
- **React + TypeScript**: Scaffolding for React projects with TypeScript support.
- **ESLint**: Configured with support for React, TypeScript, and Prettier integration.
- **Prettier**: Ensures consistent code formatting.
- **EditorConfig**: Standardizes indentation, line endings, and other settings across editors.
- **Ready-to-Use Folder Structure**: Simplifies project setup.

## ESLint Configuration

This template includes a robust ESLint setup using the Flat Config format. The configuration supports:

- The latest ECMAScript features (`ecmaVersion: 'latest'`).
- TypeScript linting using `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`.
- React-specific linting with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- Prettier integration via `eslint-plugin-prettier`, ensuring formatting issues are reported as ESLint errors.
- Pre-configured rules for React and TypeScript development.

## Prettier Configuration

The template includes a `.prettierrc` file with the following settings:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "always",
  "printWidth": 80,
  "tabWidth": 2
}
```

Prettier is seamlessly integrated with ESLint, so all formatting issues are reported during linting.

Here's the updated **How to Use** section along with the **Scripts**:

---

## How to Use

1. **Clone the Template**:

   ```bash
   git clone <template-repo-url> my-new-project
   cd my-new-project
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. **Build the Project**:

   ```bash
   npm run build
   ```

5. **Preview the Production Build**:

   ```bash
   npm run preview
   ```

6. **Lint the Project**:

   ```bash
   npm run lint
   ```

7. **Fix Linting Issues**:

   ```bash
   npm run lint:fix
   ```

8. **Format the Codebase**:

   ```bash
   npm run format
   ```

9. **Check Code Formatting**:

   ```bash
   npm run format:check
   ```

10. **Run Unit Tests**:

    ```bash
    npm run test
    ```

11. **Generate Coverage Reports**:

    ```bash
    npm run test:coverage
    ```

12. **Open Vitest UI**:

    ```bash
    npm run test:ui
    ```

---

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Create a production-ready build.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Lint the codebase using ESLint.
- **`npm run lint:fix`**: Automatically fix linting issues where possible.
- **`npm run format`**: Format the codebase with Prettier.
- **`npm run format:check`**: Check if the codebase is properly formatted.
- **`npm run test`**: Run all unit tests with Vitest.
- **`npm run test:coverage`**: Generate a coverage report for the tests.
- **`npm run test:ui`**: Open the Vitest UI for managing and running tests interactively.

---

### Setting up Blackbox for File Encryption

To securely encrypt sensitive files in this project using **StackExchange Blackbox**, follow these steps:

#### 1. Install `BlackBox`

You can automatically install StackExchange Blackbox via the following commands:

```bash
git clone https://github.com/StackExchange/blackbox.git
cd blackbox
sudo make copy-install
```

This will copy the necessary files into `/usr/local/bin`.

#### 2. Obtain the Encoded GPG Keys

The **public** and **private** Base64-encoded GPG keys are stored in the repository's "Secrets."
Ask the project maintainer to share the keys with you if you do not have access yet.

You will receive:

- A **Base64-encoded public key**
- A **Base64-encoded private key**

#### 3. Import the Public Key

Once you receive the **Base64-encoded public key**, use the following command to decode and import it:

```bash
echo "base64_encoded_public_key" | base64 --decode | gpg --import
```

- Replace `base64_encoded_public_key` with the actual Base64-encoded string of the public key.

#### 4. Import the Private Key

After importing the public key, you'll also need to import the **private key** for decryption purposes. To do that, use the following command:

```bash
echo "base64_encoded_private_key" | base64 --decode | gpg --import
```

- Replace `base64_encoded_private_key` with the actual Base64-encoded string of the private key.

#### 5. Verify the Import

You can verify if both keys were successfully imported with the following command:

```bash
gpg --list-secret-keys
```

This will list the GPG keys on your system, and you should see both the public and private key associated with your GPG email.

#### 6. Decrypt Files with `BlackBox`

With both the public and private keys imported, you can now decrypt the files in your project:

```bash
blackbox_decrypt_all_files
```

This command will decrypt all files that were encrypted with Blackbox, using your imported GPG keys.
