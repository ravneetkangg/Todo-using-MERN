# Todo Application --- AWS Deployment

A simple Todo application created to learn AWS deployment and cloud
services.

The application originally used MongoDB, but the deployed version uses
**MySQL on Amazon RDS**. The backend runs on **Amazon EC2**, while the
frontend is deployed separately.

## AWS Setup

-   **Frontend:** Vercel
-   **Backend:** Amazon EC2
-   **Database:** MySQL on Amazon RDS
-   **Process manager:** PM2
-   **HTTPS tunnel:** ngrok

> The EC2 instance is currently stopped and the RDS database has been
> deleted after taking a snapshot.

## Starting the Application Again

### 1. Restore the database

Restore a new RDS instance from the saved RDS snapshot and wait until it
becomes available.

After restoration, verify the backend environment variables use the
new/current RDS endpoint and database credentials.

### 2. Start EC2

Start the EC2 instance from the AWS console.

SSH into it using your private key:

``` bash
ssh -i <key-file>.pem ec2-user@<EC2_PUBLIC_IP>
```

Keep the `.pem` file private and never commit it to GitHub.

### 3. Start the backend

On EC2, go to the backend directory and check PM2:

``` bash
pm2 list
```

If the backend is not running:

``` bash
pm2 start app.js --name todo-backend
```

### 4. Start ngrok

The frontend uses HTTPS, so ngrok provides an HTTPS URL for the backend
running on port `4700`.

``` bash
nohup ngrok http 4700 > ngrok.log 2>&1 &
```

Get the generated HTTPS URL:

``` bash
curl -s http://localhost:4040/api/tunnels
```

### 5. Update the frontend

Update the backend/API URL in the frontend's Vercel environment
variables with the new ngrok HTTPS URL, then redeploy if required.

The application should now be connected as:

``` text
Vercel Frontend
      ↓ HTTPS
    ngrok
      ↓
EC2 Backend :4700
      ↓
MySQL RDS
```

## Important

Do not commit `.env` files, `.pem` keys, database passwords, API keys,
public instance details, or other credentials to this repository.
