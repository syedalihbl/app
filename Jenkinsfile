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
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }

        stage('Save Docker Image') {
            steps {
                script {
                    sh "docker save ${DOCKER_IMAGE} > ${DOCKER_IMAGE}.tar"
                }
            }
        }

        stage('Transfer Image and Compose File to Remote Server') {
            steps {
                sshagent(['your-ssh-credentials-id']) {
                    sh "scp ${DOCKER_IMAGE}.tar ${REMOTE_SERVER}:${REMOTE_PATH}"
                    sh "scp docker-compose.yml ${REMOTE_SERVER}:${REMOTE_PATH}"
                }
            }
        }

        stage('Load Docker Image on Remote Server') {
            steps {
                sshagent(['your-ssh-credentials-id']) {
                    sh "ssh ${REMOTE_SERVER} 'docker load < ${REMOTE_PATH}/${DOCKER_IMAGE}.tar'"
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                sshagent(['your-ssh-credentials-id']) {
                    sh "ssh ${REMOTE_SERVER} 'docker-compose -f ${REMOTE_PATH}/docker-compose.yml up -d'"
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