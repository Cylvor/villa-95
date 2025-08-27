# Villa 95 - Deployment Guide

This guide covers the complete deployment process for the Villa 95 booking system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Git
- Domain name (villa95rangala.com)
- SSL certificates
- MongoDB Atlas account
- Vercel account
- DigitalOcean/AWS account

## 📋 Pre-Deployment Checklist

### 1. Domain Setup
- [ ] Purchase domain: `villa95rangala.com`
- [ ] Configure DNS records:
  - `A` record: `villa95rangala.com` → Frontend IP
  - `A` record: `api.villa95rangala.com` → Backend IP
  - `CNAME` record: `www.villa95rangala.com` → `villa95rangala.com`

### 2. SSL Certificates
- [ ] Obtain SSL certificates for both domains
- [ ] Configure automatic renewal (Let's Encrypt recommended)

### 3. Environment Variables
- [ ] Set up all required environment variables
- [ ] Configure secrets in deployment platforms

## 🏠 Frontend Deployment (Vercel)

### 1. Vercel Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

### 2. Environment Variables in Vercel
Set these in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`: `https://api.villa95rangala.com/api/v1`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your Google Analytics ID
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`: `villa95rangala.com`

### 3. Custom Domain
- Add custom domain in Vercel dashboard
- Configure DNS records as specified above

## 🔧 Backend Deployment (DigitalOcean)

### 1. Droplet Setup
```bash
# Create Ubuntu 22.04 LTS droplet
# Minimum specs: 2GB RAM, 1 vCPU, 50GB SSD

# Connect to droplet
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y
```

### 2. Application Setup
```bash
# Create application directory
mkdir -p /opt/villa-95
cd /opt/villa-95

# Clone repository
git clone https://github.com/your-username/villa-95.git .

# Copy environment files
cp backend/env.production backend/.env
cp frontend/env.example frontend/.env.local

# Edit environment variables
nano backend/.env
nano frontend/.env.local
```

### 3. SSL Configuration
```bash
# Create SSL directory
mkdir -p /opt/villa-95/ssl

# Copy SSL certificates
cp your-cert.crt /opt/villa-95/ssl/villa95rangala.com.crt
cp your-key.key /opt/villa-95/ssl/villa95rangala.com.key
```

### 4. Deploy with Docker
```bash
# Build and start services
docker-compose up -d

# Check logs
docker-compose logs -f

# Verify services
docker-compose ps
```

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Atlas Configuration
- Create MongoDB Atlas cluster
- Configure network access (allow all IPs for development)
- Create database user
- Get connection string

### 2. Update Environment Variables
```bash
# Update MONGODB_URI in backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/villa95?retryWrites=true&w=majority
```

### 3. Seed Database
```bash
# Run database seeder
cd backend
npm run seed
```

## 🔐 Security Configuration

### 1. Firewall Setup
```bash
# Configure UFW firewall
ufw allow ssh
ufw allow 80
ufw allow 443
ufw enable
```

### 2. Rate Limiting
- Configured in nginx.conf
- API rate limits: 10 requests/second
- Login rate limits: 5 requests/minute

### 3. CSRF Protection
- Enabled in backend
- Frontend automatically includes CSRF tokens

## 📊 Monitoring & Analytics

### 1. Google Analytics
- Create GA4 property
- Add measurement ID to environment variables
- Verify tracking in GA dashboard

### 2. Plausible Analytics (Alternative)
- Sign up for Plausible
- Add domain to environment variables
- Verify tracking

### 3. Health Checks
```bash
# Test backend health
curl https://api.villa95rangala.com/health

# Test frontend
curl https://villa95rangala.com
```

## 🔄 CI/CD Pipeline

### 1. GitHub Secrets
Configure these secrets in GitHub repository:
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `DROPLET_HOST`: DigitalOcean droplet IP
- `DROPLET_USERNAME`: SSH username (usually root)
- `DROPLET_SSH_KEY`: SSH private key

### 2. Automated Deployment
- Push to `main` branch triggers deployment
- Frontend deploys to Vercel
- Backend builds Docker image and deploys to DigitalOcean

## 🧪 Testing Deployment

### 1. Functionality Tests
- [ ] Homepage loads correctly
- [ ] Booking flow works end-to-end
- [ ] Payment integration functions
- [ ] Admin panel accessible
- [ ] Email notifications sent

### 2. Performance Tests
```bash
# Test API response times
curl -w "@curl-format.txt" -o /dev/null -s "https://api.villa95rangala.com/api/v1/villas"

# Test frontend load times
curl -w "@curl-format.txt" -o /dev/null -s "https://villa95rangala.com"
```

### 3. Security Tests
- [ ] HTTPS redirects work
- [ ] CSRF protection active
- [ ] Rate limiting functional
- [ ] JWT authentication working

## 🚨 Troubleshooting

### Common Issues

#### 1. SSL Certificate Errors
```bash
# Check certificate validity
openssl x509 -in /opt/villa-95/ssl/villa95rangala.com.crt -text -noout

# Renew certificates if needed
certbot renew
```

#### 2. Database Connection Issues
```bash
# Test MongoDB connection
docker exec -it villa-95-mongodb-1 mongosh "mongodb://username:password@cluster.mongodb.net/villa95"
```

#### 3. Docker Container Issues
```bash
# Check container logs
docker-compose logs api

# Restart services
docker-compose restart

# Rebuild containers
docker-compose up -d --build
```

## 📈 Post-Deployment

### 1. Performance Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)
- Monitor API response times

### 2. Backup Strategy
```bash
# Database backup script
#!/bin/bash
docker exec villa-95-mongodb-1 mongodump --out /backup/$(date +%Y%m%d)
```

### 3. Scaling Considerations
- Monitor resource usage
- Consider load balancer for multiple backend instances
- Implement caching (Redis) for better performance

## 🔄 Maintenance

### Regular Tasks
- [ ] Update SSL certificates
- [ ] Monitor security updates
- [ ] Backup database
- [ ] Review logs for errors
- [ ] Update dependencies

### Update Process
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Verify deployment
curl https://api.villa95rangala.com/health
```

## 📞 Support

For deployment issues:
1. Check logs: `docker-compose logs -f`
2. Verify environment variables
3. Test connectivity: `curl -I https://api.villa95rangala.com`
4. Review this documentation
5. Contact system administrator

---

**Note**: This deployment guide assumes a production environment. For development, use local environment variables and development servers.
