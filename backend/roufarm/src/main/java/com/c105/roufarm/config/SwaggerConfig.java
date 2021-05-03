package com.c105.roufarm.config;

import java.util.ArrayList;
import java.util.List;

import com.google.common.base.Predicate;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SwaggerConfig {
      
      // http://localhost:8080/swagger-ui.html

      private String version = "0.0.1 ver";
      private String title = "Welcom To Roufarm Swagger " + version;

      @Bean
      public Docket api(){
            List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
            responseMessages.add(new ResponseMessageBuilder().code(200).message("OK").build());
            responseMessages.add(new ResponseMessageBuilder().code(500).message("Server Error!!").responseModel(new ModelRef("Error")).build());
            responseMessages.add(new ResponseMessageBuilder().code(404).message("Page Not Found!!").build());
            return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).groupName(version).select()
                        .apis(RequestHandlerSelectors.basePackage("com.c105.roufarm.controller"))
                        .paths(postPaths()).build()
                        .useDefaultResponseMessages(false)
                        .globalResponseMessage(RequestMethod.GET, responseMessages);
      }

      private Predicate<String> postPaths(){
            return PathSelectors.any();
//		return or(regex("/user/.*"), regex("/article/.*"), regex("/memo/.*"));
//		return regex("/admin/.*");
      }

      private ApiInfo apiInfo(){
            return new ApiInfoBuilder().title(title)
                  .description("<h2>Roufarm 프론트 제작자를 위한 Swagger-api</h2>")
                  .contact(new Contact("Kang & Vin", "https://www.notion.so/Roufarm-4327879e6c7e429e87d978b9245196c0", "shycompany@naver.com"))
                  .license("SSAFY and Free Team Five")
                  .licenseUrl("https://www.notion.so/Roufarm-4327879e6c7e429e87d978b9245196c0")
                  .version("1.0").build();
      }


}
