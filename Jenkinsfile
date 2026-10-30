pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'devops-capstone-nodejs'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh """
                            "\${scannerHome}/bin/sonar-scanner" \
                            -Dsonar.projectKey=devops-capstone-nodejs \
                            -Dsonar.projectName=devops-capstone-nodejs \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=.git/**,node_modules/**,test/**
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t \${DOCKER_IMAGE}:\${BUILD_NUMBER} .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Docker Hub credentials will be configured before this stage is executed.'
            }
        }
    }
}
