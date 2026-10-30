
pipeline {
    agent {
        label 'docker-agent'
    }

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
                            "${scannerHome}/bin/sonar-scanner" \
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
                sh 'docker build -t "$DOCKER_IMAGE:$BUILD_NUMBER" .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    sh '''
                        echo "$DOCKERHUB_TOKEN" | docker login \
                            -u "$DOCKERHUB_USER" --password-stdin

                        docker tag "$DOCKER_IMAGE:$BUILD_NUMBER" \
                            "$DOCKERHUB_USER/devops-capstone-nodejs:$BUILD_NUMBER"

                        docker push "$DOCKERHUB_USER/devops-capstone-nodejs:$BUILD_NUMBER"

                        docker tag "$DOCKER_IMAGE:$BUILD_NUMBER" \
                            "$DOCKERHUB_USER/devops-capstone-nodejs:latest"

                        docker push "$DOCKERHUB_USER/devops-capstone-nodejs:latest"

                        docker logout
                    '''
                }
            }
        }
    }
}
