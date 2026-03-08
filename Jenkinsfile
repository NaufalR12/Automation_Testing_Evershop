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
                    '''
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Menggunakan catchError agar jika tes gagal, build menjadi UNSTABLE 
                // tapi pipeline tetap lanjut ke stage berikutnya.
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npx cypress run --headless'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Stage ini sekarang akan selalu jalan meskipun tes di atas gagal
                archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            // Allure akan membaca hasil XML/JSON dan menampilkan grafik meskipun ada yang fail
            allure includeProperties: false,
                   jdk: 'temurin21',
                   results: [[path: 'allure-results']]
            cleanWs()
        }
        unstable {
            echo '⚠️ Beberapa tes gagal, tapi laporan tetap dibuat.'
        }
        failure {
            echo '❌ Pipeline gagal total (masalah sistem/setup)!'
        }
        success {
            echo '✅ Semua tes berhasil!'
        }
    }
}

// tes trigger