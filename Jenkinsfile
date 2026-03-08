pipeline {
   agent any

   triggers {
        githubPush() 
    }

    options {
        disableConcurrentBuilds()
        ansiColor('xterm')
        timestamps()
    }

    environment {
        NODE_ENV = 'test'
        JAVA_HOME = '/opt/java/openjdk'        
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
    }
    tools {
        nodejs 'nodejs'
        allure 'allure'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }


        stage('Install Dependencies') {
          steps {
            dir(env.WORKSPACE) {
              sh '''
                echo "WORKSPACE=$(pwd)"
                node -v
                npm -v
        
                npm ci
        
                npx cypress install
                npx cypress verify
        
                echo "=== check allure plugin ==="
                npm ls @shelex/cypress-allure-plugin || true
                ls -la node_modules/@shelex/cypress-allure-plugin || true
              '''
            }
          }
        }


        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run --headless'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            allure includeProperties:
                     false,
                     jdk: 'temurin21',
                     results: [[path: 'allure-results']]
            cleanWs()
        }
        failure {
            echo '❌ Cypress tests failed!'
        }
        success {
            echo '✅ Cypress tests passed!'
        }
    }

}