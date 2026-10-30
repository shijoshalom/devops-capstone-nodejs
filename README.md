# DevOps Capstone - Node.js Application

A Node.js web application built for an end-to-end DevOps capstone project.

## Technology Stack
- Node.js
- Git and GitHub
- Jenkins
- Docker and Docker Hub
- AWS EC2
- SonarQube
- Prometheus and Grafana
- Node Exporter
- Bash and Cron

## Application Endpoints
- `/` - Application homepage
- `/health` - Application health status

## Run Locally
```bash
npm start
```

## Run Tests
```bash
npm test
```

## Build Docker Image
```bash
docker build -t devops-capstone-nodejs:local .
```

## Run Docker Container
```bash
docker run -d --name devops-capstone-app -p 3000:3000 devops-capstone-nodejs:local
```

## CI/CD Workflow
GitHub -> Jenkins -> Build and Test -> SonarQube -> Docker Hub -> AWS EC2 Deployment.

## Monitoring
Prometheus, Grafana, and Node Exporter will be used for infrastructure monitoring.

## Automation
Bash scripts and cron jobs will automate backups and log cleanup.
checking The webhook trigger is working