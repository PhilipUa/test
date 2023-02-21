FROM public.ecr.aws/lambda/nodejs:14

COPY  . .
COPY mongocryptd /usr/local/bin

RUN chmod 755 /usr/local/bin/mongocryptd

RUN npm i
RUN npm link webpack
RUN npm run build


CMD ["dist/mainLambda.handler"]


#docker tag  mens:latest 487020523116.dkr.ecr.us-west-1.amazonaws.com/mens-main:latest
#docker push 487020523116.dkr.ecr.us-west-1.amazonaws.com/mens-main:latest
#
#$ aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 487020523116.dkr.ecr.us-west-2.amazonaws.com