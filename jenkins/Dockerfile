FROM jenkins/jenkins:2.568.3-jdk21

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-venv \
    python3-pip \
    python-is-python3 \
    git \
    zip \
    && rm -rf /var/lib/apt/lists/*

USER jenkins

RUN jenkins-plugin-cli --plugins \
    workflow-aggregator \
    git \
    junit \
    pipeline-stage-view \
    timestamper