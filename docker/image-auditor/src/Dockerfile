FROM node:latest

LABEL maintenaier Lawrence Stalder <lawrence.stalder@heig-vd.ch>

# Bundle app source
COPY src /opt/app/

# Install app dependencies
RUN cd /opt/app && npm install

ENTRYPOINT ["node", "/opt/app/auditor.js"]