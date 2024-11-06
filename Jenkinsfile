pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "faaleen/hello-world-app_app"  // Remplacez par votre utilisateur Docker Hub et le nom de l'image
        DOCKER_TAG = "latest"  // Utiliser un tag comme "latest" ou un identifiant de version
        REGISTRY_CREDENTIALS = 'docker-hub-credentials'  // ID des credentials Jenkins pour Docker Hub
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker avec un tag
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    // Arrêter et supprimer tout conteneur en cours d'exécution avec le même nom
                    sh "docker rm -f mon-container || true"

                    echo "Déployer le conteneur avec la nouvelle image"
                    //sh "docker run -d --name mon-container -p 80:80 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-credentials', variable: 'KUBECONFIG')]) {
                    script {
                        echo "Déploiement sur Kubernetes"
                        
                        // Déploiement avec kubectl, par exemple en utilisant un fichier YAML pour le déploiement
                        sh """
                        kubectl apply -f k8s/deployment.yaml
                        kubectl get po,svc
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé.'
        }
    }
}
