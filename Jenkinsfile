pipeline {
    agent any
    
    stages {
        stage('deploy') {
            steps {
                echo 'Deploying...'

                sh 'chmod 774 ./deploy.sh'
                sh 'bash ./deploy.sh'
            }
        }
    }
}
