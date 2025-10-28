helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update

helm install istio-base istio/base -n istio-system --create-namespace
helm install istiod istio/istiod -n istio-system --wait
helm install istio-ingress istio/gateway -n istio-system
kubectl label namespace nodejs istio-injection=enabled

kubectl get crd | grep networking.istio.io


kubectl label namespace local-ns istio-injection=enabled



apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp
  namespace: local-ns
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx     # ✅ new style (recommended)
  rules:
  - host: demo.hrcloud.in
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web
            port:
              number: 80
