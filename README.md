

# Derleng e-commerce

## Running the Project

### API (Django Backend)

1. **Setup Virtual Environment:**
   ```bash
   cd api-v1
   python -m venv venv
   ```

2. **Install Python Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Copy Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   - Modify `.env` as needed to configure database settings and other environment variables.

4. **Apply Database Migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Seed Database (Optional):**
   ```bash
   python seeder.py
   ```

6. **Run Django Server:**
   ```bash
   python manage.py runserver
   ```

### Web (React Frontend)

7. **Switch to Frontend Directory:**
   ```bash
   cd ../web-v1  # Assuming web-v1 is located in the parent directory
   ```

8. **Install Node.js Dependencies:**
   ```bash
   npm install
   ```

9. **Start React Development Server:**
   ```bash
   npm run start
   ```

### Accessing the Application

Once both backend and frontend servers are running:
- Django API server should be available at: `http://localhost:8000`
- React development server should be available at: `http://localhost:3000`

### Troubleshooting and Support

If you encounter any issues or have questions, feel free to contact me at [Telegram](https://t.me/dara_ven).

### Notes

- Ensure Python, Node.js, and database configurations are set up correctly.
- Customize `.env` for different database setups (`DB_ENGINE`, `DB_NAME`, etc.).
- Adjust paths and instructions based on your project structure and requirements.


Have a nice day✨!