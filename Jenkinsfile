pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-nodejs-app'
        REMOTE_SERVER = 'aaijaz@10.200.68.168'
        REMOTE_PATH = 'ALI/'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/syedalihbl/app.git'
            }
        }


        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Save Docker Image') {
            steps {
                bat 'docker save %DOCKER_IMAGE% > %DOCKER_IMAGE%.tar'
            }
        }

        stage('Transfer Image and Compose File to Remote Server') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'your-ssh-credentials-id', keyFileVariable: 'SSH_KEY')]) {
                    bat 'scp -i %SSH_KEY% %DOCKER_IMAGE%.tar %REMOTE_SERVER%:%REMOTE_PATH%'
                    bat 'scp -i %SSH_KEY% docker-compose.yml %REMOTE_SERVER%:%REMOTE_PATH%'
                }
            }
        }

        stage('Load Docker Image on Remote Server') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'your-ssh-credentials-id', keyFileVariable: 'SSH_KEY')]) {
                    bat 'ssh -i %SSH_KEY% %REMOTE_SERVER% "docker load < %REMOTE_PATH%/%DOCKER_IMAGE%.tar"'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'your-ssh-credentials-id', keyFileVariable: 'SSH_KEY')]) {
                    bat 'ssh -i %SSH_KEY% %REMOTE_SERVER% "docker-compose -f %REMOTE_PATH%/docker-compose.yml up -d"'
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}