FROM adoptopenjdk/openjdk11:latest
LABEL maintainer="shycompany@gmail.com"
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=gradle/wrapper/gradle-wrapper.jar
ADD ${JAR_FILE} springboot.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/springboot.jar"]