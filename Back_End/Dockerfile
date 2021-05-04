# The FROM denotes reference to a Image hosted on DockerHub
# When specificying the version of the image, match the one you have running on your machine during development
FROM node:12.18.3

# WORKDIR specifies the working directory so that when CMD ["bin/bash"] executes, we'll find ourselves in the directory below
WORKDIR /usr/src/Back_End

# The first ./ signifies that we want to copy everything in our root directory. The second ./ signifies that we want to copy it to our working directory
COPY ./ ./

# RUN is an Image buildstep, where each operation helps build the Image you want
# Note that you can RUN as many operations as you'd like, but you can only run one CMD
RUN npm install

# expose command so that other developers know this service runs on port below
EXPOSE 3000

# The CMD runs an array of commands
# "/bin/bash" tells Docker that you want to access the shell of the container
CMD ["/bin/bash"]