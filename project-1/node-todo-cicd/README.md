# node-todo-cicd

Run these commands:


`sudo apt install nodejs`


`sudo apt install npm`


`npm install`

`node app.js`

or Run by docker compose

test


eksctl create cluster --name=nodejsapp  --region=eu-west-1  --version=1.33  --without-nodegroup
eksctl utils associate-iam-oidc-provider  --region eu-west-1 --cluster nodejsapp --approve
 


                     eksctl create nodegroup --cluster=nodejsapp \
                        --region=eu-west-1 \
                        --name=nodejsapp \
                        --node-type=t2.medium \
                        --nodes=2 \
                        --nodes-min=2 \
                        --nodes-max=2 \
                        --node-volume-size=20 \
                        --ssh-access \
                        --ssh-public-key=eks-nodegroup-key

eksctl delete cluster --name=nodejsapp --region=eu-west-1
eksctl delete nodegroup --cluster=nodejsapp --region=eu-west-1 --name=nodejsapp --disable-eviction
