pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your-nodejs-app'
        VERSION = '1.0'
        REMOTE_SERVER = 'aaijaz@10.200.68.168'
        REMOTE_PATH = 'ALI/'
        REMOTE_PW = 'adeelteam'
        KEY = 'SHA256:SKIoxDnVfXBOcCJivaeaqR2hfFlY75cOzxXP0ESrwro'
    }

    stages {
        // stage('Checkout') {
        //     steps {
        //         git branch: 'main', url: 'https://github.com/syedalihbl/app.git'
        //     }
        // }

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
                    bat 'pscp -pw %REMOTE_PW% -hostkey %KEY% %DOCKER_IMAGE%.tar.gz %REMOTE_SERVER%:%REMOTE_PATH%'
    
                    bat 'pscp -pw %REMOTE_PW% -hostkey %KEY% docker-compose.yml %REMOTE_SERVER%:%REMOTE_PATH%'
                
            }
        }

        stage('Load Docker Image on Remote Server') {
            steps {
                    bat 'plink -pw %REMOTE_PW% -hostkey %KEY% %REMOTE_SERVER% "docker load < %REMOTE_PATH%/%DOCKER_IMAGE%.tar.gz"'
                
            }
        }

        stage('Run Docker Compose') {
            steps {
                    bat 'plink -pw %REMOTE_PW% -hostkey %KEY% %REMOTE_SERVER% "docker container run --name testapp --restart unless-stopped -e TZ=Asia/Karachi -v testapp:/app/logs -d -p 9595:9156 %DOCKER_IMAGE%:%VERSION%"'
                    // bat 'plink -pw %REMOTE_PW% -hostkey %KEY% %REMOTE_SERVER% "docker-compose -f %REMOTE_PATH%/docker-compose.yml up -d"'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}