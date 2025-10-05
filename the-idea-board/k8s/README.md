# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying The Idea Board application to a Kubernetes cluster.

## Prerequisites

- A running Kubernetes cluster (minikube, GKE, EKS, AKS, etc.)
- `kubectl` configured to communicate with your cluster
- Docker images built and pushed to a container registry (or available locally for minikube)
- Firebase credentials

## Files Overview

- `backend-deployment.yaml` - Backend API deployment configuration
- `backend-service.yaml` - Backend service (ClusterIP)
- `frontend-deployment.yaml` - Frontend deployment configuration
- `frontend-service.yaml` - Frontend service (LoadBalancer)
- `ingress.yaml` - Ingress configuration for routing
- `secret-template.yaml` - Template for Firebase credentials secret

## Deployment Steps

### 1. Create Firebase Credentials Secret

First, create a secret with your Firebase credentials:

```bash
# Copy the template
cp secret-template.yaml secret.yaml

# Edit secret.yaml and replace with your actual Firebase credentials
# Then apply it:
kubectl apply -f secret.yaml

# Or create it directly from command line:
kubectl create secret generic firebase-credentials \
  --from-literal=project-id='YOUR_PROJECT_ID' \
  --from-literal=private-key='YOUR_PRIVATE_KEY' \
  --from-literal=client-email='YOUR_CLIENT_EMAIL'
```

**Important:** Never commit `secret.yaml` with real credentials to version control!

### 2. Build and Push Docker Images

If using a remote cluster, build and push images to your container registry:

```bash
# Build images
docker build -t your-registry/idea-board-backend:latest ./backend
docker build -t your-registry/idea-board-frontend:latest ./frontend

# Push to registry
docker push your-registry/idea-board-backend:latest
docker push your-registry/idea-board-frontend:latest

# Update deployment files to use your registry images
```

For minikube, you can use local images:

```bash
eval $(minikube docker-env)
docker build -t idea-board-backend:latest ./backend
docker build -t idea-board-frontend:latest ./frontend
```

### 3. Deploy Backend

```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
```

Verify backend is running:

```bash
kubectl get pods -l component=backend
kubectl logs -l component=backend
```

### 4. Deploy Frontend

```bash
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

Verify frontend is running:

```bash
kubectl get pods -l component=frontend
kubectl logs -l component=frontend
```

### 5. (Optional) Configure Ingress

If you want to use an Ingress controller:

```bash
# Install NGINX Ingress Controller (if not already installed)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Apply ingress configuration
kubectl apply -f ingress.yaml
```

Update `ingress.yaml` with your actual domain name before applying.

## Accessing the Application

### Using LoadBalancer (Default)

```bash
# Get the external IP
kubectl get service idea-board-frontend

# Access the application at http://<EXTERNAL-IP>
```

For minikube:

```bash
minikube service idea-board-frontend
```

### Using Ingress

Access the application at your configured domain (e.g., `https://idea-board.example.com`)

## Scaling

Scale the deployments as needed:

```bash
# Scale backend
kubectl scale deployment idea-board-backend --replicas=3

# Scale frontend
kubectl scale deployment idea-board-frontend --replicas=3
```

## Monitoring

View logs:

```bash
# Backend logs
kubectl logs -f -l component=backend

# Frontend logs
kubectl logs -f -l component=frontend
```

Check pod status:

```bash
kubectl get pods -l app=idea-board
kubectl describe pod <pod-name>
```

## Cleanup

Remove all resources:

```bash
kubectl delete -f .
kubectl delete secret firebase-credentials
```

## Production Considerations

1. **Resource Limits**: Adjust CPU and memory limits based on your workload
2. **Horizontal Pod Autoscaler**: Consider adding HPA for automatic scaling
3. **Persistent Storage**: If needed, add PersistentVolumeClaims
4. **TLS/SSL**: Configure proper TLS certificates for production
5. **Network Policies**: Add network policies for security
6. **Monitoring**: Integrate with Prometheus/Grafana for monitoring
7. **Secrets Management**: Use external secrets management (e.g., Sealed Secrets, External Secrets Operator)
