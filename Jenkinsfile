pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-nodejs-app'
        VERSION = '1.0'
        REMOTE_SERVER = 'aaijaz@10.200.68.168'
        REMOTE_PATH = 'ALI/'
        REMOTE_PW = 'adeelteam'
        KEY = 'C:\\Users\\systemlimited.tufail\\id_rsa'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/syedalihbl/app.git'
            }
        }


        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE%:%VERSION% .'
            }
        }

        stage('Save Docker Image') {
            steps {
                bat 'docker save %DOCKER_IMAGE%:%VERSION% | gzip -c > %DOCKER_IMAGE%.tar.gz'
            }
        }

        stage('Transfer Image and Compose File to Remote Server') {
            steps {
                sshagent(['168']) {
                    bat 'scp -v -o StrictHostKeyChecking=no your-nodejs-app.tar.gz aaijaz@10.200.68.168:ALI/'
                }
                    bat 'scp -i %KEY% docker-compose.yml %REMOTE_SERVER%:%REMOTE_PATH%'
                
            }
        }

        stage('Load Docker Image on Remote Server') {
            steps {
                    bat 'scp -i %KEY% %REMOTE_SERVER% "docker load < %REMOTE_PATH%/%DOCKER_IMAGE%.tar.gz"'
                
            }
        }

        stage('Run Docker Compose') {
            steps {
                    bat 'scp -i %KEY% %REMOTE_SERVER% "docker-compose -f %REMOTE_PATH%/docker-compose.yml up -d"'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}