pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                    python -m venv .venv
                    . .venv/bin/activate
                    pip install --upgrade pip
                    pip install -r backend/requirements.txt
                '''
            }
        }

        stage('Lint / static check') {
            steps {
                sh '''#!/bin/bash
                    set -euo pipefail
                    mkdir -p evidence/reports
                    . .venv/bin/activate
                    ruff check backend 2>&1 | tee evidence/reports/ruff.txt
                    black --check backend 2>&1 | tee evidence/reports/black.txt
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    mkdir -p evidence/reports
                    . .venv/bin/activate
                    pytest backend/tests --junitxml=evidence/reports/tests.xml
                '''
            }
        }

        stage('Build artifact') {
            steps {
                sh '''
                    # remove zips of earlier builds, otherwise old artifacts stay in the workspace
                    rm -rf evidence/artifacts
                    mkdir -p evidence/artifacts

                    VERSION=$(grep '^APP_VERSION=' .env.example | cut -d= -f2)
                    COMMIT=$(git rev-parse --short HEAD)
                    NAME="online-market-${VERSION}-build-${BUILD_NUMBER}-${COMMIT}.zip"

                    zip -r "evidence/artifacts/${NAME}" \
                        backend frontend docker-compose.yml README.md .env.example \
                        -x '*/__pycache__/*' '*.pyc'

                    echo "Created artifact: ${NAME}"
                    unzip -l "evidence/artifacts/${NAME}"
                '''
            }
        }

        stage('Archive artifact') {
            steps {
                archiveArtifacts artifacts: 'evidence/artifacts/*.zip, evidence/reports/*', fingerprint: true
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'evidence/reports/*.xml'
        }
        success {
            echo 'Build successful: artifact and reports are archived.'
        }
        failure {
            echo 'Build FAILED: check the console output of the red stage.'
        }
    }
}
