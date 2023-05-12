#!groovy
pipeline {
    agent any
    environment {
        CREDENTIALS = credentials('docker-registry-credentials')
        app_name = 'ui-tfm'
        version = "0.${BUILD_NUMBER}"
    }
    stages {            
        stage('Docker Build') {
            steps {
                sh 'docker image build -t ${app_name}:${version} .'
                sh 'docker image tag ${app_name}:${version} ${REGISTRY_SERVER}/${app_name}'
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'CREDENTIALS_USERNAME', passwordVariable: 'CREDENTIALS_PASSWORD')]) {
                    sh 'echo $CREDENTIALS_PASSWORD |  docker login -u ${CREDENTIALS_USERNAME} --password-stdin ${REGISTRY_URL}'  
                    sh 'docker push ${REGISTRY_SERVER}/${app_name}'
                }
            }
        } 
        stage('Docker Run') {
            steps {
                sh 'docker stop ${app_name} || true && docker rm ${app_name} || true'
                sh 'docker run --name ${app_name} -d --restart unless-stopped -p80:80 ${app_name}:${version}'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
            sh 'docker image rm -f ${app_name}:${version}'
        }
    }
}