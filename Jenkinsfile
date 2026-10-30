pipeline {
    agent {
        label 'docker-agent'
    }

    environment {
        DOCKER_IMAGE = 'devops-capstone-nodejs'
        DOCKERHUB_IMAGE = 'shijo501/devops-capstone-nodejs'
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
                sh '''
                    docker build \
                        -t "$DOCKER_IMAGE:$BUILD_NUMBER" .
                '''
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
                        set -e

                        echo "$DOCKERHUB_TOKEN" | docker login \
                            -u "$DOCKERHUB_USER" --password-stdin

                        docker tag "$DOCKER_IMAGE:$BUILD_NUMBER" \
                            "$DOCKERHUB_IMAGE:$BUILD_NUMBER"

                        docker push "$DOCKERHUB_IMAGE:$BUILD_NUMBER"

                        docker tag "$DOCKER_IMAGE:$BUILD_NUMBER" \
                            "$DOCKERHUB_IMAGE:latest"

                        docker push "$DOCKERHUB_IMAGE:latest"

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Docker EC2') {
            steps {
                sh '''
                    set -e

                    echo "Pulling latest Docker image..."

                    docker pull "$DOCKERHUB_IMAGE:latest"

                    echo "Removing previous application container..."

                    docker rm -f devops-capstone-app || true

                    echo "Starting updated application..."

                    docker run -d \
                        --name devops-capstone-app \
                        --restart unless-stopped \
                        -p 3000:3000 \
                        "$DOCKERHUB_IMAGE:latest"

                    echo "Checking application health..."

                    for i in $(seq 1 10); do
                        if curl -fsS http://127.0.0.1:3000/health; then
                            echo ""
                            echo "Deployment successful!"
                            exit 0
                        fi

                        echo "Waiting for application..."
                        sleep 3
                    done

                    echo "Application health check failed!"

                    docker logs devops-capstone-app

                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: CI/CD pipeline and application deployment completed!'
        }

        failure {
            echo 'FAILURE: Pipeline failed. Check the Jenkins Console Output.'
        }

        always {
            echo 'DevOps Capstone Pipeline execution completed.'
        }
    }
}
